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
	
	var Sprite = __webpack_require__(1);
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	//render the background image
	document.addEventListener("DOMContentLoaded", function () {
	  var scrollImg = new Image();
	  var scrollVal = 0;
	  var speed = 0.08;
	  scrollImg.src = "assets/pokemon.jpg";
	  scrollImg.onload = renderScrollImage;
	
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
	  pikachu.onload = function () {
	    init();
	  };
	
	  // Create the canvas
	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");
	  canvas.width = 512;
	  canvas.height = 480;
	  canvas.className = "player-canvas";
	  document.body.appendChild(canvas);
	
	  //game loop
	  var lastTime = void 0;
	  function main() {
	    var now = Date.now();
	    var dt = (now - lastTime) / 1000.0;
	    update(dt);
	    var continueGame = render();
	    if (!continueGame) {
	      return;
	    }
	    lastTime = now;
	    requestAnimFrame(main);
	  }
	  //the initialize function
	  function init() {
	    lastTime = Date.now();
	    main();
	  }
	
	  //game state
	  var player = {
	    pos: [0, 430],
	    velY: 0,
	    boxSize: [70, 50],
	    jumping: false,
	    sprite: new Sprite(pikachu, [0, 0], [280, 200])
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
	        pos: [512, 430],
	        boxSize: [80, 80],
	        sprite: new Sprite(pokeball, [0, 0], [600, 600])
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
	    ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0, 0, canvas.width, canvas.height);
	    //draw the player
	    renderEntity(player);
	    //draw the pokeballs
	    renderEntities(enemies);
	    if (enemies.length > 0) {
	
	      if (boxCollision(player.pos, player.boxSize, enemies[0].pos, enemies[0].boxSize)) {
	
	        return false;
	      }
	    }
	    return true;
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
	
	  var collision = function collision(x, y, r, b, x2, y2, r2, b2) {
	    return !(r <= x2 + 4 || x > r2 + 4 || b <= y2 + 25 || y > b2 - 4);
	  };
	
	  var boxCollision = function boxCollision(pos, size, pos2, size2) {
	    return collision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	function Sprite(url, pos, size, speed, frames, dir, once) {
	    this.pos = pos;
	    this.size = size;
	    this.speed = typeof speed === 'number' ? speed : 0;
	    this.frames = frames;
	    this._index = 0;
	    this.url = url;
	    this.dir = dir || 'horizontal';
	    this.once = once;
	}
	
	Sprite.prototype = {
	    update: function update(dt) {
	        this._index += this.speed * dt;
	    },
	
	    render: function render(ctx, url, boxSize) {
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
	};
	
	window.Sprite = Sprite;
	module.exports = Sprite;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map