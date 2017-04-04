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
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	//disable up/down scrolling
	window.addEventListener("keydown", function (e) {
	  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	    e.preventDefault();
	  }
	});
	
	//render the background image
	document.addEventListener("DOMContentLoaded", function () {
	  var paused = false;
	  var win = 0;
	  var song = document.getElementById("theme-song");
	  var mute = document.createElement("div");
	  mute.className = "fa fa-volume-up";
	  mute.addEventListener("click", function () {
	    song.muted = !song.muted;
	    mute.className == "fa fa-volume-up" ? mute.className = "fa fa-volume-off" : mute.className = "fa fa-volume-up";
	  });
	
	  document.getElementById("instructions").appendChild(mute);
	  var scrollImg = new Image();
	  var scrollVal = 0;
	
	  var speed = 0.19;
	  scrollImg.src = "assets/background.jpg";
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
	
	  var pikachu = new Image();
	  pikachu.src = "assets/pikachuspritesheet.png";
	
	  var winMessage = new Image();
	  winMessage.src = "assets/winmessage.png";
	
	  // Create the canvas
	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");
	  canvas.width = 1200;
	  canvas.height = 650;
	  canvas.className = "player-canvas";
	  document.getElementById("game-area").appendChild(canvas);
	
	  //create the clear-screen
	  var clear = document.createElement("div");
	  clear.id = "clear";
	  document.getElementById("game-area").appendChild(clear);
	  clear.addEventListener("click", function () {
	    this.style.display = 'none';
	    init();
	  });
	
	  var line0 = document.createElement("div");
	  line0.className = "flex";
	  line0.id = "click-to-play";
	  var clearMessage = document.createElement("p");
	  clearMessage.innerHTML = "Click to Play";
	  line0.appendChild(clearMessage);
	  document.getElementById("clear").appendChild(line0);
	
	  var clearImageArrows = document.createElement("img");
	  clearImageArrows.src = "assets/arrows.jpg";
	  clearImageArrows.id = "arrows";
	  var line1 = document.createElement("div");
	  line1.className = "flex";
	  line1.appendChild(clearImageArrows);
	  var outerDiv = document.createElement("div");
	  var move = document.createElement("span");
	  move.innerHTML = "Move";
	  move.id = "move-message";
	  var clearImagePikachu = document.createElement("img");
	  clearImagePikachu.src = "assets/pikachu.png";
	  clearImagePikachu.id = "pikachu";
	  outerDiv.appendChild(move);
	  outerDiv.appendChild(clearImagePikachu);
	  line1.appendChild(outerDiv);
	  document.getElementById("clear").appendChild(line1);
	
	  var line2 = document.createElement("div");
	  line2.className = "flex";
	  var outerDiv2 = document.createElement("div");
	  var clearImagePokeball = document.createElement("img");
	  clearImagePokeball.src = "assets/pokeball.png";
	  clearImagePokeball.id = "pokeball";
	  var avoid = document.createElement("span");
	  avoid.innerHTML = "Avoid";
	  avoid.id = "avoid-message";
	  outerDiv2.appendChild(avoid);
	  outerDiv2.appendChild(clearImagePokeball);
	  line2.appendChild(outerDiv2);
	  document.getElementById("clear").appendChild(line2);
	
	  song.addEventListener("ended", function () {
	    win = 1;
	  });
	
	  canvas.addEventListener("click", function () {
	    if (paused) {
	      paused = false;
	    } else {
	      paused = true;
	    }
	  });
	
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
	  //the initialize function
	  function init() {
	    lastTime = Date.now();
	    song.play();
	    renderScrollImage();
	    main();
	  }
	
	  function winCondition(win_param) {
	    if (win_param === -1) {
	      ctx.drawImage(winMessage, 0, 0, 628, 326, 404, 100, 400, 200);
	      ctx.font = "40px Montserrat, sans-serif";
	      ctx.fillText("You Lose", 514, 200);
	    } else {
	      ctx.drawImage(winMessage, 0, 0, 628, 326, 404, 100, 400, 200);
	      ctx.font = "40px Montserrat, sans-serif";
	      ctx.fillText("You Win!!!", 514, 200);
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
	    pos: [0, 507],
	    velY: 0,
	    boxSize: [200, 143],
	    jumping: false,
	    sprite: new _sprite2.default(pikachu, [0, 0], [450, 321], 10, [0, 1, 2, 3])
	  };
	
	  //Speed in pixels per second
	  var playerSpeed = 250;
	  var gravity = 0.2;
	  var enemies = [];
	
	  //the main update function. Called every frame.
	  function update(dt) {
	    handleInput(dt);
	    updateEntities(dt);
	    boundaryCheck();
	  }
	
	  //handles the input from the player
	  function handleInput(dt) {
	
	    if (window.input.isDown('UP') || window.input.isDown('w')) {
	
	      if (!player.jumping) {
	        player.jumping = true;
	        player.velY = -250 * 2.2 * dt;
	      }
	    }
	
	    if (window.input.isDown('LEFT') || window.input.isDown('a')) {
	      player.pos[0] -= 400 * dt;
	    }
	
	    if (window.input.isDown('RIGHT') || window.input.isDown('d')) {
	      player.pos[0] += 400 * dt;
	    }
	    player.velY += gravity;
	    player.pos[1] += player.velY;
	  }
	
	  //boundaries
	  function boundaryCheck() {
	    if (player.pos[0] < 0 && player.pos[1] >= canvas.height - 143) {
	      player.pos[0] = 0;
	      player.jumping = false;
	      player.pos[1] = canvas.height - 143;
	    } else if (player.pos[0] < 0 && player.pos[1] < canvas.height - 143) {
	      player.pos[0] = 0;
	    } else if (player.pos[0] > canvas.width - 200 && player.pos[1] >= canvas.height - 143) {
	      player.pos[0] = canvas.width - 200;
	      player.jumping = false;
	      player.pos[1] = canvas.height - 143;
	    } else if (player.pos[0] > canvas.width - 200 && player.pos[1] < canvas.height - 143) {
	      player.pos[0] = canvas.width - 200;
	    } else if (player.pos[1] >= canvas.height - 143) {
	      player.jumping = false;
	      player.pos[1] = canvas.height - 143;
	    }
	  }
	
	  function createPokeball() {
	    var xOffset = Math.random() * 1000 + 1200;
	    return { pos: [xOffset, 540],
	      boxSize: [140, 140],
	      sprite: new _sprite2.default(pokeball, [0, 0], [600, 600]) };
	  }
	
	  //updating your Pikachu Sprite.
	  function updateEntities(dt) {
	    player.sprite.update(dt);
	    while (enemies.length < 2) {
	      var _pokeball = createPokeball();
	      enemies.push(_pokeball);
	    }
	    updateEnemies(enemies, dt);
	  }
	
	  function updateEnemies(obstacles, dt) {
	    for (var i = 0; i < enemies.length; i++) {
	      enemies[i].pos[0] -= 5;
	      if (enemies[i].pos[0] < -100) {
	        var index = enemies.indexOf(enemies[i]);
	        enemies.splice(index, 1);
	      }
	    }
	  }
	
	  var pokeball = new Image();
	  pokeball.src = "assets/pokeball.png";
	
	  // Draw the game
	  var render = function render() {
	    //draw the background
	    if (!paused) {
	      ctx.drawImage(scrollImg, scrollVal, 0, 900, 1000, 0, 0, canvas.width, canvas.height);
	    }
	    //draw the player
	    renderEntity(player);
	    //draw the pokeballs
	    renderEntities(enemies);
	    if (win === 1) {
	      return 1;
	    }
	    if (enemies.length > 0) {
	      for (var i = 0; i < enemies.length; i++) {
	        if (Collision.boxCollision(player.pos, player.boxSize, enemies[i].pos, enemies[i].boxSize)) {
	
	          return -1;
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
	
	    jump = entity.pos[1] < 507 ? true : false;
	
	    entity.sprite.render(ctx, entity.sprite.url, entity.boxSize, jump);
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
	  return !(r <= x2 + 10 || x > r2 - 49 || b <= y2 + 100 || y > b2 - 4);
	};
	
	var boxCollision = exports.boxCollision = function boxCollision(pos, size, pos2, size2) {
	  return collision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map