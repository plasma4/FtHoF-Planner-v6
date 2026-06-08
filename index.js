'use strict';
// This is the random seeding script used by Orteil.
(function (a, b, c, d, e, f) {
  function k(a) {
    var b,
      c = a.length,
      e = this,
      f = 0,
      g = (e.i = e.j = 0),
      h = (e.S = []);
    for (c || (a = [c++]); d > f; ) h[f] = f++;
    for (f = 0; d > f; f++)
      ((h[f] = h[(g = j & (g + a[f % c] + (b = h[f])))]), (h[g] = b));
    (e.g = function (a) {
      for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--; )
        ((b = h[(f = j & (f + 1))]),
          (c = c * d + h[j & ((h[f] = h[(g = j & (g + b))]) + (h[g] = b))]));
      return ((e.i = f), (e.j = g), c);
    })(d);
  }

  function l(a, b) {
    var e,
      c = [],
      d = (typeof a)[0];
    if (b && 'o' == d)
      for (e in a)
        try {
          c.push(l(a[e], b - 1));
        } catch (f) {}
    return (
      c.length ? c
      : 's' == d ? a
      : a + '\0'
    );
  }

  function m(a, b) {
    for (var d, c = a + '', e = 0; c.length > e; )
      b[j & e] = j & ((d ^= 19 * b[j & e]) + c.charCodeAt(e++));
    return o(b);
  }

  function n(c) {
    try {
      return (a.crypto.getRandomValues((c = new Uint8Array(d))), o(c));
    } catch (e) {
      return [+new Date(), a, a.navigator.plugins, a.screen, o(b)];
    }
  }

  function o(a) {
    return String.fromCharCode.apply(0, a);
  }

  var g = c.pow(d, e),
    h = c.pow(2, f),
    i = 2 * h,
    j = d - 1;
  ((c.seedrandom = function (a, f) {
    var j = [],
      p = m(
        l(
          f ? [a, o(b)]
          : 0 in arguments ? a
          : n(),
          3
        ),
        j
      ),
      q = new k(j);
    return (
      m(o(q.S), b),
      (c.random = function () {
        for (var a = q.g(e), b = g, c = 0; h > a; )
          ((a = (a + c) * d), (b *= d), (c = q.g(1)));
        for (; a >= i; ) ((a /= 2), (b /= 2), (c >>>= 1));
        return (a + c) / b;
      }),
      p
    );
  }),
    m(c.random(), b));
})(this, [], Math, 256, 6, 52);

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class LocalStorageManager {
  constructor(key, configs) {
    this.key = key;
    this.always = configs.always ?? (() => {});
    this.firstLoad = configs.firstLoad ?? (() => {});
    this.loadFunc = configs.load ?? (() => {});
    if (configs.save) {
      this.saveFunc = configs.save;
    } else {
      this.saveFunc = null;
    }
  }

  static all = {};
  static register(manager) {
    this.all[manager.key] = manager;
    return manager;
  }
  static get(name) {
    return this.all[name] ?? null;
  }

  save() {
    if (this.saveFunc && localStorage?.setItem) {
      localStorage.setItem(this.key, JSON.stringify(this.saveFunc()));
    }
  }
  load() {
    if (this.loadFunc && localStorage?.getItem) {
      const result = localStorage.getItem(this.key);
      if (!result) {
        this.firstLoad();
        this.always();
        return;
      }
      this.always();
      this.loadFunc(JSON.parse(result));
    }
  }
  static loadAll() {
    for (let i in this.all) {
      this.all[i].load();
    }
  }
  wipe() {
    localStorage.removeItem(this.key);
  }
  static resetAll() {
    for (let i in this.all) {
      this.all[i].wipe();
    }
  }
}

var app = angular.module('myApp', [
  'ngMaterial',
  'dndLists',
  'spellTooltips'
]);

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('normal');
  $mdThemingProvider.theme('dark').dark();
});

