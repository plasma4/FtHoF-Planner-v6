'use strict';

/**
 * High-Performance Tooltip System for AngularJS 1.6.9
 * 
 * Features:
 * - Fixed pool of tooltip DOM elements (object pooling)
 * - No memory leaks (all watchers destroyed on destroy)
 * - Data binding support
 * - Custom classes and attachment direction
 * - Arrows pointing to element center for above/below positioning
 * - Scalable to tens of thousands of buttons
 */
(function() {
  'use strict';

  // Create the tooltip module
  angular.module('spellTooltips', []);

  // ============================================================================
  // TOOLTIP MANAGER SERVICE
  // ============================================================================
  
  angular.module('spellTooltips').factory('TooltipManager', [
    '$rootScope',
    '$document',
    '$timeout',
    function($rootScope, $document, $timeout) {
      
      var POOL_SIZE = 20;
      var ARROW_SIZE = 10;
      var SHOW_DELAY = 80;
      
      var pool = [];
      var activeTooltips = new Map();
      var managerScope = null;
      var isInitialized = false;
      var container = null;
      
      function init() {
        if (isInitialized) return;
        
        // Create a single fixed container for all tooltips
        // Use body append directly (no Angular compile - avoids digest issues)
        var containerEl = document.createElement('div');
        containerEl.id = 'spell-tooltip-container';
        containerEl.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;z-index:99999;overflow:visible;';
        document.body.appendChild(containerEl);
        container = angular.element(containerEl);
        
        // Create pool of tooltip elements
        for (var i = 0; i < POOL_SIZE; i++) {
          var tooltipEl = createTooltipElement();
          containerEl.appendChild(tooltipEl[0]);
          pool.push({
            element: tooltipEl,
            inUse: false,
            index: i
          });
        }
        
        // Attach resize/scroll listeners for position updates
        window.addEventListener('resize', updateAllPositions);
        window.addEventListener('scroll', updateAllPositions, true);
        
        isInitialized = true;
      }
      
      function createTooltipElement() {
        // Use document.createElement for reliable DOM structure
        // Keep display:block + visibility:hidden so showing is just a visibility toggle
        // (no layout cost, no first-paint delay)
        var item = document.createElement('div');
        item.className = 'spell-tooltip-item';
        item.style.position = 'absolute';
        item.style.display = 'block';
        item.style.visibility = 'hidden';
        item.style.pointerEvents = 'none';
        item.style.top = '-9999px';
        item.style.left = '-9999px';
        item.style.width = 'auto';
        item.style.maxWidth = 'none';
        
        var content = document.createElement('div');
        content.className = 'spell-tooltip-content';
        item.appendChild(content);
        
        var arrow = document.createElement('div');
        arrow.className = 'spell-tooltip-arrow';
        item.appendChild(arrow);
        
        return angular.element(item);
      }
      
      function acquireTooltip() {
        for (var i = 0; i < pool.length; i++) {
          if (!pool[i].inUse) {
            pool[i].inUse = true;
            return pool[i].element;
          }
        }
        return null;
      }
      
      function releaseTooltip(element) {
        if (!element || !element[0]) return;

        var tooltipNode = element[0];
        // Reset to off-screen invisible state
        // (keep display:block so the next show is just a visibility toggle, no layout cost)
        tooltipNode.className = 'spell-tooltip-item';
        tooltipNode.style.visibility = 'hidden';
        tooltipNode.style.top = '-9999px';
        tooltipNode.style.left = '-9999px';
        tooltipNode.style.width = 'auto';
        tooltipNode.style.maxWidth = 'none';
        tooltipNode.style.transform = 'none';

        var contentEl = tooltipNode.querySelector('.spell-tooltip-content');
        if (contentEl) contentEl.innerHTML = '';

        var arrowEl = tooltipNode.querySelector('.spell-tooltip-arrow');
        if (arrowEl) arrowEl.style.left = '50%';
        
        for (var i = 0; i < pool.length; i++) {
          if (pool[i].element[0] === element[0]) {
            pool[i].inUse = false;
            break;
          }
        }
      }
      
      function show(targetEl, content, options) {
        options = options || {};
        var direction = options.direction || 'above';
        var customClass = options.customClass || '';
        
        if (!targetEl) return;
        
        // Hide any existing tooltip for this target
        hide(targetEl);
        
        // Also hide any tooltip that is shown for a different target
        // This prevents multiple tooltips showing at once
        if (activeTooltips.size > 0) {
          hideAll();
        }
        
        var tooltipEl = acquireTooltip();
        if (!tooltipEl) return;
        
        var tooltipNode = tooltipEl[0];
        var contentEl = tooltipNode.querySelector('.spell-tooltip-content');
        var arrowEl = tooltipNode.querySelector('.spell-tooltip-arrow');
        
        // Set direction class
        tooltipNode.className = 'spell-tooltip-item spell-tooltip-' + direction;
        if (customClass) {
          tooltipNode.className += ' ' + customClass;
        }
        
        // Set content
        if (typeof content !== 'string') {
          content = String(content || '');
        }
        contentEl.innerHTML = content;

        // Make visible for measurement (but off-screen)
        // Use clear left/top so we measure natural width without any left-based truncation
        tooltipNode.style.display = 'block';
        tooltipNode.style.visibility = 'hidden';
        tooltipNode.style.top = '0';
        tooltipNode.style.left = '-9999px';
        tooltipNode.style.width = 'auto';
        tooltipNode.style.transform = 'none';
        tooltipNode.style.maxWidth = 'none';

        // Get target position first to compute width cap
        var targetRect = targetEl.getBoundingClientRect();
        var targetWidth = targetRect.width;
        // Cap tooltip width to target width minus 16px margin (8px on each side)
        var maxAllowedWidth = Math.max(50, targetWidth - 16);

        // Measure natural width
        var naturalWidth = tooltipNode.offsetWidth;
        // Apply width cap: as wide as content, up to target width minus margins
        var tooltipWidth = Math.min(naturalWidth, maxAllowedWidth);
        // Re-apply width so it actually limits the layout
        tooltipNode.style.width = tooltipWidth + 'px';
        // Re-measure height after width may have caused wrapping
        var tooltipHeight = tooltipNode.offsetHeight;

        // Calculate position - center on target using transform: translateX(-50%)
        // This avoids any pixel rounding/measurement issues with manual offset
        var targetCenterX = targetRect.left + targetRect.width / 2;
        var top;

        if (direction === 'below') {
          top = targetRect.bottom + ARROW_SIZE;
        } else {
          top = targetRect.top - tooltipHeight - ARROW_SIZE;
        }

        // Handle viewport edges - clamp so tooltip stays on screen
        var viewportWidth = window.innerWidth;
        var minLeft = 5;
        var maxLeft = viewportWidth - tooltipWidth - 5;
        var left = targetCenterX - tooltipWidth / 2;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;

        // Calculate arrow position relative to tooltip
        // Arrow should always point to center of target
        var arrowLeftPercent = ((targetCenterX - left) / tooltipWidth) * 100;
        arrowLeftPercent = Math.max(5, Math.min(95, arrowLeftPercent));

        // Apply final position AND visibility in a single atomic batch
        // (no transform needed - left already accounts for centering, so the browser
        //  paints the final state in a single frame with no flash/snap)
        tooltipNode.style.width = tooltipWidth + 'px';
        tooltipNode.style.top = top + 'px';
        tooltipNode.style.left = left + 'px';
        tooltipNode.style.transform = 'none';
        tooltipNode.style.visibility = 'visible';

        // Position arrow
        arrowEl.style.left = arrowLeftPercent + '%';

        // Store reference
        activeTooltips.set(targetEl, tooltipEl);
      }
      
      function hide(targetEl) {
        var tooltipEl = activeTooltips.get(targetEl);
        if (tooltipEl) {
          releaseTooltip(tooltipEl);
          activeTooltips.delete(targetEl);
        }
      }
      
      function hideAll() {
        activeTooltips.forEach(function(tooltipEl) {
          releaseTooltip(tooltipEl);
        });
        activeTooltips.clear();
      }
      
      function updateAllPositions() {
        activeTooltips.forEach(function(tooltipEl, targetEl) {
          if (targetEl && document.body.contains(targetEl)) {
            var tooltipNode = tooltipEl[0];
            var isBelow = tooltipNode.classList.contains('spell-tooltip-below');
            var direction = isBelow ? 'below' : 'above';

            var targetRect = targetEl.getBoundingClientRect();
            // Use the explicit width set on the element (not offsetWidth which
            // can be affected by subpixel rounding) for consistent centering
            var tooltipWidth = parseFloat(tooltipNode.style.width) || tooltipNode.offsetWidth;
            var tooltipHeight = tooltipNode.offsetHeight;
            var targetCenterX = targetRect.left + targetRect.width / 2;
            var top;

            if (direction === 'below') {
              top = targetRect.bottom + ARROW_SIZE;
            } else {
              top = targetRect.top - tooltipHeight - ARROW_SIZE;
            }

            // Handle viewport edges
            var viewportWidth = window.innerWidth;
            var minLeft = 5;
            var maxLeft = viewportWidth - tooltipWidth - 5;
            var left = targetCenterX - tooltipWidth / 2;
            if (left < minLeft) left = minLeft;
            if (left > maxLeft) left = maxLeft;

            var arrowLeftPercent = ((targetCenterX - left) / tooltipWidth) * 100;
            arrowLeftPercent = Math.max(5, Math.min(95, arrowLeftPercent));

            // Apply final position (no transform - left already accounts for centering)
            tooltipNode.style.top = top + 'px';
            tooltipNode.style.left = left + 'px';
            tooltipNode.style.transform = 'none';

            var arrowEl = tooltipNode.querySelector('.spell-tooltip-arrow');
            if (arrowEl) arrowEl.style.left = arrowLeftPercent + '%';
          } else {
            releaseTooltip(tooltipEl);
            activeTooltips.delete(targetEl);
          }
        });
      }
      
      function destroy() {
        hideAll();
        
        window.removeEventListener('resize', updateAllPositions);
        window.removeEventListener('scroll', updateAllPositions, true);
        
        pool.forEach(function(item) {
          item.element.remove();
        });
        
        pool = [];
        
        if (container) {
          container.remove();
          container = null;
        }
        
        isInitialized = false;
      }
      
      // Auto-initialize when DOM is ready
      angular.element(document).ready(function() {
        // Use a small delay to ensure body is ready
        $timeout(init, 0);
      });
      
      return {
        show: show,
        hide: hide,
        hideAll: hideAll,
        updateAllPositions: updateAllPositions,
        destroy: destroy
      };
    }
  ]);

  // ============================================================================
  // SHIFT STATE TRACKER SERVICE
  // ----------------------------------------------------------------------------
  // Single document-level keydown/keyup listener shared by every tooltip
  // directive. Avoids attaching N listeners (one per directive) which would
  // fire on every key event for N tooltips.
  // ----------------------------------------------------------------------------
  // API:
  //   isShiftDown()   -> boolean
  //   shouldHide(invert) -> boolean  (true when (shift XOR invert))
  //   onChange(fn)    -> deregister function  (subscribes to state changes)
  // ============================================================================

  angular.module('spellTooltips').factory('ShiftStateTracker', [
    '$rootScope',
    function($rootScope) {
      var shiftKey = false;
      var listeners = [];
      var listenerInstalled = false;

      function installListener() {
        if (listenerInstalled) return;
        listenerInstalled = true;
        document.addEventListener('keydown', function(e) {
          if ((e.key === 'Shift' || e.shiftKey) && !shiftKey) {
            shiftKey = true;
            notify();
          }
        });
        document.addEventListener('keyup', function(e) {
          // Some browsers set shiftKey=false on keyup of other keys,
          // so also check the physical Shift key
          if (e.key === 'Shift' || (!e.shiftKey && shiftKey)) {
            if (shiftKey) {
              shiftKey = false;
              notify();
            }
          }
        });
      }

      function notify() {
        for (var i = 0; i < listeners.length; i++) {
          try { listeners[i](shiftKey); } catch (err) { /* noop */ }
        }
        // Also broadcast on rootScope for Angular-aware consumers
        if ($rootScope && $rootScope.$applyAsync) {
          $rootScope.$applyAsync();
        }
      }

      return {
        isShiftDown: function() { return shiftKey; },
        shouldHide: function(invert) { return shiftKey !== !!invert; },
        onChange: function(fn) {
          installListener();
          listeners.push(fn);
          return function deregister() {
            var i = listeners.indexOf(fn);
            if (i >= 0) listeners.splice(i, 1);
          };
        }
      };
    }
  ]);

  // ============================================================================
  // SPELL TOOLTIP DIRECTIVE
  // ============================================================================

  angular.module('spellTooltips').directive('spellTooltip', [
    '$timeout',
    'TooltipManager',
    'ShiftStateTracker',
    function($timeout, TooltipManager, ShiftStateTracker) {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
          var targetEl = element[0];
          var showDelay = 100;
          var hideDelay = 50;
          var showTimer = null;
          var hideTimer = null;
          var isHovering = false;
          var isShown = false;

          // Store configuration
          var config = {
            content: '',
            direction: 'above',
            customClass: ''
          };

          // Mirrors $scope.shiftEventListenerCheck in index.js:
          // tooltip is hidden when (shift XOR invert_tooltip_hide_rules).
          // The actual shift state is owned by the shared ShiftStateTracker service.
          function shouldHideByShift() {
            var invert = !!(scope && scope.invert_tooltip_hide_rules);
            return ShiftStateTracker.isShiftDown() !== invert;
          }

          function updateConfig() {
            // Read attributes directly. AngularJS interpolates {{}} expressions
            // before passing values to the directive via attrs, so static strings
            // and interpolated values both work without scope.$eval.
            if (attrs.spellTooltipContent !== undefined) {
              config.content = attrs.spellTooltipContent || '';
            }
            if (attrs.spellTooltipDirection !== undefined) {
              var dir = attrs.spellTooltipDirection;
              config.direction = (dir === 'below' || dir === 'above') ? dir : 'above';
            }
            if (attrs.spellTooltipClass !== undefined) {
              config.customClass = attrs.spellTooltipClass || '';
            }
          }

          function doShow() {
            if (!isHovering) return;
            if (shouldHideByShift()) {
              // Shift state says we should not be showing right now
              isShown = false;
              return;
            }
            isShown = true;
            updateConfig();
            TooltipManager.show(targetEl, config.content, {
              direction: config.direction,
              customClass: config.customClass
            });
          }

          function doHide() {
            isShown = false;
            TooltipManager.hide(targetEl);
          }

          function scheduleShow() {
            if (showTimer) $timeout.cancel(showTimer);
            if (hideTimer) $timeout.cancel(hideTimer);
            showTimer = $timeout(doShow, showDelay);
          }

          function scheduleHide() {
            if (showTimer) $timeout.cancel(showTimer);
            if (hideTimer) $timeout.cancel(hideTimer);
            hideTimer = $timeout(doHide, hideDelay);
          }
          
          function clearTimers() {
            if (showTimer) { $timeout.cancel(showTimer); showTimer = null; }
            if (hideTimer) { $timeout.cancel(hideTimer); hideTimer = null; }
          }
          
          // Event handlers - use addEventListener for maximum compatibility
          function onMouseEnter() {
            isHovering = true;
            scheduleShow();
          }

          function onMouseLeave() {
            isHovering = false;
            scheduleHide();
          }

          targetEl.addEventListener('mouseenter', onMouseEnter);
          targetEl.addEventListener('mouseleave', onMouseLeave);

          // Subscribe to shared shift state changes (single document listener
          // managed by ShiftStateTracker, not one per directive instance).
          // When shift state flips, re-evaluate the current tooltip state:
          //  - If tooltip is shown and new state says hide -> hide it
          //  - If we're hovering and new state says show -> show it
          var unsubscribeShift = ShiftStateTracker.onChange(function() {
            if (isShown && shouldHideByShift()) {
              doHide();
            } else if (isHovering && !isShown && !shouldHideByShift()) {
              scheduleShow();
            }
          });

          // Watch the interpolated content attribute for changes.
          // Use $observe (not $watch) because by link time
          // attrs.spellTooltipContent is already the interpolated HTML
          // string (e.g. "<b>0.8767...</b>..."). $watch would compile
          // that string with $parse and throw $parse:syntax on the first
          // '<' character. $observe watches the attribute as a plain
          // string, which is what we want here.
          if (attrs.spellTooltipContent) {
            attrs.$observe('spellTooltipContent', function(newVal) {
              config.content = newVal || '';
              if (isShown) {
                doShow();
              }
            });
          }

          // Cleanup
          scope.$on('$destroy', function() {
            clearTimers();
            isHovering = false;
            isShown = false;
            TooltipManager.hide(targetEl);
            targetEl.removeEventListener('mouseenter', onMouseEnter);
            targetEl.removeEventListener('mouseleave', onMouseLeave);
            if (typeof unsubscribeShift === 'function') unsubscribeShift();
          });
        }
      };
    }
  ]);

  // ============================================================================
  // SIMPLE SPELL TOOLTIP DIRECTIVE (alternative)
  // ============================================================================
  
  angular.module('spellTooltips').directive('spellTooltipSimple', [
    '$timeout',
    'TooltipManager',
    function($timeout, TooltipManager) {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
          var targetEl = element[0];
          var showDelay = 100;
          var hideDelay = 50;
          var showTimer = null;
          var hideTimer = null;
          var isHovering = false;
          
          function onMouseEnter() {
            isHovering = true;
            if (showTimer) $timeout.cancel(showTimer);
            if (hideTimer) $timeout.cancel(hideTimer);
            showTimer = $timeout(function() {
              if (isHovering) {
                TooltipManager.show(targetEl, attrs.tooltipContent || '', {
                  direction: attrs.tooltipDirection || 'above',
                  customClass: attrs.tooltipClass || ''
                });
              }
            }, showDelay);
          }
          
          function onMouseLeave() {
            isHovering = false;
            if (showTimer) $timeout.cancel(showTimer);
            if (hideTimer) $timeout.cancel(hideTimer);
            hideTimer = $timeout(function() {
              TooltipManager.hide(targetEl);
            }, hideDelay);
          }
          
          targetEl.addEventListener('mouseenter', onMouseEnter);
          targetEl.addEventListener('mouseleave', onMouseLeave);
          
          scope.$on('$destroy', function() {
            if (showTimer) $timeout.cancel(showTimer);
            if (hideTimer) $timeout.cancel(hideTimer);
            isHovering = false;
            TooltipManager.hide(targetEl);
            targetEl.removeEventListener('mouseenter', onMouseEnter);
            targetEl.removeEventListener('mouseleave', onMouseLeave);
          });
        }
      };
    }
  ]);

})();
