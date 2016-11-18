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
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	//render the background image
	document.addEventListener("DOMContentLoaded", function () {
	  var isPaused = false;
	
	  var win = 0;
	  var song = document.getElementById("theme-song");
	  var mute = document.createElement("button");
	  mute.innerHTML = "mute";
	  mute.className = "mute";
	  mute.addEventListener("click", function () {
	    song.muted = !song.muted;
	  });
	
	  document.getElementById("instructions").appendChild(mute);
	  var scrollImg = new Image();
	  var scrollVal = 0;
	  var speed = 0.05;
	  scrollImg.src = "assets/pokemon.jpg";
	  function renderScrollImage() {
	    //if you change scrollVal >=, you must change the ctx.drawImage.
	    if (scrollVal >= 600) {
	      return;
	    }
	    scrollVal += speed;
	    setTimeout(function () {
	      renderScrollImage();
	    }, 10);
	  }
	
	  var pikachu = new Image();
	  pikachu.src = "assets/pikachu.png";
	
	  var winMessage = new Image();
	  winMessage.src = "assets/winmessage.png";
	
	  // Create the canvas
	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");
	  canvas.width = 700;
	  canvas.height = 380;
	  canvas.className = "player-canvas";
	  document.getElementById("game-area").appendChild(canvas);
	
	  //create the clear-screen
	  var clear = document.createElement("div");
	  clear.id = "clear";
	  clear.addEventListener("click", function () {
	    this.style.display = 'none';
	    init();
	  });
	  document.getElementById("game-area").appendChild(clear);
	  var clearImage = document.createElement("img");
	  clearImage.src = "assets/pokemonmessage.jpg";
	  document.getElementById("clear").appendChild(clearImage);
	
	  var clearMessage = document.createElement("p");
	  clearMessage.innerHTML = "Click to Play";
	  document.getElementById("clear").appendChild(clearMessage);
	
	  var description = document.createElement("div");
	  description.className = "game-description";
	  description.innerText = "Pikachu hates Poké Balls!\
	 To win the game, dodge every Poké Ball until the song \
	 finishes playing. If you get hit by a Poké Ball, you lose.\n\n\
	 Click to pause the game.";
	  document.body.appendChild(description);
	
	  song.addEventListener("ended", function () {
	    win = 1;
	  });
	
	  canvas.addEventListener("click", function () {
	    if (isPaused) {
	      isPaused = false;
	    } else {
	      isPaused = true;
	    }
	  });
	
	  //game loop
	  var lastTime = void 0;
	  function main() {
	    var now = Date.now();
	    var dt = (now - lastTime) / 1000.0;
	    if (!isPaused) {
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
	  //the initialize function
	  function init() {
	    lastTime = Date.now();
	    song.play();
	    renderScrollImage();
	    main();
	  }
	
	  function winCondition(win_param) {
	    if (win_param === -1) {
	      ctx.drawImage(winMessage, 0, 0, 628, 326, 150, 100, 400, 200);
	      ctx.font = "bold 40px Helvetica, sans-serif";
	      ctx.fillText("You Lose", 260, 200);
	    } else {
	      ctx.drawImage(winMessage, 0, 0, 628, 326, 150, 100, 400, 200);
	      ctx.font = "bold 40px Helvetica, sans-serif";
	      ctx.fillText("You Win!!!", 260, 200);
	    }
	    var playAgain = document.createElement("button");
	    playAgain.innerHTML = "Play Again";
	    playAgain.addEventListener("click", function () {
	      location.reload();
	    });
	    document.getElementById("game-area").appendChild(playAgain);
	  }
	
	  //game state
	  var player = {
	    pos: [0, 430],
	    velY: 0,
	    boxSize: [70, 50],
	    jumping: false,
	    sprite: new _sprite2.default(pikachu, [0, 0], [280, 200])
	  };
	
	  //Speed in pixels per second
	  var playerSpeed = 200;
	  var gravity = 0.2;
	  var enemies = [];
	
	  //the main update function. Called every frame.
	  function update(dt) {
	    handleInput(dt);
	    updateEntities(dt);
	    boundaryCheck();
	  }
	
	  //the input controls
	  var pressedKeys = {};
	
	  function setKey(event, status) {
	    var code = event.keyCode;
	    var key;
	
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
	    pressedKeys = {};
	  });
	
	  window.input = {
	    isDown: function isDown(key) {
	      return pressedKeys[key.toUpperCase()];
	    }
	  };
	
	  //handles the input from the player
	  function handleInput(dt) {
	    if (window.input.isDown('UP') || window.input.isDown('w')) {
	      if (!player.jumping) {
	        player.jumping = true;
	        player.velY = -playerSpeed * 2 * dt;
	      }
	    }
	
	    if (window.input.isDown('LEFT') || window.input.isDown('a')) {
	      player.pos[0] -= playerSpeed * dt;
	    }
	
	    if (window.input.isDown('RIGHT') || window.input.isDown('d')) {
	      player.pos[0] += playerSpeed * dt;
	    }
	    player.velY += gravity;
	    player.pos[1] += player.velY;
	    // player.pos[0] += player.vel;
	  }
	
	  //boundaries
	  function boundaryCheck() {
	    if (player.pos[0] < 0) {
	      player.pos[0] = 0;
	    } else if (player.pos[0] > canvas.width - 70) {
	      player.pos[0] = canvas.width - 70;
	    } else if (player.pos[1] >= canvas.height - 50) {
	      player.jumping = false;
	      player.pos[1] = canvas.height - 50;
	    }
	  }
	
	  //updating your Pikachu Sprite.
	  function updateEntities(dt) {
	    player.sprite.update(dt);
	    if (enemies.length === 0) {
	      enemies.push({
	        pos: [700, 330],
	        boxSize: [80, 80],
	        sprite: new _sprite2.default(pokeball, [0, 0], [600, 600])
	      });
	    }
	    updateEnemies(enemies, dt);
	  }
	
	  function updateEnemies(enemies, dt) {
	    for (var i = 0; i < enemies.length; i++) {
	      enemies[i].pos[0] -= 5;
	      if (enemies[i].pos[0] < -100) {
	        enemies.pop();
	      }
	    }
	  }
	
	  var pokeball = new Image();
	  pokeball.src = "assets/pokeball.png";
	
	  // Draw the game
	  var render = function render() {
	    //draw the background
	    if (!isPaused) {
	      ctx.drawImage(scrollImg, scrollVal, 0, 900, 854, 0, 0, canvas.width, canvas.height);
	    }
	    //draw the player
	    renderEntity(player);
	    //draw the pokeballs
	    renderEntities(enemies);
	    if (win === 1) {
	      return 1;
	    }
	    if (enemies.length > 0) {
	      if (Collision.boxCollision(player.pos, player.boxSize, enemies[0].pos, enemies[0].boxSize)) {
	        return -1;
	      }
	    }
	    return 0;
	  };
	
	  var renderEntity = function renderEntity(entity) {
	    ctx.save();
	    //this is 'where' the entity gets drawn on the board
	    ctx.translate(entity.pos[0], entity.pos[1]);
	    entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
	    ctx.restore();
	  };
	
	  var renderEntities = function renderEntities(array) {
	    for (var i = 0; i < array.length; i++) {
	      renderEntity(array[i]);
	    }
	  };
	});

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
	    }, {
	        key: 'render',
	        value: function render(ctx, url, boxSize) {
	            var frame;
	
	            if (this.speed > 0) {
	                var max = this.frames.length;
	                var idx = Math.floor(this._index);
	                frame = this.frames[idx % max];
	
	                if (this.once && idx >= max) {
	                    this.done = true;
	                    return;
	                }
	            } else {
	                frame = 0;
	            }
	
	            var x = this.pos[0];
	            var y = this.pos[1];
	
	            if (this.dir == 'vertical') {
	                y += frame * this.size[1];
	            } else {
	                x += frame * this.size[0];
	            }
	
	            ctx.drawImage(url, 0, 0, this.size[0], this.size[1], 0, 0, boxSize[0], boxSize[1]);
	            // ctx.strokeRect(0, 0, boxSize[0], boxSize[1]);
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
	var collision = exports.collision = function collision(x, y, r, b, x2, y2, r2, b2) {
	  return !(r <= x2 + 4 || x > r2 + 4 || b <= y2 + 25 || y > b2 - 4);
	};
	
	var boxCollision = exports.boxCollision = function boxCollision(pos, size, pos2, size2) {
	  return collision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map