app.controller('myCtrl', function ($scope) {
  $scope.advancedFeatures = false;
  $scope.unifiedGuideIsOpen = false;
  $scope.visualOptionsShowing = false;
  $scope.backfireModifiersPanelOpen = false;
  $scope.magicCountsPanelOpen = false;

  $scope.dark_mode = false;

  $scope.seed = '';
  $scope.hasSeed = false;
  $scope.ascensionMode = 0;
  $scope.spellsCastTotal = 0;
  $scope.spellsCastThisAscension = 0;
  $scope.dragonflight = false;
  $scope.supremeintellect = false;
  $scope.realitybending = false;
  $scope.diminishineptitude = false;
  $scope.diminishineptitudebackfire = false;
  $scope.on_screen_cookies = 0;
  $scope.min_combo_length = 2;
  $scope.max_combo_length = 4;
  $scope.max_spread = 2;
  //$scope.save_string = "Mi4wMTl8fDE1NTcwMjQwMjkzMjQ7MTUyNTU2Mzg4NjQ5ODsxNTU3MDI2MDY3NTI2O1ByZXR0eSBCaXNjdWl0O2ljb2NkfDExMTExMTExMTAwMTAwMTAwMDAxMHwzMTcyOTc5ODU2ODk2MS4wNzsyNDk5OTU5MzQxMDEyOTYuNjszNTE0OzgzMzc7Nzc3NzExMzQ3NDEzMDIuMjc7NzI2ODU7MDszOzEuNjMwODE0MDg0NjAwMTQxOGUrMTAxOzA7MDswOzA7MDsxMDg7MTE7MDswOzExOzE7MjU4MzAzNjsxO2NocmlzdG1hczswOzA7NS40NjM0NjQ4MjMyNzM2MjRlKzI5OzUuNDYzNDY0ODIzMjczNjI0ZSsyOTsxMDM0OTI0NTIwNTExOzA7MDsyMjY7MjI4OzIyMzsyMjI7MjI1OzU7MTswOzE7MTAwOzA7MDsxODk7NDY3OzE1NTcwMjM1NTE1NDY7MTU1Njk5MjAzMDQ0ODswOzEyOSwyMjc7NDA7fDE2MCwxNjAsMTg0MDI4NTc4NDIyMCwxLCwwOzE1MCwxNTAsNzE2NTA1ODQ0NTcwLDEsLDA7MTAwLDIxMCwyODczMDgyMzkzMyw5LDE1NTcwMjYyODY2MDQ6MDoxNTU3MDI0MDI5MzMxOjA6MDozNzM5OjE6MToxNTU3MDI0MDI5MzMxOiAxMTExMTAxMDExMTExMTAwMDAwMDEwMTEwMDAwMDAwMTAwIDA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOiwwOzEwMCwyMDAsODg2MTIxODQ2MDMsMSwsMDsxMDAsMTgwLDE5NjIxNTUxOTQzMSwxLCwwOzgwLDE1MCw3MzUxMjI3MzcxNzcsMSwsMDs1MCw1MCwxNzUzMjgyNjI2MDA4LDEsMi8tMS8tMSAyIDE1NTcwMjU5NTgwMzQgMSwwOzUwLDUxLDY5OTUwMzAwMjc2NTksMSwzNiAwIDM1NTUgMSwwOzMwLDMwLDE5Njg2NTA3NjkzNjA0LDEsLDA7MTUsMTUsMjE5ODQxODMyNjA2NDIsMSwsMDsxMCwxMCwyMzI3OTQ1NzQyMDkyOCwxLCwwOzUsNSw1OTkyOTYzODI0OTY5OSwyLCwwOzAsMCwwLDQsLDA7MCwwLDAsMTAsLDA7MCwwLDAsNCwsMDswLDAsMCwxMCwsMDt8MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAxMDEwMDAxMDEwMDAxMTExMTExMTExMTExMTExMTExMTExMTEwMDExMTExMTExMDAwMDAwMDAxMTExMTAxMTExMTExMTExMTExMTAwMDAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTEwMDExMTEwMDAwMDAwMDExMDAxMTExMTAwMDEwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAwMDExMTExMTExMDAwMDAwMDAwMDExMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDExMDAxMTAwMTEwMDExMTExMTExMTEwMDAwMDAwMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTAxMDEwMDAxMDAwMDAxMDAwMTEwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDEwMTEwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMTExMTAwMTExMTAwMTEwMDAwMDAxMTExMTExMTAwMDAxMTExMTExMTAwMDAxMTExMTExMDAwMDAxMTExMTExMTExMTEwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDExMTExMTExMTExMTExMDAxMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExMTExMTExMTExMTExMDExMTExMTExMDAwMDExMDAwMDEwMDAwMDAwMDAxMDAwMDAxMDAwMTAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMDExMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAxMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTExMTAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTEwMDExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTEwMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMXwxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTEwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDExMTEwMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExfA%3D%3D%21END%21%3D%3D%21END%21"
  $scope.save_string = '';
  $scope.lookahead = 200;
  $scope.load_more_count = 50;
  $scope.cast_spell_count = 1;

  // Visual options defaults (all persisted across reloads)
  $scope.default_font = false;
  $scope.change_icons = false;
  $scope.hide_effect_elaboration = false;
  $scope.invert_tooltip_hide_rules = false;
  $scope.old_gfd_icons = false;

  // Combo finder defaults (all persisted across reloads)
  $scope.comboFinder = false;
  $scope.include_ef_in_sequence = true;
  $scope.skip_abominations = true;
  $scope.skip_edifices = true;

  // Finnless Destroyer (specialized combo finder for Finnless ruleset)
  // Modeled after the mod by xyntercept — see assets/finnless-destroyer.js
  $scope.fd_lookahead = 10000;
  $scope.fd_fthofRange = 12;
  $scope.fd_fthofNeeded = 8;
  $scope.fd_useSkips = true;
  $scope.fd_checkResolve = true;
  $scope.fd_autoRun = false;
  $scope.fd_output = '';
  $scope.fd_running = false;
  $scope.fd_lastResultCount = 0;
  $scope.finnlessDestroyerOpen = false;
  /**
   * Compute a single CastRow at position `index` whose underlying spell is
   * `currentSpell` (i.e. the (spellsCastTotal + index)-th FtHoF cast).
   * Also returns whether this row qualifies as a "BS" combo element and
   * whether it should be skipped by the combo finder (Abomination / Edifice).
   */
  function computeCastRow(currentSpell, index) {
    Math.seedrandom($scope.seed + '/' + currentSpell);
    const allSpells = new Array(10);
    for (let ii = 0; ii < 10; ii++) {
      allSpells[ii] = Math.random();
    }

    const cookie1Success = check_cookies(allSpells, 0, true);
    const cookie2Success = check_cookies(allSpells, 1, true);
    //cookie3 = check_cookies(allSpells, '', true)
    const cookie1Backfire = check_cookies(allSpells, 0, false);
    const cookie2Backfire = check_cookies(allSpells, 1, false);
    const gambler = check_first_call(allSpells);
    const c = new CastRow(
      cookie1Success,
      cookie1Backfire,
      cookie2Success,
      cookie2Backfire,
      gambler,
      index
    );

    // `isBS` / `isSkip` are kept on the result for backwards compatibility,
    // but the authoritative combo classification is performed by
    // `recomputeComboIndices()` (which has access to neighboring rows — the
    // GFD outcome of row `i` manifests on row `i + 1`). The values below are
    // best-effort based purely on what `computeCastRow` can see on its own:
    //   - `isBS` is true when this row's own FtHoF outcomes contain a BS (or
    //     an EF, when include_ef_in_sequence is set). GFD contributions are
    //     NOT included here because the next row isn't available yet.
    //   - `isSkip` is true when this row's GFD picks a skippable spell.
    const isBS = cookiesContainBuffs(
      $scope.include_ef_in_sequence,
      cookie1Success,
      cookie2Success,
      cookie1Backfire,
      cookie2Backfire
    );
    const gfdOutcome = gambler.GFDOutcome();
    const gfdName = gfdOutcome?.name;
    const gfdBackfired = gambler.backfires(
      Math.max($scope.baseBackfireChance, 0.5)
    );
    const isSkip =
      ($scope.skip_abominations && gfdName == 'Resurrect Abomination') ||
      ($scope.skip_edifices &&
        gfdName == 'Spontaneous Edifice' &&
        !gfdBackfired);

    return { row: c, isBS, isSkip };
  }

  /**
   * Re-derive bsIndices / skipIndices from the current $scope.cookies list.
   * Used by incremental updates (cast_n_spells / load_n_more) after the
   * cookies array has been mutated.
   *
   * For each row we need two pieces of information:
   *   1. Whether the row itself is a Building Special / Elder Frenzy element
   *      (either because the row's own FtHoF outcomes are BS/EF, or because
   *      the row's GFD outcome — if any — yields a BS/EF on the NEXT row).
   *   2. Whether the row can be "skipped" for combo planning (i.e. GFD on this
   *      row would resolve to a non-combo spell: Resurrect Abomination, or a
   *      successful Spontaneous Edifice, where "successful" means the GFD
   *      itself did not backfire, mirroring the historical guide).
   *
   * The old code accessed `c.firstCall.hasBs` / `.hasEf` / `.type` / `.backfire`
   * — properties that don't exist on the refactored `FirstCallEntry` class.
   * Those checks always evaluated to `undefined`, so the bsIndices /
   * skipIndices lists were always empty and the combo finder never produced
   * any results. The new implementation uses the public `FirstCallEntry` API
   * (`GFDOutcome()`, `backfires(...)`) instead.
   */
  function recomputeComboIndices() {
    const bsIndices = [];
    const skipIndices = [];
    const fthofSpell = $scope.spells['hand of fate'];
    for (let i = 0; i < $scope.cookies.length; i++) {
      const c = $scope.cookies[i];
      // (1) Does the row's own FtHoF outcome contain BS / (optional) EF?
      const rowIsBs = cookiesContainBuffs(
        $scope.include_ef_in_sequence,
        c.noChangeSuccess,
        c.changeSuccess,
        c.noChangeBackfire,
        c.changeBackfire
      );

      // (2) Does this row's GFD outcome yield a BS / EF? GFD only contributes
      //     a BS/EF when it picks Force the Hand of Fate — and in that case
      //     the actual outcome manifests on the *next* spell index, which is
      //     row i+1 in $scope.cookies.
      const gfdOutcome = c.firstCall.GFDOutcome();
      const gfdPicksFtHoF = gfdOutcome === fthofSpell;
      const nextRow = i + 1 < $scope.cookies.length ? $scope.cookies[i + 1] : null;
      const gfdYieldsBs = gfdPicksFtHoF && rowHasBuff(nextRow, 'Building Special');
      const gfdYieldsEf = gfdPicksFtHoF && rowHasBuff(nextRow, 'Elder Frenzy');

      if (rowIsBs || gfdYieldsBs || ($scope.include_ef_in_sequence && gfdYieldsEf)) {
        bsIndices.push(i);
      }

      // (3) Skip conditions: GFD picks Resurrect Abomination (always), or
      //     picks Spontaneous Edifice and the GFD itself doesn't backfire.
      //     GFD has a 50% backfire floor (`failChanceMax: 0.5` in the spell
      //     definition) — see FirstCallEntry.GFDOutcomeIcon / GFDTooltip.
      const gfdName = gfdOutcome?.name;
      const gfdBackfired = c.firstCall.backfires(
        Math.max($scope.baseBackfireChance, 0.5)
      );
      if (
        ($scope.skip_abominations && gfdName == 'Resurrect Abomination') ||
        ($scope.skip_edifices &&
          gfdName == 'Spontaneous Edifice' &&
          !gfdBackfired)
      ) {
        skipIndices.push(i);
      }
    }
    return { bsIndices, skipIndices };
  }

  /**
   * Re-run the highlight processing pipeline (clear / parse / apply) for
   * every row. Reused by incremental updates to keep cross-row highlight
   * references (e.g. isBS:-1) consistent after the cookies list changes.
   */
  function reprocessHighlights() {
    for (let i in $scope.cookies) {
      $scope.cookies[i].clearAllHighlights();
    }
    let processedSoFar = 0;
    const totalProcessCount = Array.from($scope.highlightConditions.values())
      .reduce(
        (acc, cur) =>
          acc + (!cur.enabled || cur.parseError ? 0 : 5 * $scope.cookies.length),
        0
      );
    while (processedSoFar < totalProcessCount) {
      const prev = processedSoFar;
      for (let i in $scope.cookies) {
        processedSoFar += $scope.cookies[i].parseHighlights();
      }
      if (processedSoFar == prev) {
        $scope.highlightingRuntimeErrors =
          'RUNTIME ERROR: Was not able to resolve all conditions (' +
          processedSoFar +
          ' / ' +
          totalProcessCount +
          ') due to unresolvable dependencies. Check that there are no circular dependencies in your highlight settings.';
        break;
      } // Infinite loop
    }
    for (let i in $scope.cookies) {
      $scope.cookies[i].setAllHighlights();
      $scope.cookies[i].computeDisplayCaches();
    }
  }

  /**
   * Cheap tooltip refresh: rebuilds only the per-cookie display caches
   * (tooltips, postfix text, icons, etc.) without re-running highlight
   * parsing. Used by flagApplySettings() so the "unapplied settings"
   * warning appears/disappears in every tooltip the moment the flag
   * toggles, without forcing a full recompute.
   */
  function refreshTooltips() {
    if (!$scope.cookies) return;
    for (let i in $scope.cookies) {
      $scope.cookies[i].computeDisplayCaches();
    }
  }

  /**
   * Recompute the $scope.combos map from the supplied bs/skip indices.
   */
  function recomputeCombos(bsIndices, skipIndices) {
    $scope.combos = {};
    for (
      var combo_length = $scope.min_combo_length;
      combo_length <= $scope.max_combo_length;
      combo_length++
    ) {
      $scope.combos[combo_length] = findCombos(
        combo_length,
        $scope.max_spread,
        bsIndices,
        skipIndices
      );
    }
  }

  $scope.load_more = function () {
    if ($scope.seed === '') { return; }
    $scope.load_n_more($scope.load_more_count);
  };

  $scope.cast_spell = function () {
    if ($scope.seed === '') { return; }
    $scope.cast_n_spells($scope.cast_spell_count);
  };

  /**
   * Incremental "cast spell": simulate casting `n` spells, drop the first
   * `n` rows from $scope.cookies, and append `n` freshly computed rows at
   * the end. Much faster than a full update_cookies() for large lookaheads.
   */
  $scope.cast_n_spells = function (n) {
    n = parseInt(n, 10);
    if (!isFinite(n) || n < 1) return;
    var currentTime = Date.now();
    $scope.spellsCastThisAscension += n;
    $scope.spellsCastTotal += n;
    // Drop the first n rows.
    $scope.cookies.splice(0, n);
    // Re-index the remaining rows.
    for (let i = 0; i < $scope.cookies.length; i++) {
      $scope.cookies[i].index = i;
    }
    // Append n fresh rows at the end.
    const startIndex = $scope.cookies.length;
    for (let i = 0; i < n; i++) {
      const newIndex = startIndex + i;
      const currentSpell = newIndex + $scope.spellsCastTotal;
      const { row } = computeCastRow(currentSpell, newIndex);
      $scope.cookies.push(row);
    }
    const { bsIndices, skipIndices } = recomputeComboIndices();
    reprocessHighlights();
    recomputeCombos(bsIndices, skipIndices);
    console.log('cast_n_spells(' + n + ') took ' + (Date.now() - currentTime) + 'ms');
  };

  /**
   * Incremental "load more": append `n` freshly computed rows to the end of
   * $scope.cookies without regenerating the entire list. Updates lookahead
   * to reflect the new total row count.
   */
  $scope.load_n_more = function (n) {
    n = parseInt(n, 10);
    if (!isFinite(n) || n < 1) return;
    var currentTime = Date.now();
    $scope.lookahead += n;
    const startIndex = $scope.cookies.length;
    for (let i = 0; i < n; i++) {
      const newIndex = startIndex + i;
      const currentSpell = newIndex + $scope.spellsCastTotal;
      const { row } = computeCastRow(currentSpell, newIndex);
      $scope.cookies.push(row);
    }
    const { bsIndices, skipIndices } = recomputeComboIndices();
    reprocessHighlights();
    recomputeCombos(bsIndices, skipIndices);
    console.log('load_n_more(' + n + ') took ' + (Date.now() - currentTime) + 'ms');
  };
  $scope.wantedBS = 200;
  $scope.magic = 999;
  $scope.max_magic = 999;
  $scope.config = '';
  // Preset decent strategies; TODO
  // $scope.possibleStrats = [null, "522fthof 52di/F 22fthof R+522fthof 22fthof\r\n522fthof 52F/hc 22fthof R+522di/hc 322fthof 22fthof", "547fthof 47di/F 27fthof R+547 47\r\n547fthof 47F/hc 27fthof, 547di/hc, 347fthof, 27fthof\r\n547fthof, 47di/F, 27fthof, R+517st, 317fthof, 17fthof\r\n547fthof, 47F/gfd, R+547di/hc, 327fthof, 27fthof"]

  // $scope.get_data = function () {
  // 	var cookies = []
  // 	var randomSeeds = [];
  // 	$scope.baseBackfireChance = 0.15 * ($scope.supremeintellect ? 1.1 : 1) * ($scope.diminishineptitude ? 0.1 : 1);
  // 	$scope.backfireChance = $scope.baseBackfireChance + 0.15 * $scope.on_screen_cookies;
  // 	var bsIndices = [];
  // 	var skipIndices = [];
  // 	var currentTime = Date.now();
  // 	for (var i = 0; i < $scope.lookahead; i++) {
  // 		var currentSpell = i + $scope.spellsCastTotal;
  // 		Math.seedrandom($scope.seed + '/' + currentSpell);
  // 		var roll = Math.random();
  // 		randomSeeds.push(roll);

  // 		var c = []
  // 		cookie1Success = check_cookies($scope.spellsCastTotal + i, 0, true)
  // 		cookie2Success = check_cookies($scope.spellsCastTotal + i, 1, true)
  // 		//cookie3 = check_cookies($scope.spellsCastTotal + i, 1)
  // 		cookie1Backfire = check_cookies($scope.spellsCastTotal + i, 0, false)
  // 		cookie2Backfire = check_cookies($scope.spellsCastTotal + i, 1, false)
  // 		var gambler = check_gambler($scope.spellsCastTotal + i)
  // 		c.push(cookie1Success)
  // 		c.push(cookie2Success)
  // 		c.push(cookie1Backfire)
  // 		c.push(cookie2Backfire)
  // 		c.push(gambler)
  // 		cookies.push(c)

  // 		if (cookiesContainBuffs($scope.include_ef_in_sequence, cookie1Success, cookie2Success, cookie1Backfire, cookie2Backfire) || gambler.hasBs || ($scope.include_ef_in_sequence && gambler.hasEf)) {
  // 			bsIndices.push(i);
  // 		}

  // 		if (($scope.skip_abominations && gambler.type == 'Resurrect Abomination') || ($scope.skip_edifices && gambler.type == 'Spontaneous Edifice' && !gambler.backfire)) {
  // 			skipIndices.push(i);
  // 		}

  // 		var arr = [];
  // 		if (randomSeeds[i] + $scope.backfireChance < 1) {
  // 			arr.push(c[0]);
  // 			arr.push(c[1]);
  // 			if (c[2].type == "Elder Frenzy") { arr[0].type += " (EF)"; arr[0].noteworthy = true; }
  // 			if (c[3].type == "Elder Frenzy") { arr[1].type += " (EF)"; arr[1].noteworthy = true; }
  // 			if (c[2].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
  // 			if (c[3].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
  // 		}
  // 		else {
  // 			arr.push(c[2]);
  // 			arr.push(c[3]);
  // 			if (c[0].type == "Building Special") { arr[0].type += " (BS)"; arr[0].noteworthy = true; }
  // 			if (c[1].type == "Building Special") { arr[1].type += " (BS)"; arr[1].noteworthy = true; }
  // 			if (c[0].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
  // 			if (c[1].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
  // 		}
  // 		arr.push(gambler);
  // 	}
  // 	return cookies;
  // }

  // $scope.calculate_combos = function () {
  // 	var data = $scope.get_data()
  // 	console.info("Raw data: ", data)
  // 	delete $scope.combos
  // }

  $scope.guideHidingStatuses = new Array(10).fill(false);

  $scope.load_game = function (str, fromURL) {
    if (!str) {
      str = $scope.save_string;
    }
    str = str.trim();
    $scope.hasSeed = true;
    LocalStorageManager.get('hasSeed').save();
    if (str.length === 5) {
      $scope.seed = str;
      if (!fromURL)
        $scope.spellsCastTotal = Number(prompt('Total spells cast (all time)?'));
      if (!isFinite($scope.spellsCastTotal)) $scope.spellsCastTotal = 0;
      $scope.spellsCastThisAscension = $scope.spellsCastTotal;
      $scope.update_cookies();
      if ($scope.fd_autoRun) {
        $scope.$evalAsync($scope.runFinnlessDestroyer);
      }
      return;
    }
    var str = str.split('!END!')[0];
    str = Base64.decode(str);
    str = str.split('|');
    var spl = str[2].split(';');
    $scope.seed = spl[4];
    console.log('Seed: ' + $scope.seed);

    spl = str[4].split(';');
    $scope.ascensionMode = parseInt(spl[29]);
    console.log(spl);
    spl = str[5].split(';');
    console.log(spl[7]);

    $scope.spellsCastTotal = parseInt(spl[7].split(' ')[2]) || 0;
    console.log('Total spells cast: ' + $scope.spellsCastTotal);

    $scope.spellsCastThisAscension = parseInt(spl[7].split(' ')[1]) || 0;
    console.log(
      'Spells cast this ascension: ' + $scope.spellsCastThisAscension
    );

    $scope.update_cookies();

    // Auto-run Finnless Destroyer if the user opted in. We schedule it on
    // $evalAsync so it runs after the prediction table is rendered and the
    // user sees the table before the heavy scan blocks the main thread.
    if ($scope.fd_autoRun) {
      $scope.$evalAsync($scope.runFinnlessDestroyer);
    }
  };
  $scope.setHasSeed = function() {
    $scope.hasSeed = true;
    LocalStorageManager.get('hasSeed').save();
  }

  class CastRow {
    constructor(
      noChangeSuccess,
      noChangeBackfire,
      changeSuccess,
      changeBackfire,
      firstCall,
      index
    ) {
      this.firstCall = firstCall;
      this.firstCall.setParent(this);
      this.noChangeSuccess = noChangeSuccess;
      this.noChangeBackfire = noChangeBackfire;
      this.changeSuccess = changeSuccess;
      this.changeBackfire = changeBackfire;
      this.index = index;
    }

    getCast(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.getCastChange(backfireChance)
        : this.getCastNoChange(backfireChance);
    }
    getOtherCast(change, backfireChance = $scope.baseBackfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1 ? 0 : 1;
      return change ?
          this.getCastChange(backfiring)
        : this.getCastNoChange(backfiring);
    }
    getCastNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      return backfiring ? this.noChangeBackfire : this.noChangeSuccess;
    }
    getCastChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      return backfiring ? this.changeBackfire : this.changeSuccess;
    }

    backfiring(backfireChance = $scope.baseBackfireChance) {
      return backfireChance + this.firstCall.value >= 1;
    }

    stringify(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.stringifyChange(backfireChance)
        : this.stringifyNoChange(backfireChance);
    }
    postfix(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.postfixChange(backfireChance)
        : this.postfixNoChange(backfireChance);
    }
    stringifyNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.noChangeSuccess.name;
      } else {
        return this.noChangeBackfire.name;
      }
    }
    postfixNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.noChangeSuccess.settings.hiddenIndicator ?
            ` (${this.noChangeSuccess.shorthand})`
          : ``;
      } else {
        return this.noChangeBackfire.settings.hiddenIndicator ?
            ` (${this.noChangeBackfire.shorthand})`
          : ``;
      }
    }
    stringifyChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.changeSuccess.name;
      } else {
        return this.changeBackfire.name;
      }
    }
    postfixChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.changeSuccess.settings.hiddenIndicator ?
            ` (${this.changeSuccess.shorthand})`
          : ``;
      } else {
        return this.changeBackfire.settings.hiddenIndicator ?
            ` (${this.changeBackfire.shorthand})`
          : ``;
      }
    }

    parseHighlights() {
      const a = this.firstCall.iterateHighlights(this),
      b = this.noChangeSuccess.iterateHighlights(this),
      c = this.noChangeBackfire.iterateHighlights(this),
      d = this.changeSuccess.iterateHighlights(this),
      e = this.changeBackfire.iterateHighlights(this);
      return a + b + c + d + e;
    }
    setAllHighlights() {
      this.firstCall.setHighlights();
      this.noChangeSuccess.setHighlights();
      this.noChangeBackfire.setHighlights();
      this.changeSuccess.setHighlights();
      this.changeBackfire.setHighlights();
    }
    clearAllHighlights() {
      this.firstCall.clearHighlights();
      this.noChangeSuccess.clearHighlights();
      this.noChangeBackfire.clearHighlights();
      this.changeSuccess.clearHighlights();
      this.changeBackfire.clearHighlights();
    }

    computeDisplayCaches() {
      const cookie_list = this;
      const baseBackfireChance = $scope.baseBackfireChance;
      const access_cookie = $scope.access_cookie;
      this.__spellIndexText = (this.index + 1) + " (" + ($scope.spellsCastThisAscension + this.index + 1) + " | " +
        ($scope.spellsCastTotal + this.index + 1) + ")";

      // Build the prediction tooltips for both "change" states.
      // Format: (active effect description) + md-divider + If (isbackfiring:'If it does not backfire:':'if it does backfire') + the other effect for the same "change" status + <br> + description of the hidden effect.
      // The "active" / non-hidden effect is the one returned by getCast() with the base backfire chance.
      const isBackfiring = this.backfiring(baseBackfireChance);
      const otherLabel = isBackfiring ? 'If it does not backfire: ' : 'If it does backfire: ';

      // Tiny hint at the bottom of each tooltip — mirrors getFooter behavior.
      // Cached here so it doesn't get rebuilt on every digest cycle.
      const tooltipHint = '<span class="spell-tooltip-hint">Hold SHIFT to toggle this menu.</span>';

      // Warning appended below the SHIFT hint when Combo Finder / Highlight
      // settings have been changed but the user has not yet clicked "Apply
      // Settings". Underlined to draw the eye. Re-evaluated every time
      // computeDisplayCaches() runs (which is triggered from refreshTooltips()
      // inside flagApplySettings()).
      const tooltipWarning = $scope.applySettingsPending
        ? '<br><span class="spell-tooltip-warning"><u>There are unapplied settings. Click "Apply Settings" to refresh the table.</u></span>'
        : '';

      // noChange column
      const noChangeActive = cookie_list.getCast(false);
      const noChangeOther = cookie_list.getOtherCast(false);
      this.__noChangeIcon = noChangeActive.getIcon(isBackfiring);
      this.__noChangeStyles = noChangeActive.getHighlightColor();
      this.__noChangeText = cookie_list.stringify(false);
      this.__noChangePostfixStyles = noChangeOther.getHighlightColor();
      this.__noChangePostfixShow = noChangeOther.settings.hiddenIndicator;
      this.__noChangePostfixText = cookie_list.postfix(false, isBackfiring ? 0 : 1);
      this.__noChangeTooltip =
        ($scope.hide_effect_elaboration?'':(noChangeActive.getTooltip()
        + `<md-divider class="margined"></md-divider>`))
        + otherLabel
        + '<b>' + noChangeOther.toString(true) + '</b>'
        + ($scope.hide_effect_elaboration?'':'<br>'
        + noChangeOther.getTooltip())
        + tooltipHint
        + tooltipWarning;

      // change column
      const changeActive = cookie_list.getCast(true);
      const changeOther = cookie_list.getOtherCast(true);
      this.__changeIcon = changeActive.getIcon(isBackfiring);
      this.__changeStyles = changeActive.getHighlightColor();
      this.__changeText = cookie_list.stringify(true);
      this.__changePostfixStyles = changeOther.getHighlightColor();
      this.__changePostfixShow = changeOther.settings.hiddenIndicator;
      this.__changePostfixText = cookie_list.postfix(true, isBackfiring ? 0 : 1);
      this.__changeTooltip =
        ($scope.hide_effect_elaboration?'':(changeActive.getTooltip()
        + `<md-divider class="margined"></md-divider>`))
        + otherLabel
        + '<b>' + changeOther.toString(true) + '</b>'
        + ($scope.hide_effect_elaboration?'':'<br>'
        + changeOther.getTooltip())
        + tooltipHint
        + tooltipWarning;

      this.__gfdIcon = cookie_list.firstCall.GFDOutcomeIcon(access_cookie(cookie_list.index + 1)?access_cookie(cookie_list.index + 1).firstCall.backfires(Math.max(baseBackfireChance, 0.5)):0);
      this.__gfdStyles = cookie_list.firstCall.getHighlightColor();
      this.__gfdOutcomeText = cookie_list.firstCall.GFDOutcomeText();

      // GFD outcome tooltip: spell description (or failDesc) based on whether
      // the next row's first call would backfire (same backfire source as the icon).
      // If GFD casts FtHoF, the next row's Default + Seasonal outcomes are appended.
      const gfdNextRow = access_cookie(cookie_list.index + 1) || null;
      const gfdBackfires = gfdNextRow
        ? gfdNextRow.firstCall.backfires(Math.max(baseBackfireChance, 0.5))
        : 0;
      this.__gfdTooltip = cookie_list.firstCall.GFDTooltip(gfdBackfires, gfdNextRow) + tooltipHint + tooltipWarning;

      this.__randomSeedText = cookie_list.firstCall.value.toFixed(4) + " (" +
        (cookie_list.firstCall.value + baseBackfireChance > 1 ? 0 :
          ((1.075 - cookie_list.firstCall.value - baseBackfireChance) / 0.15).toFixed(0)) +
        " onscreen" + (Math.round((1.075 - cookie_list.firstCall.value - baseBackfireChance) / 0.15) != 1 ? 's' : '') + ")";

      // ----------------------------------------------------------------
      // Random seed tooltip: smart backfire threshold detection.
      // Logic lives on FirstCallEntry.randomSeedTooltip() — see above.
      // Cached here so digest cycles don't rebuild it.
      // ----------------------------------------------------------------
      this.__randomSeedTooltip =
        cookie_list.firstCall.randomSeedTooltip(
          $scope.supremeintellect,
          $scope.realitybending,
          $scope.diminishineptitude,
          $scope.diminishineptitudebackfire
        ) + tooltipHint + tooltipWarning;
    }
  }
  $scope.access_cookie = function (row) {
    return $scope.cookies[row];
  };
  $scope.update_cookies = function () {
    $scope.cookies = [];
    $scope.randomSeeds = [];
    $scope.baseBackfireChance =
      (0.15 +
        ($scope.supremeintellect ? 0.015 : 0) +
        ($scope.realitybending ? 0.0015 : 0)) *
      ($scope.diminishineptitude ? 0.1 : 1) *
      ($scope.diminishineptitudebackfire ? 5 : 1);
    $scope.backfireChance =
      $scope.baseBackfireChance + 0.15 * $scope.on_screen_cookies;
    $scope.displayCookies = [];
    var currentTime = Date.now();
    for (var i = 0; i < $scope.lookahead; i++) {
      var currentSpell = i + $scope.spellsCastTotal;
      const { row } = computeCastRow(currentSpell, $scope.cookies.length);
      $scope.cookies.push(row);
    }
    const { bsIndices, skipIndices } = recomputeComboIndices();
    reprocessHighlights();
    recomputeCombos(bsIndices, skipIndices);
    console.log($scope.cookies);
    console.log(bsIndices);
    console.log(skipIndices);

    console.log('Combos: ');
    console.log($scope.combos);
    console.log(Date.now() - currentTime);
  };

  $scope.collapse_interface = function (contentId) {
    console.log('content-' + contentId);
    if (contentId) {
      var content = document.getElementById('content-' + contentId);
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    }
  };

  //want to return shortest, and first sequence for a given combo_length
  function findCombos(combo_length, max_spread, bsIndices, skipIndices) {
    let shortestDistance = 10000000;
    let shortestStart = -1;

    let firstDistance = 10000000;
    let firstStart = -1;

    for (var i = 0; i + combo_length <= bsIndices.length; i++) {
      let seqStart = bsIndices[i];
      let seqEnd = bsIndices[i + combo_length - 1];
      let baseDistance = seqEnd - seqStart + 1;

      let skips = skipIndices.filter(
        (idx) => idx > seqStart && idx < seqEnd && !bsIndices.includes(idx)
      );

      let distance = baseDistance - skips.length;
      if (firstStart == -1 && distance <= combo_length + max_spread) {
        firstStart = seqStart;
        firstDistance = distance;
      }

      if (distance < shortestDistance) {
        shortestStart = seqStart;
        shortestDistance = distance;
      }
    }

    return {
      shortest: { idx: shortestStart, length: shortestDistance },
      first: { idx: firstStart, length: firstDistance }
    };
  }

  function cookiesContainBuffs(include_ef, ...cookies) {
    return cookies.some((cookie) => {
      return (
        cookie.name == 'Building Special' ||
        (include_ef && cookie.name == 'Elder Frenzy')
      );
    });
  }

  /**
   * Returns true when any of the four outcomes of a CastRow (noChange/change
   * × success/backfire) has the specified cookie `type` (e.g. 'Building Special'
   * or 'Elder Frenzy'). Used to inspect the *next* row's FtHoF outcomes when
   * the current row's GFD selects Force the Hand of Fate.
   */
  function rowHasBuff(row, type) {
    if (!row) return false;
    return (
      row.noChangeSuccess?.type == type ||
      row.changeSuccess?.type == type ||
      row.noChangeBackfire?.type == type ||
      row.changeBackfire?.type == type
    );
  }

  // -------------------------------------------------------------------------
  // Finnless Destroyer — specialized combo finder for the Finnless ruleset.
  // Adapted from https://raw.githack.com/xyntercept/finnless-destroyer/main/finnless-destroyer.js
  //   (the `isResolvable` and `checkSpells` functions). The original uses the
  // game's RNG to scan a long lookahead for sequences of "Gambler's -> FtHoF"
  // casts that line up with nearby Building Specials. We keep the exact same
  // RNG/scoring algorithm but feed it from $scope.seed and $scope.spellsCastTotal
  // and store the raw result list in $scope.finnlessDestroyerResults so the UI
  // can display it without ever building CastRow objects (which would trigger
  // Angular's full digest on every row).
  // -------------------------------------------------------------------------

  /**
   * Heuristic: is the BS offset (raised by a regular FtHoF) at index `index`
   * reachable by a G!FtHoF triggered at some earlier index? Mirrors the mod's
   * isResolvable() byte-for-byte, returning 1 if the BS can be hit within
   * the offset window given the surrounding spell type distribution.
   */
  function fd_isResolvable(index, spellsList) {
    let points = 0;

    // Regular FtHoF (BS reachable in offsets 1..7)
    if (spellsList[index][0] > 0.125 && spellsList[index][0] < 0.25) {
      for (let i = 1; i <= 7; i++) {
        if (index + i >= spellsList.length) return 0;
        if (spellsList[index + i][1] == 1 || spellsList[index + i][2] == 1)
          return 1;
        else if (i == 7) break;
        else if (
          spellsList[index + i][0] > 0.125 &&
          spellsList[index + i][0] < 0.25
        )
          points += 0;
        else if (
          (spellsList[index + i][0] > 0.375 &&
            spellsList[index + i][0] < 0.5) ||
          (spellsList[index + i][0] > 0.75 &&
            spellsList[index + i][0] < 0.875) ||
          (spellsList[index + i][0] > 0.25 &&
            spellsList[index + i][0] < 2 / 7)
        )
          points += 1;
        else points += 2;
        if (points > 3) return 0;
      }
    }
    // FtHoF-with-2x-offset (offsets 1..2 only)
    else {
      for (let i = 1; i <= 2; i++) {
        if (index + i >= spellsList.length) return 0;
        if (spellsList[index + i][1] == 1 || spellsList[index + i][2] == 1)
          return 1;
        else if (i == 2) break;
        else if (spellsList[index + i][0] > 1 / 7 && spellsList[index + i][0] < 2 / 7)
          points += 0;
        else points += 1;
        if (points > 1) return 0;
      }
    }
    return 0;
  }

  /**
   * Run the Finnless Destroyer scan against $scope.seed starting at
   * $scope.spellsCastTotal. Returns the list of combo start locations (spell
   * counts) and writes a human-readable summary to $scope.fd_output.
   *
   * The data structure produced for each row of the lookahead is a 3-tuple
   *   [firstRandomCall, isBS_noChange, isBS_change]
   * — identical to the mod's `spellsList` rows. We never construct CastRow or
   * FirstCallEntry instances; the scan runs in a tight loop and the RNG state
   * is reset to a fresh seed at the end so the planner's own prediction table
   * is unaffected.
   */
  $scope.runFinnlessDestroyer = function () {
    if ($scope.fd_running) return;
    if (!$scope.hasSeed || !$scope.seed) {
      $scope.fd_output = 'Import a save or seed first.';
      return;
    }

    $scope.fd_running = true;
    $scope.fd_output = 'Running Finnless Destroyer…';

    // Defer one tick so the "Running…" message paints before the heavy loop
    // blocks the main thread. Wrapped in a try/finally so fd_running always
    // resets, and so we re-apply settings on $scope after the loop completes.
    const restore = $scope.$root && $scope.$root.$$phase;
    const run = function () {
      try {
        const lookahead = Math.max(1, parseInt($scope.fd_lookahead) || 10000);
        const fthofRange = Math.max(1, parseInt($scope.fd_fthofRange) || 12);
        const fthofNeeded = Math.max(1, parseInt($scope.fd_fthofNeeded) || 8);
        const useSkips = !!$scope.fd_useSkips;
        const checkResolve = !!$scope.fd_checkResolve;
        const spells = $scope.spellsCastTotal || 0;
        const seed = $scope.seed;

        let maxLength = fthofRange;
        const fthofs = [];
        const skips = [];
        const neededFthofsLocs = [];

        // Pass 1 — collect every spell's first random call and resolve the
        // "is this row a BS under GFD?" answer for the next 1-2 rows.
        const spellsList = [];
        let checkFthof = 0;
        for (let i = spells; i < spells + lookahead; i++) {
          const spellRes = [0, 0, 0];
          Math.seedrandom(seed + '/' + i);
          spellRes[0] = Math.random();

          if (checkFthof > 0 && spellRes[0] < 0.5) {
            // GFD picked FtHoF at this offset — drain the 6 fixed-cost calls
            // the game makes to determine noChange vs change vs backfire.
            Math.random();
            Math.random();
            const call0 = Math.random();
            const call1 = Math.random();
            const call2 = Math.random();
            const call3 = Math.random();
            const call4 = Math.random();
            const call5 = Math.random();

            if (call1 < 0.25 && call2 > 0.15) {
              let numElements = 3;
              if (call0 < 0.1) numElements += 3;
              const bsIndex = numElements;
              numElements++;
              if (call3 < 0.0001) numElements++;
              if (
                call4 > bsIndex / numElements &&
                call4 < (bsIndex + 1) / numElements
              )
                spellRes[1] = 1;
            }
            if (spellRes[1] == 0 && call2 < 0.25 && call3 > 0.15) {
              let numElements = 3;
              if (call1 < 0.1) numElements += 3;
              const bsIndex = numElements;
              numElements++;
              if (call4 < 0.0001) numElements++;
              if (
                call5 > bsIndex / numElements &&
                call5 < (bsIndex + 1) / numElements
              )
                spellRes[2] = 1;
            }

            if (spellRes[1] + spellRes[2] > 0) checkFthof = 0;
          }
          if (checkFthof > 0) checkFthof--;

          if (spellRes[0] > 0.125 && spellRes[0] < 0.25) checkFthof = 7;
          else if (spellRes[0] > 0.25 && spellRes[0] < 2 / 7)
            checkFthof = Math.max(checkFthof, 2);

          spellsList.push(spellRes);
        }

        // Pass 2 — sliding-window search for fthofNeeded G!FtHoFs within
        // maxLength, expanding the window when useSkips is on.
        for (let i = 0; i < lookahead; i++) {
          if (
            spellsList[i][0] > 0.125 &&
            spellsList[i][0] < 0.25 &&
            !checkResolve
          )
            fthofs.push(i);
          if (
            spellsList[i][0] > 0.125 &&
            spellsList[i][0] < 2 / 7 &&
            checkResolve &&
            fd_isResolvable(i, spellsList) == 1
          )
            fthofs.push(i);

          if (useSkips) {
            // Resurrect Abomination
            if (spellsList[i][0] > 0.75 && spellsList[i][0] < 0.875) {
              skips.push(i);
              maxLength++;
            }
            // Spontaneous Edifice success (GFD wouldn't have backfired)
            else if (
              spellsList[i][0] > 0.375 &&
              spellsList[i][0] < 0.5 &&
              i + 1 < lookahead
            ) {
              if (spellsList[i + 1][0] < 0.5) {
                skips.push(i);
                maxLength++;
              }
            }
            // Trim stale skips from the front of the window
            while (skips.length > 0 && skips[0] <= i - maxLength) {
              skips.shift();
              maxLength--;
            }
          }

          // Trim stale fthofs from the front of the window
          while (fthofs.length > 0 && fthofs[0] <= i - maxLength) fthofs.shift();

          if (fthofs.length >= fthofNeeded && neededFthofsLocs.length > 0) {
            if (
              neededFthofsLocs[neededFthofsLocs.length - 1][0] - 1 <
              i + spells - maxLength
            )
              neededFthofsLocs.push([i + 1 + spells, maxLength]);
          } else if (fthofs.length >= fthofNeeded) {
            neededFthofsLocs.push([i + 1 + spells, maxLength]);
          }
        }

        // Reset RNG so the planner's own prediction table is untouched.
        Math.seedrandom();

        // Convert from "end of combo" to "start of combo"
        const startLocs = neededFthofsLocs.map((loc) => [loc[0] - loc[1], loc[1]]);
        $scope.finnlessDestroyerResults = startLocs;
        $scope.fd_lastResultCount = startLocs.length;

        // Build a human-readable summary for the textarea
        const lines = [];
        lines.push(
          'Finnless Destroyer — scanned ' +
            lookahead +
            ' spells from #' +
            (spells + 1) +
            ' (total cast: ' +
            spells +
            ').'
        );
        lines.push(
          'Settings: range=' +
            fthofRange +
            ', needed=' +
            fthofNeeded +
            ', useSkips=' +
            useSkips +
            ', checkResolve=' +
            checkResolve +
            '.'
        );
        if (startLocs.length === 0) {
          lines.push('');
          lines.push('No location with the specified settings was found.');
        } else {
          lines.push('');
          lines.push('Success — ' + startLocs.length + ' location(s) found:');
          for (let k = 0; k < startLocs.length; k++) {
            lines.push(
              '  ' +
                (k + 1) +
                '. combo starts at spell #' +
                startLocs[k][0] +
                ' (window length ' +
                startLocs[k][1] +
                ')'
            );
          }
          lines.push('');
          lines.push(
            'First combo starts at spell #' +
              startLocs[0][0] +
              ' — export a save with that spell count to jump straight to it.'
          );
        }
        $scope.fd_output = lines.join('\n');
      } catch (err) {
        $scope.fd_output = 'Finnless Destroyer error: ' + (err && err.message ? err.message : err);
      } finally {
        $scope.fd_running = false;
        if ($scope.$root && !$scope.$root.$$phase) {
          $scope.$applyAsync();
        }
      }
    };

    // If we're not already inside a digest, schedule the heavy work on the
    // next tick so the spinner/text update paints first.
    if ($scope.$root && $scope.$root.$$phase) {
      run();
    } else {
      $scope.$evalAsync(run);
    }
  };

  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getSpellCost(spellName, costMult) {
    var spell = $scope.spells[spellName];
    var out = spell.costMin;
    if (spell.costPercent) out += $scope.max_magic * spell.costPercent;
    out *= Math.floor(1 - (costMult ?? 0.1 * $scope.supremeintellect));
    return out;
  }

  class FirstCallEntry {
    // GFD and backfiring shares the same RNG call, so we need to store them together
    constructor(GFDRS) {
      this.GFDRS = GFDRS;
    }
    parent = null;
    setParent(parent) {
      this.parent = parent;
    }

    get value() {
      return this.GFDRS;
    }

    backfires(backfireChance = $scope.baseBackfireChance) {
      return this.value + backfireChance >= 1;
    }

    /**
     * Builds the HTML for the "Random Seed" tooltip column.
     * Self-contained: contains all backfire-threshold logic for FtHoF.
     *
     * Backfire chance formula (in this order):
     *   base = 0.15
     *   if SI:  base += 0.015   (+1.5%)
     *   if RB:  base += 0.0015  (+0.15%)
     *   if DI:  base *= 0.1     (÷10)
     *   if DIb: base *= 5      (×5)
     *   final  = base + 0.15 * onscreens
     * Backfire trigger: final + this.value >= 1   (mirrors backfires())
     *
     * @param {boolean} si  - Supreme Intellect active
     * @param {boolean} rb  - Reality Bending active
     * @param {boolean} di  - Diminish Ineptitude active
     * @param {boolean} dib - Diminish Ineptitude (backfire) active
     * @returns {string} HTML to be placed inside the tooltip (no hint suffix).
     */
    randomSeedTooltip(si, rb, di, dib) {
      const fc = this.value;
      const _si  = !!si, _rb  = !!rb, _di  = !!di, _dib = !!dib;
      const mdDivider = '<md-divider class="margined"></md-divider>';

      const backfireChance = (_si, _rb, _di, _dib, onscreens) => {
        let c = 0.15;
        if (_si)  c += 0.015;
        if (_rb)  c += 0.0015;
        if (_di)  c *= 0.1;
        if (_dib) c *= 5;
        return c + 0.15 * onscreens;
      };
      const onscreensFor = (fcval, s, r, d, db) => {
        const base = backfireChance(s, r, d, db, 0);
        return Math.ceil(Math.max(1 - fcval - base, 0) / 0.15);
      };
      // "Smart" min-onscreen detection that also flags when SI / RB
      // would individually push the random seed over the threshold.
      const smartMinOnscreens = () => {
        const base = backfireChance(false, false, false, false, 0);
        if (base + fc >= 1) return { amount: 0, SI: false, RB: false };
        const minChance = 1 - fc;
        const n = Math.floor((minChance - base) / 0.15);
        const overhead = minChance - 0.15 - 0.15 * n;
        if (overhead < 0.0015) return { amount: n, SI: false, RB: true };
        if (overhead < 0.015)  return { amount: n, SI: true,  RB: false };
        if (overhead < 0.0165) return { amount: n, SI: true,  RB: true };
        return { amount: n + 1, SI: false, RB: false };
      };
      const succeedsWith = (s, r, d, db) => backfireChance(s, r, d, db, 0) + fc < 1;

      const minBackfireChance = 1 - fc;
      const baseCurrent       = backfireChance(_si, _rb, _di, _dib, 0);
      const onscreens         = smartMinOnscreens();
      const onscreensCurrent  = onscreens.amount;
      const alreadyBackfires  = baseCurrent + fc >= 1;

      const sections = [];
      if (alreadyBackfires) {
        sections.push(
          '<b>' + fc.toFixed(10) + '</b>' +
          '<br>Backfire chance above this to backfire: <b>' + (minBackfireChance * 100).toFixed(2) + '%</b>' +
          '<br><b>Already backfires</b> (with current settings)'
        );
      } else {
        sections.push(
          '<b>' + fc.toFixed(10) + '</b>' +
          '<br>Backfire chance above this to backfire: <b>' + (minBackfireChance * 100).toFixed(2) + '%</b>' +
          '<br>Min onscreens to backfire: <b>' + onscreens.amount + '</b>' +
          (onscreens.SI ? ' With <b>SI</b>' : '') +
          (onscreens.RB ? ' With <b>RB</b>' : '')
        );
      }

      if (!alreadyBackfires) {
        // Section 2: min onscreens WITHOUT DI/DIb
        const onscreensNoDi = onscreensFor(fc, _si, _rb, false, false);
        if (onscreensNoDi !== onscreensCurrent) {
          sections.push('Without DI/DI backfire: <b>' + onscreensNoDi + '</b> onscreen' + (onscreensNoDi !== 1 ? 's' : ''));
        }
        // (else: same as current — implicitly merged above)

        // Section 3: min onscreens WITH DIb (only meaningful if DIb isn't already on)
        if (!_dib) {
          const onscreensWithDib = onscreensFor(fc, _si, _rb, _di, true);
          if (onscreensWithDib === 0) {
            sections.push('With DI backfire: <b>Already backfires</b>');
          } else {
            sections.push('With DI backfire: <b>' + onscreensWithDib + '</b> onscreen' + (onscreensWithDib !== 1 ? 's' : ''));
          }
        }
      } else {
        // Section 4: ways to make it succeed (priority: strongest → weakest)
        let combo;
        if      (succeedsWith(true,  true,  true,  _dib)) combo = 'DI + SI + RB';
        else if (succeedsWith(true,  false, true,  _dib)) combo = 'DI + SI';
        else if (succeedsWith(false, true,  true,  _dib)) combo = 'DI + RB';
        else if (succeedsWith(false, false, true,  _dib)) combo = 'DI';
        else                                              combo = "Can't succeed";
        sections.push('Ways to make it succeed: <b>' + combo + '</b>');
      }

      return sections.join(mdDivider);
    }

    /**
     * @private
     * @param {*} magic
     * @param {*} maxMagic
     * @param {*} costMult
     */
    GFDOutcome(
      magic = $scope.magic,
      maxMagic = $scope.max_magic,
      costMult = 1 - $scope.supremeintellect * 0.1
    ) {
      const selfCost = getSpellCost("gambler's fever dream", costMult);
      if (magic < selfCost) {
        return null;
      }
      let pool = [];
      for (let i in $scope.spells) {
        const spell = $scope.spells[i];
        if (spell === $scope.spells['gambler\'s fever dream']) { continue; }
        const cost =
          0.5 *
            Math.floor(
              costMult * (spell.costMin + spell.costPercent * maxMagic)
            ) +
          selfCost;
        if (cost <= magic) {
          pool.push(spell);
        }
      }

      if (pool.length === 0) {
        return null;
      }

      const selectedIndex = Math.floor(this.value * pool.length);
      return pool[selectedIndex];
    }

    GFDOutcomeText(magic, maxMagic, costMult) {
      return (
        this.GFDOutcome(magic, maxMagic, costMult)?.name ?? 'Not enough mana'
      );
    }

    GFDOutcomeIcon(backfires, magic, maxMagic, costMult) {
      const outcome = this.GFDOutcome(magic, maxMagic, costMult);
      if (!outcome) {
        return 'img/img9.png';
      }
      if (!backfires) {
        if ($scope.old_gfd_icons) {
          return 'img/GoldCookie.png';
        }
        if (outcome === $scope.spells['hand of fate']) {
          return 'img/img8.png';
        }
        return 'img/img10.png';
      } else {
        if ($scope.old_gfd_icons) {
          return 'img/WrathCookie.png';
        }
        if (outcome === $scope.spells['hand of fate']) {
          return 'img/img9.png';
        }
        return 'img/img11.png';
      }
    }

    /**
     * Tooltip HTML for the GFD outcome.
     * Shows the spell description (desc) or backfire description (failDesc)
     * depending on whether the GFD outcome would backfire.
     * If the GFD outcome is Force the Hand of Fate, appends a divider with
     * the next row's Default and Seasonal outcomes, computed with the GFD
     * 50% backfire floor (max(baseBackfireChance, 0.5)).
     * If the GFD outcome is FtHoF and no next row exists, indicates that
     * more lookahead is needed.
     *
     * @param {boolean} backfires - whether the GFD outcome would backfire
     * @param {CastRow} [nextRow] - the next CastRow in the sequence (used for FtHoF outcomes)
     * @returns {string} HTML
     */
    GFDTooltip(backfires, nextRow) {
      const outcome = this.GFDOutcome();
      if (!outcome) {
        return '<b>Gambler\'s Fever Dream</b><br>Not enough mana to cast.';
      }
      const desc = backfires ? outcome.failDesc : outcome.desc;
      let html = (desc || '');

      // If GFD casts Force the Hand of Fate, append the next row's outcomes
      // (GFD raises backfire chance to a minimum of 50%, ignoring the in-game description)
      if (outcome === $scope.spells['hand of fate']) {
        const mdDivider = '<md-divider class="margined"></md-divider>';
        if (!nextRow) {
          html += mdDivider + 'Load more rows to see FtHoF outcome.';
        } else {
          const fthofBackfire = Math.max($scope.baseBackfireChance, 0.5);
          const defaultOutcome = nextRow.stringifyNoChange(fthofBackfire);
          const seasonalOutcome = nextRow.stringifyChange(fthofBackfire);
          html += mdDivider +
            'FtHoF outcomes:<br>' +
            'Default: <b>' + defaultOutcome + '</b><br>' +
            'Seasonal: <b>' + seasonalOutcome + '</b>';
        }
      }
      return html;
    }

    onHover(relevantRow) {
      // Show possible outcomes, if it is a FtHoF
      if (this.GFDOutcome() === $scope.spells['hand of fate']) {
        // Show possible outcomes
        /**
         * @type {CastRow}
         */
        const castRow = relevantRow;
        return (
          castRow.stringifyNoChange(Math.max($scope.baseBackfireChance, 0.5)) +
          '; ' +
          castRow.stringifyChange(Math.max($scope.baseBackfireChance, 0.5))
        );
      }
      return this.GFDOutcomeText();
    }

    highlightsCSS = '';
    highlights = new Map();
    clearHighlights() {
      this.highlights.clear();
      this.highlightsCSS = '';
    }
    iterateHighlights(castRow, allRows = $scope.cookies) {
      const context = { element: this, castRow, allRows };
      let processed = 0;
      for (const [key, condition] of $scope.highlightConditions.entries()) {
        if (this.highlights.has(condition)) { continue; }
        if (!condition.enabled || condition.parseError) { continue; }
        if (!condition.dependenciesResolved(context)) { continue; }
        this.highlights.set(condition, condition.check(context)?condition.color:null);
        processed++;
      }
      return processed;
    }
    setHighlights(castRow, allRows = $scope.cookies) {
      this.highlightsCSS = generateEqualSplitGradient(Array.from(this.highlights.values()).filter(e => !!e));
    }
    getHighlightColor() {
      return { backgroundImage: this.highlightsCSS };
    }
  }
  $scope.MathMax = Math.max;
  function check_first_call(calls) {
    return new FirstCallEntry(calls[0]);
  }
  $scope.getMarginDividers = function () {
    return `<md-divider class="margined"></md-divider>`;
  };
  $scope.getFooter = function (innerHTML) {
    return `<small class="footer">${innerHTML}</small>`;
  };
  $scope.hideTooltips = false;
  $scope.shiftEventListenerCheck = (e) => {
    $scope.hideTooltips = $scope.invert_tooltip_hide_rules?(!e.shiftKey):e.shiftKey;
    document.documentElement.style.setProperty(
      '--cast-tooltip-style',
      $scope.hideTooltips ? 'none' : 'block'
    );
  };
  document.addEventListener('keydown', $scope.shiftEventListenerCheck);
  document.addEventListener('keyup', $scope.shiftEventListenerCheck);

  // In your controller/directive
  angular.element(window).on('resize', function () {
    // Force a digest cycle
    $scope.$applyAsync(function () {
      // Trigger a fake click or reflow
      return;
      var buttons = document.querySelectorAll('.cast-tooltip');
      console.log(buttons);
      buttons.forEach(function (btn) {
        // Method 1: Force browser reflow
        void btn.offsetHeight;

        // Method 2: Trigger library's internal update if accessible
        if (angular.element(btn).controller) {
          // Some libraries expose update methods
          angular.element(btn).controller().updateLayout();
        }
      });
    });

    // Fallback: delay to let browser finish resize
    setTimeout(function () {
      $scope.$applyAsync();
    }, 50);
  });

  class EffectEntry {
    // Interface
    static _name = 'Unknown effect';
    static _description = 'Unknown description';
    static _customIcon = '';
    static _shorthand = '';
    static _aliases = new Set();
    static _settings = {
      // Customized by user
      hiddenIndicator: false, // Whether to show its shorthand if it is inaccessible due to incorrect backfiring status
      underlined: false // Whether to underline the buff OR the shorthand (if shown)
    };
    constructor() {}

    get name() {
      return this.constructor._name;
    }
    get description() {
      return this.constructor._description;
    }
    get icon() {
      return $scope.change_icons ? this.constructor._customIcon : null;
    }
    get shorthand() {
      return this.constructor._shorthand;
    }
    get aliases() {
      return this.constructor._aliases;
    }
    get settings() {
      return this.constructor._settings;
    }
    getIcon(backfiring) {
      if (!backfiring) {
        return this.icon ?? 'img/GoldCookie.png';
      } else {
        return this.icon ?? 'img/WrathCookie.png';
      }
    }
    is(thing) {
      return this instanceof thing || this.aliases.has(thing);
    }

    toString(withHighlights) {
      if (withHighlights) {
        return (
          '<span style="background-image: ' +
          this.highlightsCSS +
          '">' +
          this.name +
          '</span>'
        );
      }
      return this.name;
    }

    getTooltip() {
      return `
        <small>${this.description}</small>
      `;
    }
    getSecondaryTooltip() {
      return `

      `;
    }

    highlightsCSS = '';
    highlights = new Map();
    clearHighlights() {
      this.highlights.clear();
      this.highlightsCSS = '';
    }
    iterateHighlights(castRow, allRows = $scope.cookies) {
      const context = { element: this, castRow, allRows };
      let processed = 0;
      for (const [key, condition] of $scope.highlightConditions.entries()) {
        if (this.highlights.has(condition)) { continue; }
        if (!condition.enabled || condition.parseError) { continue; }
        if (!condition.dependenciesResolved(context)) { continue; }
        this.highlights.set(condition, condition.check(context)?condition.color:null);
        processed++;
      }
      return processed;
    }
    setHighlights(castRow, allRows = $scope.cookies) {
      this.highlightsCSS = generateEqualSplitGradient(Array.from(this.highlights.values()).filter(e => !!e));
    }
    getHighlightColor() {
      return { backgroundImage: this.highlightsCSS };
    }
  }
  const allEffects = {};
  class EffectEntryFactory {
    static create(fromConfigs) {
      const Effect = class extends EffectEntry {
        static _name = fromConfigs.name;
        static _description = fromConfigs.description ?? '???';
        static _customIcon = fromConfigs.icon ?? 'img/GoldCookie.png';
        static _shorthand =
          fromConfigs.shorthand ?? fromConfigs.name.toUpperCase();
        static _aliases = new Set(
          fromConfigs.aliases.concat(fromConfigs.name.toLowerCase()) ?? [
            fromConfigs.name.toLowerCase()
          ]
        );
        static _settings = Object.create(fromConfigs.settings ?? {});
        constructor(...args) {
          super();
          if (args.length < (fromConfigs.requiredArgsCount ?? 0)) {
            throw new Error(
              'Missing arguments for effect entry ' + fromConfigs.name
            );
          }
          if (fromConfigs.constructor) {
            fromConfigs.constructor.apply(this, args);
          }
        }
      };
      return Effect;
    }
  }
  allEffects['Frenzy'] = EffectEntryFactory.create({
    name: 'Frenzy',
    description: 'Gives x7 cookie production for 77 seconds base.',
    icon: 'img/img4.png',
    shorthand: 'F',
    aliases: ['f']
  });
  allEffects['Lucky'] = EffectEntryFactory.create({
    name: 'Lucky',
    description:
      'Gain 13 cookies, plus the lesser of 15% of bank or 15 minutes of production.',
    icon: 'img/img5.png',
    shorthand: 'L',
    aliases: ['l']
  });
  allEffects['Click Frenzy'] = EffectEntryFactory.create({
    name: 'Click Frenzy',
    description: 'Gives x777 cookies per click for 13 seconds base.',
    icon: 'img/img3.png',
    shorthand: 'CF',
    aliases: ['cf']
  });
  allEffects['Blab'] = EffectEntryFactory.create({
    name: 'Blab',
    description: 'Does nothing but contains a funny message.',
    icon: 'img/img5.png',
    shorthand: 'BLAB',
    aliases: ['b']
  });
  allEffects['Cookie Storm'] = EffectEntryFactory.create({
    name: 'Cookie Storm',
    description:
      'Golden cookies fill the screen, each granting you 1 to 7 minutes worth of cookies.',
    icon: 'img/img6.png',
    shorthand: 'CS',
    aliases: ['cs', 'storm']
  });
  allEffects['Cookie Storm Drop'] = EffectEntryFactory.create({
    name: 'Cookie Storm Drop',
    description: 'Grants 1 to 7 minutes worth of production.',
    icon: 'img/img5.png',
    shorthand: 'CSD',
    aliases: ['csd', 'storm drop', 'drop', 'cs drop'],
    requiredArgsCount: 1,
    constructor(calls) {
      this.sizeMult = calls[9];
    }
  });
  allEffects['Building Special'] = EffectEntryFactory.create({
    name: 'Building Special',
    description: 'Get a variable bonus to cookie production for 30 seconds base.',
    icon: 'img/img3.png',
    shorthand: 'BS',
    aliases: ['bs'],
    settings: {
      hiddenIndicator: true
    }
  });
  allEffects['Free Sugar Lump'] = EffectEntryFactory.create({
    name: 'Free Sugar Lump',
    description: 'Gives you a free sugar lump.',
    icon: 'img/img5.png',
    shorthand: 'LUMP',
    aliases: ['sweet', 'sweet!', 'lump', 'sugar lump'],
    settings: {
      hiddenIndicator: true
    }
  });
  allEffects['Clot'] = EffectEntryFactory.create({
    name: 'Clot',
    description: 'Reduce production by 50% for 66 seconds base.',
    icon: 'img/img6.png',
    shorthand: 'CLOT',
    aliases: []
  });
  allEffects['Ruin'] = EffectEntryFactory.create({
    name: 'Ruin',
    description:
      'Lose 13 cookies plus the lesser of 5% of bank or 15 minutes of production.',
    icon: 'img/img5.png',
    shorthand: 'RUIN',
    aliases: []
  });
  allEffects['Cursed Finger'] = EffectEntryFactory.create({
    name: 'Cursed Finger',
    description:
      'Cookie production halted for 10 seconds base, but each click is worth seconds of production equal to its max duration.',
    icon: 'img/img6.png',
    shorthand: 'CUF',
    aliases: ['cuf']
  });
  allEffects['Elder Frenzy'] = EffectEntryFactory.create({
    name: 'Elder Frenzy',
    description: 'Gives x666 cookie production for 6 seconds base.',
    icon: 'img/img2.png',
    shorthand: 'EF',
    aliases: ['ef', 'elder', 'blood frenzy'],
    settings: {
      hiddenIndicator: true
    }
  });
  $scope.allEffects = allEffects;
  $scope.allEffectsList = Object.keys(allEffects);
  $scope.applySettingsPending = false;
  $scope.flagApplySettings = function() {
    $scope.applySettingsPending = true;
    // Refresh the cached tooltips on every row so the "unapplied settings"
    // warning appears in each tooltip immediately, without forcing a full
    // recompute.
    refreshTooltips();
    // Persist the current combo-finder inputs so the user does not lose
    // them if they navigate away without clicking "Apply Settings".
    LocalStorageManager.get('comboFinder').save();
  };
  $scope.toggleAllHiddenIndicators = function(on) {
    for (let i in allEffects) {
      allEffects[i]._settings.hiddenIndicator = on;
    }
    LocalStorageManager.get('visualOptions').save();
  }
  $scope.resetDefaultEffectIndicators = function() {
    for (let i in allEffects) {
      allEffects[i]._settings.hiddenIndicator = false;
    }
    allEffects['Building Special']._settings.hiddenIndicator = true;
    allEffects['Elder Frenzy']._settings.hiddenIndicator = true;
    allEffects['Free Sugar Lump']._settings.hiddenIndicator = true;
    LocalStorageManager.get('visualOptions').save();
  }
  $scope.getEffectTooltip = function (cookie_list, change) {
    const cast = cookie_list;
    return ($scope.hide_effect_elaboration?'':cookie_list.getCast(change).getTooltip()
     + $scope.getMarginDividers())
      + (cookie_list.backfiring() ? 'If it does not backfire: ' : 'If it backfires: ')
       + '<b>' + cookie_list.getOtherCast(change).toString(true)
        + '</b>' + ($scope.hide_effect_elaboration?'':'<br>' + cookie_list.getOtherCast(change).getTooltip())
         + '<br>' + $scope.getFooter('Hold SHIFT to toggle this menu.')
  }
  function check_cookies(calls, changes, forcedGold) {
    let n = 2 + changes;

    if (forcedGold) {
      let choices = [];
      choices.push(allEffects.Frenzy, allEffects.Lucky);
      if (!$scope.dragonflight) choices.push(allEffects['Click Frenzy']);
      if (calls[++n] < 0.1)
        choices.push(
          allEffects['Cookie Storm'],
          allEffects['Cookie Storm'],
          allEffects.Blab
        );
      if (calls[++n] < 0.25) choices.push(allEffects['Building Special']);
      if (calls[++n] < 0.15) choices = [allEffects['Cookie Storm Drop']];
      if (calls[++n] < 0.0001) choices.push(allEffects['Free Sugar Lump']);
      if (choices.length) { 
        const type = choices[Math.floor(calls[++n] * choices.length)]; 
        return new type(calls);
      } else {
        return null;
      }
    } else {
      let choices = [];
      choices.push(allEffects.Clot, allEffects.Ruin);
      if (calls[++n] < 0.1)
        choices.push(allEffects['Cursed Finger'], allEffects['Elder Frenzy']);
      if (calls[++n] < 0.003) choices.push(allEffects['Free Sugar Lump']);
      if (calls[++n] < 0.1) choices = [allEffects.Blab];
      if (choices.length) { 
        const type = choices[Math.floor(calls[++n] * choices.length)]; 
        return new type(calls);
      } else {
        return null;
      }
    }
  }

  $scope.spells = {
    'conjure baked goods': {
      name: 'Conjure Baked Goods',
      desc: 'Summon half an hour worth of your CpS, capped at 15% of your cookies owned.',
      failDesc: 'Trigger a 15-minute clot and lose 15 minutes of CpS.',
      aliases: ['cbg'],
      icon: [21, 11],
      costMin: 2,
      costPercent: 0.4,
      win: function () {
        var val = Math.max(
          7,
          Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 30)
        );
        Game.Earn(val);
        Game.Notify(
          'Conjure baked goods!',
          'You magic <b>' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '</b> out of thin air.',
          [21, 11],
          6
        );
        Game.Popup(
          '<div style="font-size:80%;">+' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var buff = Game.gainBuff('clot', 60 * 15, 0.5);
        var val = Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 15) + 13;
        val = Math.min(Game.cookies, val);
        Game.Spend(val);
        Game.Notify(buff.name, buff.desc, buff.icon, 6);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Summoning failed! Lost ' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'hand of fate': {
      name: 'Force the Hand of Fate',
      desc: 'Summon a random golden cookie. Each existing golden cookie makes this spell +15% more likely to backfire.',
      failDesc: 'Summon an unlucky wrath cookie.',
      aliases: ['fthof'],
      icon: [22, 11],
      costMin: 10,
      costPercent: 0.6,
      failFunc: function (fail) {
        return fail + 0.15 * Game.shimmerTypes['golden'].n;
      },
      win: function () {
        var newShimmer = new Game.shimmer('golden', { noWrath: true });
        var choices = [];
        choices.push('frenzy', 'multiply cookies');
        if (!Game.hasBuff('Dragonflight')) choices.push('click frenzy');
        if (Math.random() < 0.1)
          choices.push('cookie storm', 'cookie storm', 'blab');
        if (Game.BuildingsOwned >= 10 && Math.random() < 0.25)
          choices.push('building special');
        //if (Math.random()<0.2) choices.push('clot','cursed finger','ruin cookies');
        if (Math.random() < 0.15) choices = ['cookie storm drop'];
        if (Math.random() < 0.0001) choices.push('free sugar lump');
        newShimmer.force = choose(choices);
        if (newShimmer.force == 'cookie storm drop') {
          newShimmer.sizeMult = Math.random() * 0.75 + 0.25;
        }
        Game.Popup(
          '<div style="font-size:80%;">Promising fate!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var newShimmer = new Game.shimmer('golden', { wrath: true });
        var choices = [];
        choices.push('clot', 'ruin cookies');
        if (Math.random() < 0.1) choices.push('cursed finger', 'blood frenzy');
        if (Math.random() < 0.003) choices.push('free sugar lump');
        if (Math.random() < 0.1) choices = ['blab'];
        newShimmer.force = choose(choices);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Sinister fate!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'stretch time': {
      name: 'Stretch Time',
      desc: 'All active buffs gain 10% more time (up to 5 more minutes).',
      failDesc:
        'All active buffs are shortened by 20% (up to 10 minutes shorter).',
      aliases: ['st'],
      icon: [23, 11],
      costMin: 8,
      costPercent: 0.2,
      win: function () {
        var changed = 0;
        for (var i in Game.buffs) {
          var me = Game.buffs[i];
          var gain = Math.min(Game.fps * 60 * 5, me.maxTime * 0.1);
          me.maxTime += gain;
          me.time += gain;
          changed++;
        }
        if (changed == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buffs to alter!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Zap! Buffs lengthened.</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var changed = 0;
        for (var i in Game.buffs) {
          var me = Game.buffs[i];
          var loss = Math.min(Game.fps * 60 * 10, me.time * 0.2);
          me.time -= loss;
          me.time = Math.max(me.time, 0);
          changed++;
        }
        if (changed == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buffs to alter!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Fizz! Buffs shortened.</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'spontaneous edifice': {
      name: 'Spontaneous Edifice',
      desc: 'The spell picks a random building you could afford if you had twice your current cookies, and gives it to you for free. The building selected must be under 400, and cannot be your most-built one (unless it is your only one).',
      failDesc: 'Lose a random building.',
      aliases: ['se'],
      icon: [24, 11],
      costMin: 20,
      costPercent: 0.75,
      win: function () {
        var buildings = [];
        var max = 0;
        var n = 0;
        for (var i in Game.Objects) {
          if (Game.Objects[i].amount > max) max = Game.Objects[i].amount;
          if (Game.Objects[i].amount > 0) n++;
        }
        for (var i in Game.Objects) {
          if (
            (Game.Objects[i].amount < max || n == 1) &&
            Game.Objects[i].getPrice() <= Game.cookies * 2 &&
            Game.Objects[i].amount < 400
          )
            buildings.push(Game.Objects[i]);
        }
        if (buildings.length == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buildings to improve!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var building = choose(buildings);
        building.buyFree(1);
        Game.Popup(
          '<div style="font-size:80%;">A new ' +
            building.single +
            '<br>bursts out of the ground.</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        if (Game.BuildingsOwned == 0) {
          Game.Popup(
            '<div style="font-size:80%;">Backfired, but no buildings to destroy!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var buildings = [];
        for (var i in Game.Objects) {
          if (Game.Objects[i].amount > 0) buildings.push(Game.Objects[i]);
        }
        var building = choose(buildings);
        building.sacrifice(1);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>One of your ' +
            building.plural +
            '<br>disappears in a puff of smoke.</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    "haggler's charm": {
      name: "Haggler's Charm",
      desc: 'Upgrades are 2% cheaper for 1 minute.',
      failDesc:
        "Upgrades are 2% more expensive for an hour.",
      aliases: ['hc', 'hagglers', "haggler's"],
      icon: [25, 11],
      costMin: 10,
      costPercent: 0.1,
      win: function () {
        Game.killBuff("Haggler's misery");
        var buff = Game.gainBuff('haggler luck', 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Upgrades are cheaper!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff("Haggler's luck");
        var buff = Game.gainBuff('haggler misery', 60 * 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Upgrades are pricier!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'summon crafty pixies': {
      name: 'Summon Crafty Pixies',
      desc: 'Buildings are 2% cheaper for 1 minute.',
      failDesc: 'Buildings are 2% more expensive for an hour.',
      aliases: ['scp', 'crafty pixies', 'pixies'],
      icon: [26, 11],
      costMin: 10,
      costPercent: 0.2,
      win: function () {
        Game.killBuff('Nasty goblins');
        var buff = Game.gainBuff('pixie luck', 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Crafty pixies!<br>Buildings are cheaper!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff('Crafty pixies');
        var buff = Game.gainBuff('pixie misery', 60 * 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Nasty goblins!<br>Buildings are pricier!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    "gambler's fever dream": {
      name: "Gambler's Fever Dream",
      desc: 'Cast a random spell at half the magic cost, with twice the chance of backfiring.',
      aliases: ['gfd'],
      icon: [27, 11],
      costMin: 3,
      costPercent: 0.05,
      win: function () {
        var spells = [];
        var selfCost = M.getSpellCost(M.spells["gambler's fever dream"]);
        for (var i in M.spells) {
          if (
            i != "gambler's fever dream" &&
            M.magic - selfCost >= M.getSpellCost(M.spells[i]) * 0.5
          )
            spells.push(M.spells[i]);
        }
        if (spells.length == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No eligible spells!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var spell = choose(spells);
        var cost = M.getSpellCost(spell) * 0.5;
        setTimeout(
          (function (spell, cost, seed) {
            return function () {
              if (Game.seed != seed) return false;
              var out = M.castSpell(spell, {
                cost: cost,
                failChanceMax: 0.5,
                passthrough: true
              });
              if (!out) {
                M.magic += selfCost;
                setTimeout(function () {
                  Game.Popup(
                    '<div style="font-size:80%;">That\'s too bad!<br>Magic refunded.</div>',
                    Game.mouseX,
                    Game.mouseY
                  );
                }, 1500);
              }
            };
          })(spell, cost, Game.seed),
          1000
        );
        Game.Popup(
          '<div style="font-size:80%;">Casting ' +
            spell.name +
            '<br>for ' +
            Beautify(cost) +
            ' magic...</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'resurrect abomination': {
      name: 'Resurrect Abomination',
      desc: 'Instantly summon a wrinkler if conditions are fulfilled.',
      failDesc: 'Pop one of your wrinklers.',
      aliases: ['ra'],
      icon: [28, 11],
      costMin: 20,
      costPercent: 0.1,
      win: function () {
        var out = Game.SpawnWrinkler();
        if (!out) {
          Game.Popup(
            '<div style="font-size:80%;">Unable to spawn a wrinkler!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Rise, my precious!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var out = Game.PopRandomWrinkler();
        if (!out) {
          Game.Popup(
            '<div style="font-size:80%;">Backfire!<br>But no wrinkler was harmed.</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>So long, ugly...</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'diminish ineptitude': {
      name: 'Diminish Ineptitude',
      desc: 'Spells backfire 10 times less for the next 5 minutes.',
      failDesc: 'Spells backfire 5 times more for the next 10 minutes.',
      aliases: ['di'],
      icon: [29, 11],
      costMin: 5,
      costPercent: 0.2,
      win: function () {
        Game.killBuff('Magic inept');
        var buff = Game.gainBuff('magic adept', 5 * 60, 10);
        Game.Popup(
          '<div style="font-size:80%;">Ineptitude diminished!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff('Magic adept');
        var buff = Game.gainBuff('magic inept', 10 * 60, 5);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Ineptitude magnified!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    }
  };

  const ParsingException = {
    INVALID_STATEMENT: 'INVALID_STATEMENT',
    INVALID_CONDITION_CHECK: 'INVALID_CONDITION_CHECK',
    MISMATCHED_BRACKETS: 'MISMATCHED_BRACKETS',
    MISSING_ARGUMENT: 'MISSING_ARGUMENT',
    INVALID_ARGUMENT: 'INVALID_ARGUMENT',
    UNEXPECTED_TOKEN: 'UNEXPECTED_TOKEN',
    INVALID_RANGE: 'INVALID_RANGE'
  };

  class StatementType {
    constructor(name, aliases = [], requiresArg = false) {
      this.name = name;
      this.aliases = new Set(
        [name.toLowerCase().replaceAll(' ', '')].concat(
          Array.from(aliases).map((a) => a.toLowerCase().replaceAll(' ', ''))
        )
      );
      this.requiresArg = requiresArg;
    }
    static type = 'Unknown';
    static nonAdvancedShow = false;

    evaluate(arg, context) {
      throw new Error('Not implemented');
    }
    addAlias(string) {
      this.aliases.add(string.toLowerCase().replaceAll(' ', ''));
      this.constructor.ALLOWEDNAMES.add(
        string.toLowerCase().replaceAll(' ', '')
      );
    }

    static register(statement) {
      this.ALL.add(statement);
      this.ALLOWEDNAMES.add(statement.name.toLowerCase().replaceAll(' ', ''));
      for (let alias of statement.aliases) {
        this.ALLOWEDNAMES.add(alias.toLowerCase().replaceAll(' ', ''));
      }
    }
    static isAllowed(statementStr) {
      return this.ALLOWEDNAMES.has(statementStr);
    }
    static getByName(statementStr) {
      const str = statementStr.toLowerCase();
      for (let statement of this.ALL) {
        if (statement.aliases.has(str)) {
          return statement;
        }
      }
      return null;
    }

    static ALL = new Set();
    static ALLOWEDNAMES = new Set();
  }

  class EffectStatement extends StatementType {
    constructor(effect) {
      super(effect._name, effect._aliases, false);
      this.effect = effect;
      if (effect.shorthand) {
        this.addAlias(effect.shorthand);
      }
    }
    static type = 'Effect';
    static nonAdvancedShow = true;

    evaluate(arg, context) {
      if (!(context.element instanceof EffectEntry)) {
        return false;
      }
      return context.element.is(this.effect);
    }
  }

  class SpellStatement extends StatementType {
    constructor(spell, internalKey) {
      super(spell.name, (spell.aliases ?? []).concat(internalKey), false);
      this.spell = spell;
    }
    static type = "Gambler fever dream spell";
    static nonAdvancedShow = true;

    evaluate(arg, context) {
      if (!(context.element instanceof FirstCallEntry)) {
        return false;
      }
      return context.element.GFDOutcome()?.name === this.spell.name;
    }
  }

  class SpecialStatement extends StatementType {
    constructor(name, func, aliases = [], requiresArg = false) {
      super(name, aliases, requiresArg);
      this.func = func;
    }
    static type = "Special";
    static nonAdvancedShow = false;

    evaluate(arg, context) {
      return this.func(arg, context);
    }
  }

  for (let effectName in allEffects) {
    const effect = allEffects[effectName];
    StatementType.register(new EffectStatement(effect));
  }
  for (let spellName in $scope.spells) {
    const spell = $scope.spells[spellName];
    StatementType.register(new SpellStatement(spell, spellName));
  }
  StatementType.register(
    new SpecialStatement('EFFECT', (arg, context) => {
      return context.element instanceof EffectEntry;
    }, ['EFFECTS'])
  );
  StatementType.register(
    new SpecialStatement('GFDOUTCOME', (arg, context) => {
      return context.element instanceof FirstCallEntry;
    }, ['GFDOUTCOMES'])
  );
  StatementType.register(
    new SpecialStatement('BACKFIRE', (arg, context) => {
      return context.castRow.firstCall.backfires((arg)?parseFloat(arg):0.15);
    }, ['BACKFIRES'], true)
  );

  class Token {
    check(context) {
      throw new Error('Not implemented');
    }
  }

  class StatementToken extends Token {
    constructor(statement, args = null) {
      super();
      if (!StatementType.isAllowed(statement.toLowerCase())) {
        throw { type: ParsingException.INVALID_STATEMENT, statement };
      }
      const def = StatementType.getByName(statement.toLowerCase());
      if (def.requiresArg && args === null) {
        throw { type: ParsingException.MISSING_ARGUMENT, statement };
      }
      this.statement = statement;
      this.args = args;
      this.statementType = def;
    }
    static type = 'statement';

    check(context) {
      return this.statementType.evaluate(this.args[0], context);
    }
  }

  class ConditionCheckToken extends Token {
    constructor(id, index = null) {
      super();
      if (!$scope.highlightConditions.has(id)) {
        throw { type: ParsingException.INVALID_CONDITION_CHECK, id };
      }
      this.id = id;
      this.indexMod = parseInt(index);
    }
    static type = 'condition_check';

    check(context) {
      const condition = $scope.highlightConditions.get(this.id);
      const newRow =
        context.allRows[context.castRow.index + (this.indexMod ?? 0)];
      if (!newRow) {
        return false;
      }
      return (
        condition &&
        (newRow.firstCall.highlights.get(condition) != null ||
          newRow.noChangeSuccess.highlights.get(condition) != null ||
          newRow.noChangeBackfire.highlights.get(condition) != null ||
          newRow.changeSuccess.highlights.get(condition) != null ||
          newRow.changeBackfire.highlights.get(condition) != null)
      );
    }
  }

  class RangeToken extends Token {
    constructor(num1, num2) {
      super();
      if (num1 < 0 || num2 < 0) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Range numbers must be positive'
        };
      }
      if (num2 <= num1) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Second number must be greater than first number'
        };
      }
      this.lower = num1;
      this.upper = num2;
    }
    static type = 'range';

    check(context) {
      // Empty implementation
      return (
        context.element instanceof FirstCallEntry &&
        context.element.GFDRS < this.upper &&
        context.element.GFDRS >= this.lower
      );
    }
  }

  class GroupToken extends Token {
    constructor(tokens) {
      super();
      this.tokens = tokens;
    }
    static type = 'group';

    check(context) {
      return this.tokens.check(context);
    }
  }

  class BinaryOpToken extends Token {
    constructor(left, operator, right) {
      super();
      this.left = left;
      this.operator = operator; // "&", "|"
      this.right = right;
    }
    static type = 'binary_op';

    check(context) {
      if (this.operator === '&') {
        return this.left.check(context) && this.right.check(context);
      } else if (this.operator === '|') {
        return this.left.check(context) || this.right.check(context);
      }
      return false;
    }
  }

  class UnaryOpToken extends Token {
    constructor(operator, operand) {
      super();
      this.operator = operator; // "!"
      this.operand = operand;
    }
    static type = 'unary_op';

    check(context) {
      if (this.operator === '!') {
        return !this.operand.check(context);
      }
      return false;
    }
  }

  function parseNumber(str) {
    // Parse decimal or fraction (e.g., "0.5" or "1/2")
    if (str.includes('/')) {
      const parts = str.split('/');
      if (parts.length !== 2) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid fraction format'
        };
      }
      const num = parseFloat(parts[0]);
      const denom = parseFloat(parts[1]);
      if (isNaN(num) || isNaN(denom) || denom === 0) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid fraction values'
        };
      }
      return num / denom;
    } else {
      const num = parseFloat(str);
      if (isNaN(num)) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid number format'
        };
      }
      return num;
    }
  }

  function tokenizeCondition(str) {
    str = str.replace(/\s+/g, ''); // Strip whitespace
    const tokens = [];
    let i = 0;

    while (i < str.length) {
      const char = str[i];

      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
      } else if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
      } else if (char === '&') {
        tokens.push({ type: 'OP', value: '&' });
        i++;
      } else if (char === '|') {
        tokens.push({ type: 'OP', value: '|' });
        i++;
      } else if (char === '!') {
        tokens.push({ type: 'NOT', value: '!' });
        i++;
      } else if (char === '{') {
        // Parse range {number1-number2}
        let j = i + 1;
        while (j < str.length && str[j] !== '}') j++;
        if (j >= str.length) {
          throw {
            type: ParsingException.UNEXPECTED_TOKEN,
            message: 'Missing closing brace for range'
          };
        }
        const rangeStr = str.substring(i + 1, j);
        const dashIndex = rangeStr.lastIndexOf('-');
        if (dashIndex === -1 || dashIndex === 0) {
          throw {
            type: ParsingException.INVALID_RANGE,
            message: 'Invalid range format'
          };
        }
        const num1Str = rangeStr.substring(0, dashIndex);
        const num2Str = rangeStr.substring(dashIndex + 1);
        const num1 = parseNumber(num1Str);
        const num2 = parseNumber(num2Str);
        tokens.push({ type: 'RANGE', value: [num1, num2] });
        i = j + 1;
      } else if (/[a-zA-Z_\:\']/.test(char)) {
        // Parse identifier
        let j = i;
        while (j < str.length && /[a-zA-Z0-9-_.\:\']/.test(str[j])) j++;
        const identifier = str.substring(i, j).split(':');
        tokens.push({
          type: 'IDENT',
          value: identifier[0],
          args: identifier.slice(1)
        });
        i = j;
      } else if (/[0-9.-]/.test(char)) {
        // Parse number
        let j = i;
        while (j < str.length && /[0-9.-]/.test(str[j])) j++;
        const number = parseInt(str.substring(i, j), 10);
        tokens.push({ type: 'NUM', value: number });
        i = j;
      } else {
        throw { type: ParsingException.UNEXPECTED_TOKEN, char, position: i };
      }
    }
    return tokens;
  }

  function parseExpression(tokens, pos = 0) {
    const result = parseOr(tokens, pos);
    return result;
  }

  function parseOr(tokens, pos) {
    let left = parseAnd(tokens, pos);
    pos = left.pos;

    while (
      pos < tokens.length &&
      tokens[pos].type === 'OP' &&
      tokens[pos].value === '|'
    ) {
      pos++; // consume |
      const right = parseAnd(tokens, pos);
      pos = right.pos;
      left = { node: new BinaryOpToken(left.node, '|', right.node), pos };
    }
    return left;
  }

  function parseAnd(tokens, pos) {
    let left = parseNot(tokens, pos);
    pos = left.pos;

    while (
      pos < tokens.length &&
      tokens[pos].type === 'OP' &&
      tokens[pos].value === '&'
    ) {
      pos++; // consume &
      const right = parseNot(tokens, pos);
      pos = right.pos;
      left = { node: new BinaryOpToken(left.node, '&', right.node), pos };
    }
    return left;
  }

  function parseNot(tokens, pos) {
    if (pos < tokens.length && tokens[pos].type === 'NOT') {
      pos++; // consume !
      const operand = parseNot(tokens, pos);
      return {
        node: new UnaryOpToken('!', operand.node),
        pos: operand.pos
      };
    }
    return parsePrimary(tokens, pos);
  }

  function parsePrimary(tokens, pos) {
    if (pos >= tokens.length) {
      throw {
        type: ParsingException.UNEXPECTED_TOKEN,
        message: 'Unexpected end of expression'
      };
    }

    if (tokens[pos].type === 'LPAREN') {
      pos++; // consume (
      const expr = parseExpression(tokens, pos);
      pos = expr.pos;
      if (pos >= tokens.length || tokens[pos].type !== 'RPAREN') {
        throw {
          type: ParsingException.MISMATCHED_BRACKETS,
          message: 'Missing closing bracket'
        };
      }
      pos++; // consume )
      return { node: new GroupToken(expr.node), pos };
    }

    if (tokens[pos].type === 'RANGE') {
      const rangeValues = tokens[pos].value;
      const node = new RangeToken(rangeValues[0], rangeValues[1]);
      return { node, pos: pos + 1 };
    }

    if (tokens[pos].type === 'IDENT') {
      const ident = tokens[pos].value;

      // Check if it's a condition check (reference to another HighlightCondition)
      if ($scope.highlightConditions.has(ident)) {
        let index = tokens[pos].args[0] ?? null;
        return { node: new ConditionCheckToken(ident, index), pos: pos + 1 };
      }

      // Otherwise it's a statement
      if (!StatementType.isAllowed(ident.toLowerCase())) {
        throw { type: ParsingException.INVALID_STATEMENT, statement: ident };
      }

      const def = StatementType.getByName(ident.toLowerCase());

      pos++;

      return { node: new StatementToken(ident, tokens[pos - 1].args ?? null), pos };
    }

    throw {
      type: ParsingException.UNEXPECTED_TOKEN,
      token: tokens[pos],
      position: pos
    };
  }

  class HighlightCondition {
    constructor(id, conditionsStr, color) {
      this.id = id;
      if (StatementType.isAllowed(id)) {
        throw {
          type: ParsingException.INVALID_CONDITION_CHECK,
          message: `Condition ID "${id}" cannot be the same as a statement name`
        };
      }
      this.color = color ?? '';
      this.conditionsText = conditionsStr;
      //this.compile(this.conditionsText);
    }
    _enabled = true;
    _advanced = true;

    static register(condition) {
      $scope.highlightConditions.set(condition.id, condition);
      $scope.highlightConditionsList.push({ value: condition.id });
      this.intId = $scope.highlightConditions.size; // Just a unique integer for this condition, used for ng-repeat tracking
      return condition;
    }

    get enabled() {
      return this._enabled;
    }
    set enabled(bool) {
      this._enabled = bool;
    }
    get advanced() {
      return this._advanced;
    }
    set advanced(bool) {
      this._advanced = bool;
    }

    ast;
    dependencies = new Map();
    compile(conditionsStr = this.conditionsText) {
      try {
        const tokens = tokenizeCondition(conditionsStr);
        //console.log(tokens);
        const parsed = parseExpression(tokens);
        if (parsed.pos !== tokens.length) {
          throw {
            type: ParsingException.UNEXPECTED_TOKEN,
            message: 'Extra tokens after expression'
          };
        }
        this.ast = parsed.node;
        this.parseError = null;

        // Traverse AST and collect condition_check IDs
        const collectedIds = new Map();
        const traverse = (node) => {
          if (!node) return;
          if (node.constructor.type === 'condition_check') {
            collectedIds.set($scope.highlightConditions.get(node.id), node.indexMod);
          }
          if (node.left) traverse(node.left);
          if (node.right) traverse(node.right);
          if (node.operand) traverse(node.operand);
          if (node.tokens) traverse(node.tokens);
        };
        traverse(this.ast);
        this.dependencies = collectedIds;
      } catch (error) {
        this.parseError = error;
        this.ast = null;
        this.dependencies = null;
      }
    }

    // Context: allRows, castRow, element
    dependenciesResolved(context) {
      if (this.dependencies.size === 0) { return true; }
      for (const [condition, offset] of this.dependencies) {
        const target = context.allRows[context.castRow.index + offset];
        if (!target) { return true; }
        if (!target.firstCall.highlights.has(condition)) return false;
        if (!target.noChangeSuccess.highlights.has(condition)) return false;
        if (!target.noChangeBackfire.highlights.has(condition)) return false;
        if (!target.changeSuccess.highlights.has(condition)) return false;
        if (!target.changeBackfire.highlights.has(condition)) return false;
      }
      return true;
    }
    check(context) {
      if (this.parseError) {
        return false;
      }
      if (!this.ast) {
        return false;
      }
      return this.ast.check(context);
    }

    save() {
      return {
        id: this.id,
        conditionsText: this.conditionsText,
        color: this.color
      };
    }
    static load(object) {
      return HighlightCondition.register(
        new HighlightCondition(object.id, object.conditionsText, object.color)
      );
    }
  }
  $scope.highlightConditions = new Map();
  $scope.highlightConditionsList = [];
  $scope.reindexAllConditions = function () {
    for (let [key, condition] of $scope.highlightConditions) {
      condition.intId = $scope.highlightConditionsList.reduce((acc, cur, i) => {
        if (cur.value === condition.id) {
          return i;
        }
        return acc;
      }, -1);
      condition.compile();
    }
  };
  $scope.highlightingRuntimeErrors = '';

  /**
   * Generates a CSS linear-gradient string that divides the background into
   * equal-width vertical slices, one per color, using hard stops.
   *
   * @param {string[]} colors - Array of CSS color strings (e.g., ['red', '#00ff00', 'rgb(0,0,255)'])
   * @returns {string} - CSS linear-gradient value (e.g., "linear-gradient(to right, red 0%, red 25%, ...)")
   */
  function generateEqualSplitGradient(colors) {
    if (!Array.isArray(colors) || colors.length === 0) {
      return '';
    }

    // Single color: still return a valid gradient (or could be simplified, but gradient works)
    if (colors.length === 1) {
      return `linear-gradient(to right, ${colors[0]}, ${colors[0]})`;
    }

    const n = colors.length;
    const stops = [];

    for (let i = 0; i < n; i++) {
      const startPercent = (i / n) * 100;
      const endPercent = ((i + 1) / n) * 100;

      // Hard transition: color at startPercent, same color at endPercent
      stops.push(`${colors[i]} ${startPercent}%`);
      stops.push(`${colors[i]} ${endPercent}%`);
    }

    return `linear-gradient(to right, ${stops.join(', ')})`;
  }

  function constructDefaultHighlightConditions() {
    $scope.highlightConditions.clear();
    $scope.highlightConditionsList = [];
    HighlightCondition.register(
      new HighlightCondition('isBS', 'Building Special', '#ffff00')
    );
    HighlightCondition.register(
      new HighlightCondition('isEF', 'Elder Frenzy', '#ffff00')
    );
    HighlightCondition.register(
      new HighlightCondition('isRA', 'Resurrect Abomination', '#add8e6')
    );
    HighlightCondition.register(
      new HighlightCondition('isSENonbackfire', 'Spontaneous Edifice & !gfdBackfiring:1', '#add8e6')
    );
    HighlightCondition.register(
      new HighlightCondition('gfdBackfiring', 'Backfire:0.5', '')
    );
    HighlightCondition.register(
      new HighlightCondition(
        'notableFtHoF',
        'Force the Hand of Fate & (isBS:1 | isEF:1)',
        '#ffff00'
      )
    );
    for (let [id, condition] of $scope.highlightConditions) {
      condition.compile();
    }
  }
  LocalStorageManager.register(
    new LocalStorageManager('highlights', {
      firstLoad: constructDefaultHighlightConditions,
      save: () => {
        return {
          conditions: $scope.highlightConditionsList.map((e) =>
            $scope.highlightConditions.get(e.value).save()
          )
        };
      },
      load: (obj) => {
        $scope.highlightConditions.clear();
        $scope.highlightConditionsList = [];
        for (let i in obj.conditions) {
          HighlightCondition.load(obj.conditions[i]);
        }
        for (let [id, condition] of $scope.highlightConditions) {
          condition.compile();
        }
      }
    })
  );

  // ---------------------------------------------------------------------------
  // Persistence: advanced mode toggle, visual options, and combo finder
  // settings. These three LocalStorageManager instances are the only settings
  // groups that survive a page reload — highlights (above) and anything else
  // (backfire modifiers, magic counts, save_string, etc.) are intentionally
  // not persisted.
  // ---------------------------------------------------------------------------

  function getVisualOptionsState() {
    const hiddenIndicators = {};
    for (const id of $scope.allEffectsList) {
      hiddenIndicators[id] = allEffects[id]._settings.hiddenIndicator;
    }
    return {
      lookahead: $scope.lookahead,
      dark_mode: $scope.dark_mode,
      default_font: $scope.default_font,
      change_icons: $scope.change_icons,
      hide_effect_elaboration: $scope.hide_effect_elaboration,
      invert_tooltip_hide_rules: $scope.invert_tooltip_hide_rules,
      hiddenIndicators,
      old_gfd_icons: $scope.old_gfd_icons
    };
  }
  function applyVisualOptionsState(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.lookahead === 'number') $scope.lookahead = obj.lookahead;
    if (typeof obj.dark_mode === 'boolean') $scope.dark_mode = obj.dark_mode;
    if (typeof obj.default_font === 'boolean') $scope.default_font = obj.default_font;
    if (typeof obj.change_icons === 'boolean') $scope.change_icons = obj.change_icons;
    if (typeof obj.hide_effect_elaboration === 'boolean') {
      $scope.hide_effect_elaboration = obj.hide_effect_elaboration;
    }
    if (typeof obj.invert_tooltip_hide_rules === 'boolean') {
      $scope.invert_tooltip_hide_rules = obj.invert_tooltip_hide_rules;
    }
    if (obj.hiddenIndicators && typeof obj.hiddenIndicators === 'object') {
      for (const id in obj.hiddenIndicators) {
        if (allEffects[id]) {
          allEffects[id]._settings.hiddenIndicator = !!obj.hiddenIndicators[id];
        }
      }
    }
    if (typeof obj.old_gfd_icons === 'boolean') {
      $scope.old_gfd_icons = obj.old_gfd_icons;
    }
  }
  $scope.saveVisualOptions = function () {
    LocalStorageManager.get('visualOptions').save();
  };

  function getComboFinderState() {
    return {
      min_combo_length: $scope.min_combo_length,
      max_combo_length: $scope.max_combo_length,
      max_spread: $scope.max_spread,
      include_ef_in_sequence: $scope.include_ef_in_sequence,
      skip_abominations: $scope.skip_abominations,
      skip_edifices: $scope.skip_edifices
    };
  }
  function applyComboFinderState(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.comboFinder === 'boolean') $scope.comboFinder = obj.comboFinder;
    if (typeof obj.min_combo_length === 'number') $scope.min_combo_length = obj.min_combo_length;
    if (typeof obj.max_combo_length === 'number') $scope.max_combo_length = obj.max_combo_length;
    if (typeof obj.max_spread === 'number') $scope.max_spread = obj.max_spread;
    if (typeof obj.include_ef_in_sequence === 'boolean') {
      $scope.include_ef_in_sequence = obj.include_ef_in_sequence;
    }
    if (typeof obj.skip_abominations === 'boolean') {
      $scope.skip_abominations = obj.skip_abominations;
    }
    if (typeof obj.skip_edifices === 'boolean') {
      $scope.skip_edifices = obj.skip_edifices;
    }
  }

  LocalStorageManager.register(
    new LocalStorageManager('advancedFeatures', {
      save: () => ({ advancedFeatures: $scope.advancedFeatures }),
      load: (obj) => {
        if (obj && typeof obj.advancedFeatures === 'boolean') {
          $scope.advancedFeatures = obj.advancedFeatures;
        }
      }
    })
  );
  LocalStorageManager.register(
    new LocalStorageManager('hasSeed', {
      save: () => ({ hasSeed: $scope.hasSeed }),
      load: (obj) => {
        if (obj && typeof obj.hasSeed === 'boolean') {
          $scope.hasSeed = obj.hasSeed;
        }
      }
    })
  );
  LocalStorageManager.register(
    new LocalStorageManager('visualOptions', {
      save: getVisualOptionsState,
      load: applyVisualOptionsState
    })
  );
  LocalStorageManager.register(
    new LocalStorageManager('comboFinder', {
      save: getComboFinderState,
      load: applyComboFinderState
    })
  );

  $scope.toggleAdvancedFeatures = function () {
    $scope.advancedFeatures = !$scope.advancedFeatures;
    $scope.applySettingsPending = false;
    LocalStorageManager.get('advancedFeatures').save();
  };

  $scope.highlightRearrangementEnabled = false;
  $scope.toggleRearrangementMode = function () {
    $scope.highlightRearrangementEnabled =
      !$scope.highlightRearrangementEnabled;
    if (!$scope.highlightRearrangementEnabled) {
      $scope.reindexAllConditions();
    }
    LocalStorageManager.get('highlights').save();
  };

  $scope.highlightSettingsExpanded = false;
  $scope.advancedModeEnabled = false;
  $scope.availableStatements = Array.from(StatementType.ALL);
  $scope.removeHighlightCondition = function (condition) {
    const id = condition.id;
    $scope.highlightConditions.delete(id);
    const index = $scope.highlightConditionsList.reduce((acc, cur, i) => {
      if (cur.value === id) {
        return i;
      }
      return acc;
    }, -1);
    if (index > -1) {
      $scope.highlightConditionsList.splice(index, 1);
    }
    $scope.flagApplySettings();
    LocalStorageManager.get('highlights').save();
  };
  $scope.addHighlightCondition = function () {
    const newId = prompt(
      'Enter a unique ID for this highlight condition (used for referencing in conditions, no spaces, only letters numbers and underscore):'
    );
    if (!newId) {
      return;
    }
    if (
      $scope.highlightConditions.has(newId) ||
      StatementType.isAllowed(newId)
    ) {
      alert(
        'ID already in use as a condition or statement name. Please choose a different one.'
      );
      return;
    }
    if (!newId || newId.match(/[^a-zA-Z0-9_]|\s/)) {
      alert(
        'Invalid ID name. ID name must only contain letters, numbers, underscores, cannot be empty, and cannot contain whitespace. Please choose a different one.'
      );
      return;
    }
    const highlight = HighlightCondition.register(
      new HighlightCondition(newId, 'Frenzy')
    );
    highlight.compile();
    $scope.flagApplySettings();
    LocalStorageManager.get('highlights').save();
  };
  $scope.updateConditionId = function (oldId, newId) {
    if (oldId === newId) {
      return;
    }
    const condition = $scope.highlightConditions.get(oldId);
    if (
      $scope.highlightConditions.has(newId) ||
      StatementType.isAllowed(newId) ||
      !newId ||
      newId.match(/[^a-zA-Z0-9_]|\s/)
    ) {
      alert(
        'Invalid ID name. ID name must only contain letters, numbers, underscores, cannot be empty, cannot contain whitespace, and cannot be the names or abbreviations of spells and effects. Please choose a different one.'
      );
      condition.id = oldId;
      return oldId;
    }
    $scope.highlightConditions.delete(oldId);
    $scope.highlightConditions.set(newId, condition);
    const index = $scope.highlightConditionsList.reduce((acc, cur, i) => {
      if (cur.value === oldId) {
        return i;
      }
      return acc;
    }, -1);
    if (index > -1) {
      $scope.highlightConditionsList[index].value = newId;
    }
    for (let [key, cond] of $scope.highlightConditions.entries()) {
      if (
        cond.conditionsText.match(
          new RegExp(
            `(?<![a-zA-Z0-9_])${oldId.replace(/[.*+?^$\:{}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9_])`
          )
        )
      ) {
        $scope.updateConditionExpression(
          cond,
          cond.conditionsText.replace(
            new RegExp(
              `(?<![a-zA-Z0-9_])${oldId.replace(/[.*+?\:^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9_])`,
              'g'
            ),
            newId
          )
        ); // Re-parse to update any references to this condition
      }
    }
    LocalStorageManager.get('highlights').save();
    $scope.flagApplySettings();
    return newId;
  };
  $scope.updateConditionColor = function (condition, newColor) {
    if (condition) {
      condition.color =
        newColor && newColor.trim().length > 0 ? newColor : null;
    }
    $scope.flagApplySettings();
    LocalStorageManager.get('highlights').save();
  };
  $scope.updateConditionStatement = function (condition, statementName) {
    $scope.updateConditionExpression(condition, statementName);
  };
  $scope.updateConditionExpression = function (condition, expressionStr) {
    if (condition) {
      condition.conditionsText = expressionStr;
      condition.compile();
      $scope.flagApplySettings();
      LocalStorageManager.get('highlights').save();
    }
  };
  $scope.splitColorAndAlpha = function (colorString) {
    if (!colorString) {
      return { color: null, alpha: 1 };
    }

    // Handle rgba() format
    const rgbaMatch = colorString.match(
      /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/
    );
    if (rgbaMatch) {
      const r = rgbaMatch[1];
      const g = rgbaMatch[2];
      const b = rgbaMatch[3];
      const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
      const rgbColor = `rgb(${r}, ${g}, ${b})`;
      return { color: rgbColor, alpha: alpha };
    }

    // Handle hex format
    const hexMatch = colorString.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
    if (hexMatch) {
      return { color: colorString.substring(0, 8), alpha: 1 };
    }

    // Default: assume it's just a color string
    return { color: colorString, alpha: 1 };
  };
  $scope.test = (e) => {
    console.log(e);
    console.trace();
  };
  $scope.exportHighlights = function () {
    const highlightData = {
      conditions: Array.from($scope.highlightConditions.values()).map((e) =>
        e.save()
      )
    };
    const jsonString = JSON.stringify(highlightData);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        alert('Highlights copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy to clipboard');
      });
  };
  $scope.importHighlights = function () {
    const jsonString = prompt('Paste your highlights JSON:');
    if (jsonString === null) return;
    try {
      const obj = JSON.parse(jsonString);
      $scope.highlightConditions.clear();
      $scope.highlightConditionsList = [];
      for (let i in obj.conditions) {
        const cond = HighlightCondition.load(obj.conditions[i]);
        cond.compile();
      }
      $scope.flagApplySettings();
      alert('Highlights imported successfully!');
    } catch (error) {
      alert('Failed to import highlights: ' + error.message);
    }
  };

  $scope.advancedHelpVisibility = false;
  $scope.resetDefaultHighlights = function () {
    if (
      confirm(
        "Are you sure you want to reset to the default highlight conditions? This will remove any custom conditions you've created."
      )
    ) {
      constructDefaultHighlightConditions();
      $scope.flagApplySettings();
      LocalStorageManager.get('highlights').save();
    }
  };

  // Load persisted settings *before* URL-param-init runs so that the seed
  // import path (which calls `update_cookies` and therefore reads
  // `$scope.lookahead`) sees the user's saved visual-option / combo-finder
  // values on the very first render. The trailing `LocalStorageManager.loadAll()`
  // below is kept for the highlights manager (which is registered after the
  // URL-param path) and re-runs these three as a no-op.
  LocalStorageManager.get('advancedFeatures').load();
  LocalStorageManager.get('hasSeed').load();
  LocalStorageManager.get('visualOptions').load();
  LocalStorageManager.get('comboFinder').load();

  var urlParams = new URLSearchParams(window.location.search);
  var seed = urlParams.get('seed');
  if (seed != null && seed.trim().length === 5) {
    document.querySelector('[ng-model=save_string]').textContent =
      $scope.save_string = seed;
    var spellsCast = urlParams.get('spellsCast');
    $scope.spellsCastTotal = Number(spellsCast);
    $scope.spellsCastThisAscension = $scope.spellsCastTotal;
    $scope.load_game(null, true);
  }

  LocalStorageManager.loadAll();
  $scope.wipeAllSettings = function() { 
    if (!confirm('Are you sure? This cannot be undone.')) { return; }
    LocalStorageManager.resetAll();
    location.reload();
  }
  $scope.applySettingsPending = false;
  window.app = $scope;
});
