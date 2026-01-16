"use strict";
// This is the random seeding script used by Orteil.
(function (a, b, c, d, e, f) {
	function k(a) {
		var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = [];
		for (c || (a = [c++]); d > f;) h[f] = f++;
		for (f = 0; d > f; f++) h[f] = h[g = j & g + a[f % c] + (b = h[f])], h[g] = b;
		(e.g = function (a) {
			for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = j & f + 1], c = c * d + h[j & (h[f] = h[g = j & g + b]) + (h[g] = b)];
			return e.i = f, e.j = g, c
		})(d)
	}

	function l(a, b) {
		var e, c = [], d = (typeof a)[0];
		if (b && "o" == d) for (e in a) try {
			c.push(l(a[e], b - 1))
		} catch (f) {
		}
		return c.length ? c : "s" == d ? a : a + "\0"
	}

	function m(a, b) {
		for (var d, c = a + "", e = 0; c.length > e;) b[j & e] = j & (d ^= 19 * b[j & e]) + c.charCodeAt(e++);
		return o(b)
	}

	function n(c) {
		try {
			return a.crypto.getRandomValues(c = new Uint8Array(d)), o(c)
		} catch (e) {
			return [+new Date, a, a.navigator.plugins, a.screen, o(b)]
		}
	}

	function o(a) {
		return String.fromCharCode.apply(0, a)
	}

	var g = c.pow(d, e), h = c.pow(2, f), i = 2 * h, j = d - 1;
	c.seedrandom = function (a, f) {
		var j = [], p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j), q = new k(j);
		return m(o(q.S), b), c.random = function () {
			for (var a = q.g(e), b = g, c = 0; h > a;) a = (a + c) * d, b *= d, c = q.g(1);
			for (; a >= i;) a /= 2, b /= 2, c >>>= 1;
			return (a + c) / b
		}, p
	}, m(c.random(), b)
})(this, [], Math, 256, 6, 52);

