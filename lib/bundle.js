/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _sprite = __webpack_require__(1);
	
	var _sprite2 = _interopRequireDefault(_sprite);
	
	var _collision = __webpack_require__(2);
	
	var Collision = _interopRequireWildcard(_collision);
	
	var _input = __webpack_require__(3);
	
	var Input = _interopRequireWildcard(_input);
	
	var _enemies = __webpack_require__(4);
	
	var Enemies = _interopRequireWildcard(_enemies);
	
	var _berries = __webpack_require__(5);
	
	var Items = _interopRequireWildcard(_berries);
	
	var _pidgey = __webpack_require__(6);
	
	var Bird = _interopRequireWildcard(_pidgey);
	
	var _pikachu = __webpack_require__(7);
	
	var Pikachu = _interopRequireWildcard(_pikachu);
	
	var _boundaryCheck = __webpack_require__(8);
	
	var _handleInput = __webpack_require__(9);
	
	var _setup = __webpack_require__(10);
	
	var _setup2 = _interopRequireDefault(_setup);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	var setup = new _setup2.default();
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var currentDifficulty = 1;
	setTimeout(function () {
	  currentDifficulty = 2;
	}, 10000);
	setTimeout(function () {
	  currentDifficulty = 3;
	}, 20000);
	var score = 0;
	var win = 0;
	var paused = false;
	var song = document.getElementById("theme-song");
	var winMessage = new Image();
	winMessage.src = "assets/images/winmessage.png";
	song.addEventListener("ended", function () {
	  win = 1;
	});
	
	var scrollImg = new Image();
	var scrollVal = 0;
	var speed = 0.18;
	scrollImg.src = "assets/images/background.jpg";
	function renderScrollImage() {
	  //if you change scrollVal >=, you must change the ctx.drawImage.
	  if (scrollVal >= 1100) {
	    return;
	  }
	  if (!paused) {
	    scrollVal += speed;
	  }
	  setTimeout(function () {
	    renderScrollImage();
	  }, 10);
	}
	
	var clear = document.createElement("div");
	clear.id = "clear";
	document.getElementById("game-area").appendChild(clear);
	clear.addEventListener("click", function () {
	  this.style.display = 'none';
	  init();
	});
	
	canvas.addEventListener("click", function () {
	  paused = paused ? false : true;
	});
	
	//the initialize function
	function init() {
	  lastTime = Date.now();
	  song.play();
	  renderScrollImage();
	  main();
	}
	
	//game loop
	var lastTime = void 0;
	function main() {
	  var now = Date.now();
	  var dt = (now - lastTime) / 1000.0;
	  if (!paused) {
	    update(dt);
	    if (song.paused) {
	      song.play();
	    }
	  } else {
	    song.pause();
	  }
	
	  var gameCondition = render();
	  if (gameCondition !== 0) {
	    song.pause();
	    song.currentTime = 0;
	    winCondition(gameCondition);
	    return;
	  }
	  lastTime = now;
	  requestAnimFrame(main);
	}
	
	function winCondition(winParam) {
	  var winnerMarker = 5;
	  var yPosition = 180;
	  if (winParam === -1) {
	    var scores = JSON.parse(localStorage.getItem('scores'));
	    setup.pikalose.play();
	    ctx.drawImage(winMessage, 0, 0, 628, 326, 300, 20, 600, 300);
	    ctx.font = "40px Montserrat, sans-serif";
	    ctx.fillText("You Lose", 514, 100);
	    ctx.font = "20px Montserrat, sans-serif";
	    ctx.fillText("Top 5 Scores: ", 538, yPosition);
	    ctx.font = "15px Montserrat, sans-serif";
	    for (var i = 0; i < scores.length; i++) {
	      yPosition += 20;
	      ctx.fillText(i + 1 + ". " + scores[i], 584, yPosition);
	    }
	  } else {
	    var _scores = JSON.parse(localStorage.getItem('scores'));
	    for (var _i = 0; _i < _scores.length; _i++) {
	      if (score > _scores[_i]) {
	        _scores.pop();
	        _scores.splice(_i, 0, score);
	        winnerMarker = _i;
	        break;
	      }
	    }
	    localStorage.setItem('scores', JSON.stringify(_scores));
	    setup.pikawin.play();
	    ctx.drawImage(winMessage, 0, 0, 628, 326, 300, 20, 600, 300);
	    ctx.font = "40px Montserrat, sans-serif";
	    ctx.fillText("You Win!!!", 514, 100);
	    ctx.font = "20px Montserrat, sans-serif";
	    ctx.fillText("Top 5 Scores: ", 538, yPosition);
	    ctx.font = "15px Montserrat, sans-serif";
	    for (var _i2 = 0; _i2 < _scores.length; _i2++) {
	      yPosition += 20;
	      ctx.fillStyle = _i2 === winnerMarker ? "yellow" : "black";
	      ctx.fillText(_i2 + 1 + ". " + _scores[_i2], 584, yPosition);
	    }
	  }
	  var playAgain = document.createElement("button");
	  playAgain.innerHTML = "Play Again";
	  playAgain.addEventListener("click", function () {
	    location.reload();
	  });
	  document.getElementById("game-area").appendChild(playAgain);
	}
	
	//Speed in pixels per second
	var playerSpeed = 250;
	
	//the main update function. Called every frame.
	function update(dt) {
	  (0, _handleInput.handleInput)(dt);
	  updateEntities(dt);
	  (0, _boundaryCheck.boundaryCheck)();
	}
	
	//updating your Pikachu Sprite.
	function updateEntities(dt) {
	  Pikachu.player.sprite.update(dt);
	  while (Enemies.pokeballs.length < currentDifficulty) {
	    var pokeball = Enemies.createPokeball(dt);
	    if (pokeball) {
	      Enemies.pokeballs.push(pokeball);
	    }
	  }
	  Enemies.updatePokeballs(Enemies.pokeballs, dt);
	
	  while (Bird.pidgeys.length < 1) {
	    var pidgey = Bird.createPidgey();
	    if (pidgey) {
	      Bird.pidgeys.push(pidgey);
	    }
	  }
	  Bird.updatePidgeys(Bird.pidgeys, dt);
	
	  var numBerries = Math.floor(Math.random() * 4);
	  while (Items.berries.length < numBerries) {
	    var berry = Items.createBerry();
	    if (berry) {
	      Items.berries.push(berry);
	    }
	  }
	  Items.updateBerries(Items.berries);
	}
	
	// Draw the game
	var render = function render() {
	  //draw the background
	  if (!paused) {
	    ctx.drawImage(scrollImg, scrollVal, 0, 900, 1000, 0, 0, canvas.width, canvas.height);
	  }
	  ctx.save();
	  ctx.font = "30px SuperMario";
	  ctx.fillStyle = "white";
	  ctx.fillText("Score: " + score, 10, 50);
	  ctx.restore();
	  //draw the player
	  renderEntity(Pikachu.player);
	  //draw the pokeballs and berries
	  renderEntities(Enemies.pokeballs);
	  renderEntities(Bird.pidgeys);
	  renderEntities(Items.berries);
	  if (win === 1) return 1;
	  if (Enemies.pokeballs.length > 0) {
	    for (var i = 0; i < Enemies.pokeballs.length; i++) {
	      if (Collision.pokeballBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, Enemies.pokeballs[i].pos, Enemies.pokeballs[i].boxSize)) {
	        return -1;
	      }
	    }
	  }
	
	  if (Bird.pidgeys.length > 0) {
	    for (var _i3 = 0; _i3 < Bird.pidgeys.length; _i3++) {
	      if (Collision.pidgeyBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, Bird.pidgeys[_i3].pos, Bird.pidgeys[_i3].boxSize)) {
	        return -1;
	      }
	    }
	  }
	
	  if (Items.berries.length > 0) {
	    for (var _i4 = 0; _i4 < Items.berries.length; _i4++) {
	      var berry = Items.berries[_i4];
	      if (Collision.berryBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, berry.pos, berry.boxSize)) {
	        Items.berries.splice(Items.berries.indexOf(berry), 1);
	        if (setup.points.play()) {
	          setup.points.pause();
	          setup.points.currentTime = 0;
	          setup.points.play();
	        } else {
	          setup.points.play();
	        }
	        score += 10;
	      }
	    }
	  }
	
	  return 0;
	};
	
	var renderEntity = function renderEntity(entity) {
	  var jump = void 0;
	  ctx.save();
	  //this is 'where' the entity gets drawn on the board
	  ctx.translate(entity.pos[0], entity.pos[1]);
	
	  //507 is the bottom of the screen
	  jump = entity.pos[1] < 507 ? true : false;
	
	  entity.sprite.render(ctx, entity.sprite.url, entity.boxSize, jump);
	  ctx.restore();
	};
	
	var renderEntities = function renderEntities(array) {
	  if (array[0] === undefined) return;
	  switch (array[0].type) {
	    case 'pokeball':
	      for (var i = 0; i < array.length; i++) {
	        var entity = array[i];
	        ctx.save();
	        ctx.translate(entity.pos[0] + 50, entity.pos[1] + 50); // change origin
	        ctx.rotate(-250 * entity.rotationRate * Math.PI / 180 + entity.rotationPosition);
	        ctx.translate(-50, -50);
	        entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
	        ctx.restore();
	      }
	      break;
	    case 'pidgey':
	      for (var _i5 = 0; _i5 < array.length; _i5++) {
	        var _entity = array[_i5];
	        ctx.save();
	        ctx.translate(_entity.pos[0], _entity.pos[1]); // change origin
	        _entity.sprite.render(ctx, _entity.sprite.url, _entity.boxSize);
	        ctx.restore();
	      }
	      break;
	    case 'berry':
	      for (var _i6 = 0; _i6 < array.length; _i6++) {
	        var _entity2 = array[_i6];
	        ctx.save();
	        ctx.translate(_entity2.pos[0], _entity2.pos[1]); // change origin
	        _entity2.sprite.render(ctx, _entity2.sprite.url, _entity2.boxSize);
	        ctx.restore();
	      }
	      break;
	    default:
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sprite = function () {
	    //only url, pos, size are required.
	    function Sprite(url, pos, size, speed, frames, dir, once) {
	        _classCallCheck(this, Sprite);
	
	        this.pos = pos;
	        this.size = size;
	        this.speed = typeof speed === 'number' ? speed : 0;
	        this.frames = frames;
	        this._index = 0;
	        this.url = url;
	        this.dir = dir || 'horizontal';
	        this.once = once;
	    }
	
	    _createClass(Sprite, [{
	        key: 'update',
	        value: function update(dt) {
	            this._index += this.speed * dt;
	        }
	
	        //render actually renders the animation logic for the Sprite.
	
	    }, {
	        key: 'render',
	        value: function render(ctx, url, boxSize, jump) {
	            var frame = void 0;
	
	            if (this.speed > 0) {
	                var max = this.frames.length;
	                var idx = Math.floor(this._index);
	                //frame is a number
	                frame = jump ? 2 : this.frames[idx % max];
	                if (this.once && idx >= max) {
	                    this.done = true;
	                    return;
	                }
	            } else {
	                frame = 0;
	            }
	
	            //x and y are the starting position of the spritemap
	            var x = this.pos[0];
	            var y = this.pos[1];
	
	            //frame is from (0-3)
	            if (this.dir == 'vertical') {
	                y += frame * this.size[1];
	            } else {
	                x += frame * this.size[0];
	            }
	            //x and y tell you which frame to start drawing from.
	
	
	            ctx.drawImage(url, x, y, this.size[0], this.size[1], 0, 0, boxSize[0], boxSize[1]);
	            //  ctx.strokeRect(0, 0, boxSize[0], boxSize[1]);
	        }
	    }]);
	
	    return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	//returns t/f
	var pokeballCollision = exports.pokeballCollision = function pokeballCollision(x, y, r, b, x2, y2, r2, b2) {
	  return !(r <= x2 + 30 || x > r2 - 52 || b <= y2 + 45 || y > b2 - 4);
	};
	
	//returns t/f
	var pokeballBoxCollision = exports.pokeballBoxCollision = function pokeballBoxCollision(pos, size, pos2, size2) {
	  return pokeballCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	};
	
	var pidgeyCollision = exports.pidgeyCollision = function pidgeyCollision(x, y, r, b, x2, y2, r2, b2) {
	  return !(r <= x2 + 40 || x > r2 - 80 || b <= y2 + 30 || y > b2 - 70);
	};
	
	//returns t/f
	var pidgeyBoxCollision = exports.pidgeyBoxCollision = function pidgeyBoxCollision(pos, size, pos2, size2) {
	  return pidgeyCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	};
	
	var berryCollision = exports.berryCollision = function berryCollision(x, y, r, b, x2, y2, r2, b2) {
	  return !(r <= x2 + 20 || x > r2 - 15 || b <= y2 + 30 || y > b2 - 30);
	};
	
	//returns t/f
	var berryBoxCollision = exports.berryBoxCollision = function berryBoxCollision(pos, size, pos2, size2) {
	  return berryCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var pressedKeys = {};
	
	function setKey(event, status) {
	    var code = event.keyCode;
	    var key = void 0;
	
	    switch (code) {
	        case 32:
	            key = 'SPACE';break;
	        case 37:
	            key = 'LEFT';break;
	        case 38:
	            key = 'UP';break;
	        case 39:
	            key = 'RIGHT';break;
	        case 40:
	            key = 'DOWN';break;
	        default:
	            // Convert ASCII codes to letters
	            key = String.fromCharCode(code);
	    }
	
	    pressedKeys[key] = status;
	}
	
	document.addEventListener('keydown', function (e) {
	    setKey(e, true);
	});
	
	document.addEventListener('keyup', function (e) {
	    setKey(e, false);
	});
	
	window.addEventListener('blur', function () {
	    exports.pressedKeys = pressedKeys = {};
	});
	
	window.input = {
	    isDown: function isDown(key) {
	        return pressedKeys[key.toUpperCase()];
	    }
	};
	
	exports.setKey = setKey;
	exports.pressedKeys = pressedKeys;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pokeballs = exports.updatePokeballs = exports.createPokeball = undefined;
	
	var _sprite = __webpack_require__(1);
	
	var _sprite2 = _interopRequireDefault(_sprite);
	
	var _berries = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pokeballs = [];
	var pokeball = new Image();
	pokeball.src = "assets/images/pokeball.png";
	
	function createPokeball(dt) {
	  var xOffset = Math.random() * 1000 + 1200; //range: 1200 - 2200
	
	
	  var overlapPokeballs = pokeballs.filter(function (el) {
	    var upperBoundPokeball = el.pos[0] + 100;
	    var lowerBoundPokeball = el.pos[0] - 100;
	    return lowerBoundPokeball <= xOffset && xOffset <= upperBoundPokeball;
	  });
	
	  if (overlapPokeballs.length > 0) {
	    return null;
	  }
	
	  var overlapBerries = _berries.berries.filter(function (el) {
	    var upperBound = el.pos[0] + 80;
	    var lowerBound = el.pos[0] - 80;
	    return lowerBound <= xOffset && xOffset <= upperBound;
	  });
	
	  if (overlapBerries.length > 0) {
	    return null;
	  }
	  var speed = [5, 6, 7];
	  speed = speed[Math.floor(Math.random() * 3)];
	
	  return {
	    type: 'pokeball',
	    pos: [xOffset, 540],
	    boxSize: [100, 100],
	    sprite: new _sprite2.default(pokeball, [0, 0], [368, 368]),
	    speed: speed,
	    rotationRate: dt,
	    rotationPosition: Math.random() * 360 };
	}
	
	function updatePokeballs(obstacles, dt) {
	  for (var i = 0; i < obstacles.length; i++) {
	    obstacles[i].pos[0] -= obstacles[i].speed;
	    obstacles[i].rotationRate += dt;
	    if (obstacles[i].pos[0] < -100) {
	      var index = obstacles.indexOf(obstacles[i]);
	      obstacles.splice(index, 1);
	    }
	  }
	}
	
	exports.createPokeball = createPokeball;
	exports.updatePokeballs = updatePokeballs;
	exports.pokeballs = pokeballs;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.berries = exports.updateBerries = exports.createBerry = undefined;
	
	var _sprite = __webpack_require__(1);
	
	var _sprite2 = _interopRequireDefault(_sprite);
	
	var _enemies = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var berries = [];
	var berry = new Image();
	berry.src = "assets/images/berry.png";
	
	function createBerry() {
	  var xOffset = Math.random() * 2500 + 1200; //range: 1200 - 3700
	  var yOffset = Math.random() * 258 + 280;
	  window.pokeballs = _enemies.pokeballs;
	  window.berries = berries;
	  //if any of the xOffsets of the new berry is within any of the pokeballs x position,
	  //pick a new xOffset. A Pokeball is 100 by 100.
	  var overlapPokeballs = _enemies.pokeballs.filter(function (el) {
	    var upperBoundPokeball = el.pos[0] + 100;
	    var lowerBoundPokeball = el.pos[0] - 100;
	    return lowerBoundPokeball <= xOffset && xOffset <= upperBoundPokeball;
	  });
	
	  if (overlapPokeballs.length > 0) {
	    return null;
	  }
	  //if any of the x positions of previous berries are within xOffset,
	  //pick a new xOffset.
	  var overlapBerries = berries.filter(function (el) {
	    var upperBound = el.pos[0] + 80;
	    var lowerBound = el.pos[0] - 80;
	    return lowerBound <= xOffset && xOffset <= upperBound;
	  });
	
	  if (overlapBerries.length > 0) {
	    return null;
	  }
	
	  return {
	    type: 'berry',
	    pos: [xOffset, yOffset],
	    boxSize: [80, 92],
	    sprite: new _sprite2.default(berry, [0, 0], [92, 105]) };
	}
	
	function updateBerries(obstacles) {
	  for (var i = 0; i < obstacles.length; i++) {
	    obstacles[i].pos[0] -= 5;
	    if (obstacles[i].pos[0] < -100) {
	      var index = obstacles.indexOf(obstacles[i]);
	      obstacles.splice(index, 1);
	    }
	  }
	}
	
	exports.createBerry = createBerry;
	exports.updateBerries = updateBerries;
	exports.berries = berries;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pidgeys = exports.updatePidgeys = exports.createPidgey = undefined;
	
	var _sprite = __webpack_require__(1);
	
	var _sprite2 = _interopRequireDefault(_sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pidgeys = [];
	
	var pidgey = new Image();
	pidgey.src = "assets/images/pidgeyspritesheet.png";
	
	function createPidgey() {
	  var xOffset = Math.random() * 1000 + 1200; //range: 1200 - 2200
	  var oscillatePhase = Math.random() * 10;
	  return {
	    type: 'pidgey',
	    pos: [xOffset, 220],
	    boxSize: [100, 91],
	    oscillatePhase: oscillatePhase,
	    sprite: new _sprite2.default(pidgey, [0, 0], [63, 57], 10, [0, 1, 2, 3, 4]) };
	}
	
	function updatePidgeys(obstacles, dt) {
	  for (var i = 0; i < obstacles.length; i++) {
	    var bird = obstacles[i];
	    bird.sprite.update(dt);
	    bird.oscillatePhase += dt;
	    bird.pos[0] -= 5;
	    bird.pos[1] += 3 * Math.sin(2 * bird.oscillatePhase);
	    if (bird.pos[0] < -100) {
	      var index = obstacles.indexOf(bird);
	      obstacles.splice(index, 1);
	    }
	  }
	}
	
	exports.createPidgey = createPidgey;
	exports.updatePidgeys = updatePidgeys;
	exports.pidgeys = pidgeys;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.player = undefined;
	
	var _sprite = __webpack_require__(1);
	
	var _sprite2 = _interopRequireDefault(_sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pikachu = new Image();
	pikachu.src = "assets/images/pikachuspritesheet.png";
	
	var player = {
	    pos: [0, 507],
	    velY: 0,
	    boxSize: [200, 143],
	    jumping: false,
	    sprite: new _sprite2.default(pikachu, [0, 0], [450, 321], 10, [0, 1, 2, 3])
	};
	
	exports.player = player;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.boundaryCheck = undefined;
	
	var _pikachu = __webpack_require__(7);
	
	var Pikachu = _interopRequireWildcard(_pikachu);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var canvas = void 0;
	document.addEventListener('DOMContentLoaded', function () {
	  canvas = document.getElementById("canvas");
	});
	
	function boundaryCheck() {
	  if (Pikachu.player.pos[0] < 0 && Pikachu.player.pos[1] >= canvas.height - 143) {
	    Pikachu.player.pos[0] = 0;
	    Pikachu.player.jumping = false;
	    Pikachu.player.pos[1] = canvas.height - 143;
	  } else if (Pikachu.player.pos[0] < 0 && Pikachu.player.pos[1] < canvas.height - 143) {
	    Pikachu.player.pos[0] = 0;
	  } else if (Pikachu.player.pos[0] > canvas.width - 200 && Pikachu.player.pos[1] >= canvas.height - 143) {
	    Pikachu.player.pos[0] = canvas.width - 200;
	    Pikachu.player.jumping = false;
	    Pikachu.player.pos[1] = canvas.height - 143;
	  } else if (Pikachu.player.pos[0] > canvas.width - 200 && Pikachu.player.pos[1] < canvas.height - 143) {
	    Pikachu.player.pos[0] = canvas.width - 200;
	  } else if (Pikachu.player.pos[1] >= canvas.height - 143) {
	    Pikachu.player.jumping = false;
	    Pikachu.player.pos[1] = canvas.height - 143;
	  }
	}
	
	exports.boundaryCheck = boundaryCheck;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pikaNoises = exports.handleInput = undefined;
	
	var _pikachu = __webpack_require__(7);
	
	var Pikachu = _interopRequireWildcard(_pikachu);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var pika1 = new Audio('assets/audio/pika1.mp3');
	var pika2 = new Audio('assets/audio/pika2.mp3');
	var pika3 = new Audio('assets/audio/pika3.mp3');
	var pika4 = new Audio('assets/audio/pika4.mp3');
	
	var pikaNoises = [pika1, pika2, pika3, pika4];
	pikaNoises.forEach(function (el) {
	  el.volume = 1;
	});
	
	function handleInput(dt) {
	  var gravity = 0.2;
	
	  if (window.input.isDown('UP') || window.input.isDown('w')) {
	    if (!Pikachu.player.jumping) {
	      Pikachu.player.jumping = true;
	      pikaNoises[Math.floor(Math.random() * 4)].play();
	      Pikachu.player.velY = -250 * 2.2 * dt;
	    }
	  }
	  if (window.input.isDown('LEFT') || window.input.isDown('a')) {
	    Pikachu.player.pos[0] -= 400 * dt;
	  }
	  if (window.input.isDown('RIGHT') || window.input.isDown('d')) {
	    Pikachu.player.pos[0] += 400 * dt;
	  }
	  Pikachu.player.velY += gravity;
	  Pikachu.player.pos[1] += Pikachu.player.velY;
	}
	
	exports.handleInput = handleInput;
	exports.pikaNoises = pikaNoises;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _handleInput = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Setup = function Setup() {
	  _classCallCheck(this, Setup);
	
	  if (!localStorage.scores) {
	    var scores = [50, 40, 30, 20, 10];
	    localStorage.setItem('scores', JSON.stringify(scores));
	  }
	  this.points = new Audio('assets/audio/points.mp3');
	  this.points.volume = 0.05;
	  this.pikalose = new Audio('assets/audio/pikalose.mp3');
	  this.pikawin = new Audio('assets/audio/pikawin.mp3');
	  _handleInput.pikaNoises.push(this.pikalose, this.pikawin, this.points);
	  var song = document.getElementById("theme-song");
	  song.volume = 0.33;
	  var scrollVal = 0;
	  var speed = 0.18;
	  //disable up/down scrolling
	  window.addEventListener("keydown", function (e) {
	    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	      e.preventDefault();
	    }
	  });
	
	  //render the background image
	  document.addEventListener("DOMContentLoaded", function () {
	    var mute = document.createElement("div");
	    mute.className = "fa fa-volume-up";
	    mute.addEventListener("click", function () {
	      song.muted = !song.muted;
	      _handleInput.pikaNoises.forEach(function (el) {
	        el.muted = !el.muted;
	      });
	      mute.className == "fa fa-volume-up" ? mute.className = "fa fa-volume-off" : mute.className = "fa fa-volume-up";
	    });
	    document.getElementById("instructions").appendChild(mute);
	    var line0 = document.createElement("div");
	    line0.className = "flex";
	    line0.id = "click-to-play";
	    var clearMessage = document.createElement("p");
	    clearMessage.innerHTML = "Click to Play/Pause";
	    line0.appendChild(clearMessage);
	    document.getElementById("clear").appendChild(line0);
	    var clearImageArrows = document.createElement("img");
	    clearImageArrows.src = "assets/images/arrows.jpg";
	    clearImageArrows.id = "arrows";
	    var line1 = document.createElement("div");
	    line1.className = "flex";
	    line1.appendChild(clearImageArrows);
	    var outerDiv = document.createElement("div");
	    var move = document.createElement("span");
	    move.innerHTML = "Move";
	    move.id = "move-message";
	    var clearImagePikachu = document.createElement("img");
	    clearImagePikachu.src = "assets/images/pikachu.png";
	    clearImagePikachu.id = "pikachu";
	    outerDiv.id = "pikachuMove";
	    outerDiv.appendChild(move);
	    outerDiv.appendChild(clearImagePikachu);
	    line1.appendChild(outerDiv);
	    document.getElementById("clear").appendChild(line1);
	    var line2 = document.createElement("div");
	    line2.className = "flex";
	    var outerDiv2 = document.createElement("div");
	    var clearImagePokeball = document.createElement("img");
	    clearImagePokeball.src = "assets/images/pokeball.png";
	    clearImagePokeball.id = "pokeball";
	
	    var clearImagePidgey = document.createElement("img");
	    clearImagePidgey.src = "assets/images/pidgey.png";
	    clearImagePidgey.id = "pidgey";
	
	    var avoid = document.createElement("span");
	    avoid.innerHTML = "Avoid";
	    avoid.id = "avoid-message";
	    outerDiv2.appendChild(avoid);
	    outerDiv2.appendChild(clearImagePokeball);
	    outerDiv2.appendChild(clearImagePidgey);
	    outerDiv2.id = "avoidEnemy";
	    line2.appendChild(outerDiv2);
	    document.getElementById("clear").appendChild(line2);
	
	    var line3 = document.createElement("div");
	    line3.className = "flex";
	    var outerDiv3 = document.createElement("div");
	    outerDiv3.id = "berryCollect";
	    var clearImageBerry = document.createElement("img");
	    clearImageBerry.src = "assets/images/berry.png";
	    clearImageBerry.id = "berry";
	
	    var collect = document.createElement("span");
	    collect.innerText = "Collect";
	    collect.id = "collect-message";
	    outerDiv3.appendChild(collect);
	    outerDiv3.appendChild(clearImageBerry);
	    line3.appendChild(outerDiv3);
	    document.getElementById("clear").appendChild(line3);
	
	    var line4 = document.createElement("div");
	    line4.className = "flex";
	    var outerDiv4 = document.createElement("div");
	    var winInstructions = document.createElement("p");
	
	    winInstructions.innerText = "Play until the end of song (1:00) to win!";
	    winInstructions.id = "win-message";
	    outerDiv4.appendChild(winInstructions);
	    line4.appendChild(outerDiv4);
	    document.getElementById("clear").appendChild(line4);
	  });
	};
	
	exports.default = Setup;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map