function choose(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

var app = angular.module('myApp', ['ngMaterial']);
app.controller('myCtrl', function ($scope) {
	$scope.seed = ""
	$scope.ascensionMode = 0
	$scope.spellsCastTotal = 0
	$scope.spellsCastThisAscension = 0
	$scope.dragonflight = false
	$scope.supremeintellect = false
	$scope.diminishineptitude = false
	$scope.on_screen_cookies = 0
	$scope.min_combo_length = 2
	$scope.max_combo_length = 4
	$scope.max_spread = 2
	//$scope.save_string = "Mi4wMTl8fDE1NTcwMjQwMjkzMjQ7MTUyNTU2Mzg4NjQ5ODsxNTU3MDI2MDY3NTI2O1ByZXR0eSBCaXNjdWl0O2ljb2NkfDExMTExMTExMTAwMTAwMTAwMDAxMHwzMTcyOTc5ODU2ODk2MS4wNzsyNDk5OTU5MzQxMDEyOTYuNjszNTE0OzgzMzc7Nzc3NzExMzQ3NDEzMDIuMjc7NzI2ODU7MDszOzEuNjMwODE0MDg0NjAwMTQxOGUrMTAxOzA7MDswOzA7MDsxMDg7MTE7MDswOzExOzE7MjU4MzAzNjsxO2NocmlzdG1hczswOzA7NS40NjM0NjQ4MjMyNzM2MjRlKzI5OzUuNDYzNDY0ODIzMjczNjI0ZSsyOTsxMDM0OTI0NTIwNTExOzA7MDsyMjY7MjI4OzIyMzsyMjI7MjI1OzU7MTswOzE7MTAwOzA7MDsxODk7NDY3OzE1NTcwMjM1NTE1NDY7MTU1Njk5MjAzMDQ0ODswOzEyOSwyMjc7NDA7fDE2MCwxNjAsMTg0MDI4NTc4NDIyMCwxLCwwOzE1MCwxNTAsNzE2NTA1ODQ0NTcwLDEsLDA7MTAwLDIxMCwyODczMDgyMzkzMyw5LDE1NTcwMjYyODY2MDQ6MDoxNTU3MDI0MDI5MzMxOjA6MDozNzM5OjE6MToxNTU3MDI0MDI5MzMxOiAxMTExMTAxMDExMTExMTAwMDAwMDEwMTEwMDAwMDAwMTAwIDA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOiwwOzEwMCwyMDAsODg2MTIxODQ2MDMsMSwsMDsxMDAsMTgwLDE5NjIxNTUxOTQzMSwxLCwwOzgwLDE1MCw3MzUxMjI3MzcxNzcsMSwsMDs1MCw1MCwxNzUzMjgyNjI2MDA4LDEsMi8tMS8tMSAyIDE1NTcwMjU5NTgwMzQgMSwwOzUwLDUxLDY5OTUwMzAwMjc2NTksMSwzNiAwIDM1NTUgMSwwOzMwLDMwLDE5Njg2NTA3NjkzNjA0LDEsLDA7MTUsMTUsMjE5ODQxODMyNjA2NDIsMSwsMDsxMCwxMCwyMzI3OTQ1NzQyMDkyOCwxLCwwOzUsNSw1OTkyOTYzODI0OTY5OSwyLCwwOzAsMCwwLDQsLDA7MCwwLDAsMTAsLDA7MCwwLDAsNCwsMDswLDAsMCwxMCwsMDt8MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAxMDEwMDAxMDEwMDAxMTExMTExMTExMTExMTExMTExMTExMTEwMDExMTExMTExMDAwMDAwMDAxMTExMTAxMTExMTExMTExMTExMTAwMDAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTEwMDExMTEwMDAwMDAwMDExMDAxMTExMTAwMDEwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAwMDExMTExMTExMDAwMDAwMDAwMDExMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDExMDAxMTAwMTEwMDExMTExMTExMTEwMDAwMDAwMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTAxMDEwMDAxMDAwMDAxMDAwMTEwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDEwMTEwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMTExMTAwMTExMTAwMTEwMDAwMDAxMTExMTExMTAwMDAxMTExMTExMTAwMDAxMTExMTExMDAwMDAxMTExMTExMTExMTEwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDExMTExMTExMTExMTExMDAxMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExMTExMTExMTExMTExMDExMTExMTExMDAwMDExMDAwMDEwMDAwMDAwMDAxMDAwMDAxMDAwMTAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMDExMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAxMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTExMTAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTEwMDExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTEwMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMXwxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTEwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDExMTEwMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExfA%3D%3D%21END%21%3D%3D%21END%21"
	$scope.save_string = ""
	$scope.lookahead = 200
	$scope.level = 200
	$scope.wantedBS = 200
	$scope.magic = 999
	$scope.max_magic = 999
	$scope.config = ""
	// Preset decent strategies; TODO
	// $scope.possibleStrats = [null, "522fthof 52di/F 22fthof R+522fthof 22fthof\r\n522fthof 52F/hc 22fthof R+522di/hc 322fthof 22fthof", "547fthof 47di/F 27fthof R+547 47\r\n547fthof 47F/hc 27fthof, 547di/hc, 347fthof, 27fthof\r\n547fthof, 47di/F, 27fthof, R+517st, 317fthof, 17fthof\r\n547fthof, 47F/gfd, R+547di/hc, 327fthof, 27fthof"]

	$scope.load_more = function () {
		$scope.lookahead += 50
		$scope.update_cookies()
	}

	$scope.cast_spell = function () {
		$scope.spellsCastThisAscension++;
		$scope.spellsCastTotal++;
		$scope.update_cookies();
	}

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
	// 		cookie1Success = check_cookies($scope.spellsCastTotal + i, '', false, true)
	// 		cookie2Success = check_cookies($scope.spellsCastTotal + i, '', true, true)
	// 		//cookie3 = check_cookies($scope.spellsCastTotal + i, '', true)
	// 		cookie1Backfire = check_cookies($scope.spellsCastTotal + i, '', false, false)
	// 		cookie2Backfire = check_cookies($scope.spellsCastTotal + i, '', true, false)
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

	$scope.load_game = function (str) {
		if (!str) {
			str = $scope.save_string;
		}
		if (str.length === 5) {
			$scope.seed = str;
			$scope.spellsCastTotal = Number(prompt("Total spells cast?"));
			$scope.spellsCastThisAscension = $scope.spellsCastTotal;
			$scope.update_cookies();
			return;
		}
		var str = str.split('!END!')[0];
		str = Base64.decode(str);
		str = str.split('|');
		var spl = str[2].split(';');
		$scope.seed = spl[4];
		console.log("Seed: " + $scope.seed);

		spl = str[4].split(';');
		$scope.ascensionMode = parseInt(spl[29]);
		console.log(spl);
		spl = str[5].split(';');
		console.log(spl[7]);

		$scope.spellsCastTotal = parseInt(spl[7].split(' ')[2]) || 0;
		console.log('Total spells cast: ' + $scope.spellsCastTotal);

		$scope.spellsCastThisAscension = parseInt(spl[7].split(' ')[1]) || 0;
		console.log('Spells cast this ascension: ' + $scope.spellsCastThisAscension);

		$scope.update_cookies();
	}

	$scope.update_cookies = function () {
		$scope.cookies = []
		$scope.randomSeeds = [];
		$scope.baseBackfireChance = 0.15 * ($scope.supremeintellect ? 1.1 : 1) * ($scope.diminishineptitude ? 0.1 : 1);
		$scope.backfireChance = $scope.baseBackfireChance + 0.15 * $scope.on_screen_cookies;
		$scope.displayCookies = [];
		var bsIndices = [];
		var skipIndices = [];
		var currentTime = Date.now();
		for (var i = 0; i < $scope.lookahead; i++) {
			var currentSpell = i + $scope.spellsCastTotal;
			Math.seedrandom($scope.seed + '/' + currentSpell);
			var roll = Math.random();
			$scope.randomSeeds.push(roll);

			var c = []
			var cookie1Success = check_cookies($scope.spellsCastTotal + i, '', false, true)
			var cookie2Success = check_cookies($scope.spellsCastTotal + i, '', true, true)
			//cookie3 = check_cookies($scope.spellsCastTotal + i, '', true)
			var cookie1Backfire = check_cookies($scope.spellsCastTotal + i, '', false, false)
			var cookie2Backfire = check_cookies($scope.spellsCastTotal + i, '', true, false)
			var gambler = check_gambler($scope.spellsCastTotal + i)
			c.push(cookie1Success)
			c.push(cookie2Success)
			c.push(cookie1Backfire)
			c.push(cookie2Backfire)
			c.push(gambler)
			$scope.cookies.push(c)

			if (cookiesContainBuffs($scope.include_ef_in_sequence, cookie1Success, cookie2Success, cookie1Backfire, cookie2Backfire) || gambler.hasBs || ($scope.include_ef_in_sequence && gambler.hasEf)) {
				bsIndices.push(i);
			}

			if (($scope.skip_abominations && gambler.type == 'Resurrect Abomination') || ($scope.skip_edifices && gambler.type == 'Spontaneous Edifice' && !gambler.backfire)) {
				skipIndices.push(i);
			}

			var arr = [];
			if ($scope.randomSeeds[i] + $scope.backfireChance < 1) {
				arr.push(c[0]);
				arr.push(c[1]);
				if (c[2].type == "Elder Frenzy") { arr[0].type += " (EF)"; arr[0].noteworthy = true; }
				if (c[3].type == "Elder Frenzy") { arr[1].type += " (EF)"; arr[1].noteworthy = true; }
				if (c[2].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
				if (c[3].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
			}
			else {
				arr.push(c[2]);
				arr.push(c[3]);
				if (c[0].type == "Building Special") { arr[0].type += " (BS)"; arr[0].noteworthy = true; }
				if (c[1].type == "Building Special") { arr[1].type += " (BS)"; arr[1].noteworthy = true; }
				if (c[0].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
				if (c[1].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
			}
			arr.push(gambler);
			$scope.displayCookies.push(arr);
		}
		console.log($scope.cookies);
		console.log(bsIndices);
		console.log(skipIndices);

		$scope.combos = {}

		for (var combo_length = $scope.min_combo_length; combo_length <= $scope.max_combo_length; combo_length++) {
			$scope.combos[combo_length] = findCombos(combo_length, $scope.max_spread, bsIndices, skipIndices);
		}

		console.log('Combos: ');
		console.log($scope.combos);
		console.log(Date.now() - currentTime);
	}

	$scope.collapse_interface = function (contentId) {
		console.log("content-" + contentId);
		if (contentId) {
			var content = document.getElementById("content-" + contentId);
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "block";
			}
		}
	}

	//want to return shortest, and first sequence for a given combo_length
	//if nothing that satisfies max_spread, shortest will still be filled but first will be empty
	function findCombos(combo_length, max_spread, bsIndices, skipIndices) {
		let shortestDistance = 10000000;
		let shortestStart = -1;

		let firstDistance = 10000000;
		let firstStart = -1

		for (var i = 0; i + combo_length <= bsIndices.length; i++) {
			let seqStart = bsIndices[i];
			let seqEnd = bsIndices[i + combo_length - 1];
			let baseDistance = seqEnd - seqStart + 1;

			let skips = skipIndices.filter((idx) => idx > seqStart && idx < seqEnd && !bsIndices.includes(idx));

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
			return cookie.type == 'Building Special' || (include_ef && cookie.type == 'Elder Frenzy');
		});
	}

	function choose(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function getSpellCost(spellName) {
		var spell = $scope.spells[spellName];
		var out = spell.costMin;
		if (spell.costPercent) out += $scope.max_magic * spell.costPercent;
		out *= Math.floor(1 - 0.1 * $scope.supremeintellect);
		return out;
	}

	function check_gambler(spellsCast) {
		Math.seedrandom($scope.seed + '/' + spellsCast);

		var spells = []
		var selfCost = getSpellCost('gambler\'s fever dream')
		for (var spell in $scope.spells) { if (spell != 'gambler\'s fever dream' && ($scope.magic - selfCost) >= getSpellCost(spell) * 0.5) spells.push($scope.spells[spell]); }
		if (spells.length === 0) {
			return { type: "Not enough mana", icon: "img/img9.png" };
		}
		var gfdSpell = choose(spells);

		//simplifying the below cause this isn't patched yet afaict and i'll never be playing with diminished ineptitude backfire
		var gfdBackfire = gfdSpell.name === "Force the Hand of Fate" ? Math.max(0.5, $scope.backfireChance) : 0.5; /*M.getFailChance(gfdSpell);
    
		if(FortuneCookie.detectKUGamblerPatch()) gfdBackfire *= 2;
		else gfdBackfire = Math.max(gfdBackfire, 0.5);*/

		var gamblerSpell = {};
		gamblerSpell.type = gfdSpell.name;
		gamblerSpell.hasBs = false;
		gamblerSpell.hasEf = false;

		Math.seedrandom($scope.seed + '/' + (spellsCast + 1));
		if (Math.random() < (1 - gfdBackfire)) {
			gamblerSpell.icon = "img/img10.png";
			gamblerSpell.backfire = false;

			if (gfdSpell.name == "Force the Hand of Fate") {
				gamblerSpell.innerCookie1 = check_cookies(spellsCast + 1, '', false, true);
				gamblerSpell.innerCookie2 = check_cookies(spellsCast + 1, '', true, true);
				gamblerSpell.icon = "img/img8.png";

				gamblerSpell.hasBs = gamblerSpell.innerCookie1.type == 'Building Special' || gamblerSpell.innerCookie2.type == 'Building Special';
			}

			//TODO: Do something with edifice to make it clear if it will fail or not. like this:
			//if(gfdSpell.name == "Spontaneous Edifice") spellOutcome += ' (' + FortuneCookie.gamblerEdificeChecker(spellsCast + 1, true) + ')';
		} else {
			gamblerSpell.icon = "img/img11.png";
			gamblerSpell.backfire = true;

			if (gfdSpell.name == "Force the Hand of Fate") {
				gamblerSpell.innerCookie1 = check_cookies(spellsCast + 1, '', false, false);
				gamblerSpell.innerCookie2 = check_cookies(spellsCast + 1, '', true, false);
				gamblerSpell.icon = "img/img9.png";

				gamblerSpell.hasEf = gamblerSpell.innerCookie1.type == 'Elder Frenzy' || gamblerSpell.innerCookie2.type == 'Elder Frenzy';
			}

			//TODO: again, handle spontaneous edifice
			//if(gfdSpell.name == "Spontaneous Edifice") spellOutcome += ' (' + FortuneCookie.gamblerEdificeChecker(spellsCast + 1, false) + ')';
		}

		gamblerSpell.hover = gamblerSpell.innerCookie1 && gamblerSpell.innerCookie1.type ? gamblerSpell.innerCookie1.type + '; ' + gamblerSpell.innerCookie2.type : gamblerSpell.type
		return gamblerSpell;
	}

	function check_cookies(spells, season, chime, forcedGold) {
		Math.seedrandom($scope.seed + '/' + spells);
		var roll = Math.random()
		if (forcedGold !== false && (forcedGold || roll < (1 - (0.15 * $scope.on_screen_cookies + 0.15 * (1 + 0.1 * $scope.supremeintellect) * (1 - 0.9 * $scope.diminishineptitude))))) {
			/* Random is called a few times in setting up the golden cookie */
			if (chime == 1) Math.random();
			if (season == 'valentines' || season == 'easter') {
				Math.random();
			}
			Math.random();
			Math.random();
			/**/

			var choices = [];
			choices.push('Frenzy', 'Lucky');
			if (!$scope.dragonflight) choices.push('Click Frenzy');
			if (Math.random() < 0.1) choices.push('Cookie Storm', 'Cookie Storm', 'Blab');
			if (Math.random() < 0.25) choices.push('Building Special');
			if (Math.random() < 0.15) choices = ['Cookie Storm Drop'];
			if (Math.random() < 0.0001) choices.push('Free Sugar Lump');
			var cookie = {}
			cookie.wrath = false
			cookie.type = choose(choices);
			cookie.icon = $scope.change_icons ? cookie.type === 'Cursed Finger' || cookie.type === 'Clot' || cookie.type === 'Cookie Storm' ? "img/img6.png" : cookie.type === 'Elder Frenzy' ? "img/img2.png" : cookie.type === 'Building Special' || cookie.type === 'Click Frenzy' ? "img/img3.png" : cookie.type === 'Frenzy' ? "img/img4.png" : "img/img5.png" : "img/GoldCookie.png";
			if (cookie.type == 'Frenzy') cookie.description = "Gives x7 cookie production for 77 seconds.";
			if (cookie.type == 'Lucky') cookie.description = "Gain 13 cookies, plus the lesser of 15% of bank or 15 minutes of production.";
			if (cookie.type == 'Click Frenzy') cookie.description = "Gives x777 cookies per click for 13 seconds.";
			if (cookie.type == 'Blab') cookie.description = "Does nothing but contains a funny message.";
			if (cookie.type == 'Cookie Storm') cookie.description = "Golden cookies fill the screen, each granting you 1 to 7 minutes worth of cookies.";
			if (cookie.type == 'Cookie Storm Drop') cookie.description = "Grants 1 to 7 minutes worth of production.";
			if (cookie.type == 'Building Special') {
				cookie.description = "Get a variable bonus to cookie production for 30 seconds.";
				cookie.noteworthy = true;
			}
			if (cookie.type == 'Free Sugar Lump') cookie.description = "Gives you a free sugar lump.";
			return cookie;
		} else {
			/* Random is called a few times in setting up the golden cookie */
			if (chime == 1) Math.random();
			if (season == 'valentines' || season == 'easter') {
				Math.random();
			}
			Math.random();
			Math.random();
			/**/

			var choices = [];
			choices.push('Clot', 'Ruin');
			if (Math.random() < 0.1) choices.push('Cursed Finger', 'Elder Frenzy');
			if (Math.random() < 0.003) choices.push('Free Sugar Lump');
			if (Math.random() < 0.1) choices = ['Blab'];
			var cookie = {}
			cookie.wrath = true
			cookie.type = choose(choices);
			cookie.icon = $scope.change_icons ? cookie.type === 'Cursed Finger' || cookie.type === 'Clot' || cookie.type === 'Cookie Storm' ? "img/img6.png" : cookie.type === 'Elder Frenzy' ? "img/img2.png" : cookie.type === 'Building Special' || cookie.type === 'Click Frenzy' ? "img/img3.png" : cookie.type === 'Frenzy' ? "img/img4.png" : "img/img5.png" : "img/WrathCookie.png";
			if (cookie.type == 'Clot') cookie.description = "Reduce production by 50% for 66 seconds.";
			if (cookie.type == 'Ruin') cookie.description = "Lose 13 cookies plus the lesser of 5% of bank or 15 minutes of production.";
			if (cookie.type == 'Cursed Finger') cookie.description = "Cookie production halted for 10 seconds, but each click is worth 10 seconds of production.";
			if (cookie.type == 'Blab') cookie.description = "Does nothing but has a funny message.";
			if (cookie.type == 'Elder Frenzy') {
				cookie.description = "Gives x666 cookie production for 6 seconds.";
				cookie.noteworthy = true;
			}
			if (cookie.type == 'Free Sugar Lump') cookie.description = "Gives you a free sugar lump.";
			return cookie;
		}
	}

	$scope.spells = {
		'conjure baked goods': {
			name: 'Conjure Baked Goods',
			desc: 'Summon half an hour worth of your CpS, capped at 15% of your cookies owned.',
			failDesc: 'Trigger a 15-minute clot and lose 15 minutes of CpS.',
			icon: [21, 11],
			costMin: 2,
			costPercent: 0.4,
			win: function () {
				var val = Math.max(7, Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 30));
				Game.Earn(val);
				Game.Notify('Conjure baked goods!', 'You magic <b>' + Beautify(val) + ' cookie' + (val == 1 ? '' : 's') + '</b> out of thin air.', [21, 11], 6);
				Game.Popup('<div style="font-size:80%;">+' + Beautify(val) + ' cookie' + (val == 1 ? '' : 's') + '!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				var buff = Game.gainBuff('clot', 60 * 15, 0.5);
				var val = Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 15) + 13;
				val = Math.min(Game.cookies, val);
				Game.Spend(val);
				Game.Notify(buff.name, buff.desc, buff.icon, 6);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Summoning failed! Lost ' + Beautify(val) + ' cookie' + (val == 1 ? '' : 's') + '!</div>', Game.mouseX, Game.mouseY);
			},
		},
		'hand of fate': {
			name: 'Force the Hand of Fate',
			desc: 'Summon a random golden cookie. Each existing golden cookie makes this spell +15% more likely to backfire.',
			failDesc: 'Summon an unlucky wrath cookie.',
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
				if (Math.random() < 0.1) choices.push('cookie storm', 'cookie storm', 'blab');
				if (Game.BuildingsOwned >= 10 && Math.random() < 0.25) choices.push('building special');
				//if (Math.random()<0.2) choices.push('clot','cursed finger','ruin cookies');
				if (Math.random() < 0.15) choices = ['cookie storm drop'];
				if (Math.random() < 0.0001) choices.push('free sugar lump');
				newShimmer.force = choose(choices);
				if (newShimmer.force == 'cookie storm drop') {
					newShimmer.sizeMult = Math.random() * 0.75 + 0.25;
				}
				Game.Popup('<div style="font-size:80%;">Promising fate!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				var newShimmer = new Game.shimmer('golden', { wrath: true });
				var choices = [];
				choices.push('clot', 'ruin cookies');
				if (Math.random() < 0.1) choices.push('cursed finger', 'blood frenzy');
				if (Math.random() < 0.003) choices.push('free sugar lump');
				if (Math.random() < 0.1) choices = ['blab'];
				newShimmer.force = choose(choices);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Sinister fate!</div>', Game.mouseX, Game.mouseY);
			},
		},
		'stretch time': {
			name: 'Stretch Time',
			desc: 'All active buffs gain 10% more time (up to 5 more minutes).',
			failDesc: 'All active buffs are shortened by 20% (up to 10 minutes shorter).',
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
					Game.Popup('<div style="font-size:80%;">No buffs to alter!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				Game.Popup('<div style="font-size:80%;">Zap! Buffs lengthened.</div>', Game.mouseX, Game.mouseY);
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
					Game.Popup('<div style="font-size:80%;">No buffs to alter!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Fizz! Buffs shortened.</div>', Game.mouseX, Game.mouseY);
			},
		},
		'spontaneous edifice': {
			name: 'Spontaneous Edifice',
			desc: 'The spell picks a random building you could afford if you had twice your current cookies, and gives it to you for free. The building selected must be under 400, and cannot be your most-built one (unless it is your only one).',
			failDesc: 'Lose a random building.',
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
					if ((Game.Objects[i].amount < max || n == 1) && Game.Objects[i].getPrice() <= Game.cookies * 2 && Game.Objects[i].amount < 400) buildings.push(Game.Objects[i]);
				}
				if (buildings.length == 0) {
					Game.Popup('<div style="font-size:80%;">No buildings to improve!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				var building = choose(buildings);
				building.buyFree(1);
				Game.Popup('<div style="font-size:80%;">A new ' + building.single + '<br>bursts out of the ground.</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				if (Game.BuildingsOwned == 0) {
					Game.Popup('<div style="font-size:80%;">Backfired, but no buildings to destroy!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				var buildings = [];
				for (var i in Game.Objects) {
					if (Game.Objects[i].amount > 0) buildings.push(Game.Objects[i]);
				}
				var building = choose(buildings);
				building.sacrifice(1);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>One of your ' + building.plural + '<br>disappears in a puff of smoke.</div>', Game.mouseX, Game.mouseY);
			},
		},
		'haggler\'s charm': {
			name: 'Haggler\'s Charm',
			desc: 'Upgrades are 2% cheaper for 1 minute.',
			failDesc: 'Upgrades are 2% more expensive for an hour.<q>What\'s that spell? Loadsamoney!</q>',
			icon: [25, 11],
			costMin: 10,
			costPercent: 0.1,
			win: function () {
				Game.killBuff('Haggler\'s misery');
				var buff = Game.gainBuff('haggler luck', 60, 2);
				Game.Popup('<div style="font-size:80%;">Upgrades are cheaper!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				Game.killBuff('Haggler\'s luck');
				var buff = Game.gainBuff('haggler misery', 60 * 60, 2);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Upgrades are pricier!</div>', Game.mouseX, Game.mouseY);
			},
		},
		'summon crafty pixies': {
			name: 'Summon Crafty Pixies',
			desc: 'Buildings are 2% cheaper for 1 minute.',
			failDesc: 'Buildings are 2% more expensive for an hour.',
			icon: [26, 11],
			costMin: 10,
			costPercent: 0.2,
			win: function () {
				Game.killBuff('Nasty goblins');
				var buff = Game.gainBuff('pixie luck', 60, 2);
				Game.Popup('<div style="font-size:80%;">Crafty pixies!<br>Buildings are cheaper!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				Game.killBuff('Crafty pixies');
				var buff = Game.gainBuff('pixie misery', 60 * 60, 2);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Nasty goblins!<br>Buildings are pricier!</div>', Game.mouseX, Game.mouseY);
			},
		},
		'gambler\'s fever dream': {
			name: 'Gambler\'s Fever Dream',
			desc: 'Cast a random spell at half the magic cost, with twice the chance of backfiring.',
			icon: [27, 11],
			costMin: 3,
			costPercent: 0.05,
			win: function () {
				var spells = [];
				var selfCost = M.getSpellCost(M.spells['gambler\'s fever dream']);
				for (var i in M.spells) {
					if (i != 'gambler\'s fever dream' && (M.magic - selfCost) >= M.getSpellCost(M.spells[i]) * 0.5) spells.push(M.spells[i]);
				}
				if (spells.length == 0) {
					Game.Popup('<div style="font-size:80%;">No eligible spells!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				var spell = choose(spells);
				var cost = M.getSpellCost(spell) * 0.5;
				setTimeout(function (spell, cost, seed) {
					return function () {
						if (Game.seed != seed) return false;
						var out = M.castSpell(spell, { cost: cost, failChanceMax: 0.5, passthrough: true });
						if (!out) {
							M.magic += selfCost;
							setTimeout(function () {
								Game.Popup('<div style="font-size:80%;">That\'s too bad!<br>Magic refunded.</div>', Game.mouseX, Game.mouseY);
							}, 1500);
						}
					}
				}(spell, cost, Game.seed), 1000);
				Game.Popup('<div style="font-size:80%;">Casting ' + spell.name + '<br>for ' + Beautify(cost) + ' magic...</div>', Game.mouseX, Game.mouseY);
			},
		},
		'resurrect abomination': {
			name: 'Resurrect Abomination',
			desc: 'Instantly summon a wrinkler if conditions are fulfilled.',
			failDesc: 'Pop one of your wrinklers.',
			icon: [28, 11],
			costMin: 20,
			costPercent: 0.1,
			win: function () {
				var out = Game.SpawnWrinkler();
				if (!out) {
					Game.Popup('<div style="font-size:80%;">Unable to spawn a wrinkler!</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				Game.Popup('<div style="font-size:80%;">Rise, my precious!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				var out = Game.PopRandomWrinkler();
				if (!out) {
					Game.Popup('<div style="font-size:80%;">Backfire!<br>But no wrinkler was harmed.</div>', Game.mouseX, Game.mouseY);
					return -1;
				}
				Game.Popup('<div style="font-size:80%;">Backfire!<br>So long, ugly...</div>', Game.mouseX, Game.mouseY);
			},
		},
		'diminish ineptitude': {
			name: 'Diminish Ineptitude',
			desc: 'Spells backfire 10 times less for the next 5 minutes.',
			failDesc: 'Spells backfire 5 times more for the next 10 minutes.',
			icon: [29, 11],
			costMin: 5,
			costPercent: 0.2,
			win: function () {
				Game.killBuff('Magic inept');
				var buff = Game.gainBuff('magic adept', 5 * 60, 10);
				Game.Popup('<div style="font-size:80%;">Ineptitude diminished!</div>', Game.mouseX, Game.mouseY);
			},
			fail: function () {
				Game.killBuff('Magic adept');
				var buff = Game.gainBuff('magic inept', 10 * 60, 5);
				Game.Popup('<div style="font-size:80%;">Backfire!<br>Ineptitude magnified!</div>', Game.mouseX, Game.mouseY);
			},
		},
	};
});
