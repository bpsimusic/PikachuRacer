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
	
	///////////////////
	document.addEventListener("DOMContentLoaded", function () {
	    // let canvas = document.getElementById("canvas");
	    // let playerCanvas = document.getElementById("player-canvas");
	    // let ctx = canvas.getContext("2d");
	    // const ctx2 = playerCanvas.getContext("2d");
	
	    var scrollImg = new Image();
	    var scrollVal = 0;
	    var speed = 0.08;
	
	    scrollImg.src = "assets/pokemon.jpg";
	    scrollImg.onload = renderImage;
	
	    var pikachu = new Image();
	    pikachu.src = "assets/pikachu.png";
	
	    function renderImage() {
	        //if you change scrollVal >=, you must change the ctx.drawImage.
	        if (scrollVal >= 600) {
	            return;
	        }
	        scrollVal += speed;
	        // ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas.width, canvas.height);
	        setTimeout(function () {
	            renderImage();
	        }, 10);
	    }
	
	    pikachu.onload = function () {
	        init();
	    };
	    /////////////////////////////
	
	
	    // Create the canvas
	    var canvas3 = document.createElement("canvas");
	    var ctx3 = canvas3.getContext("2d");
	    canvas3.width = 512;
	    canvas3.height = 480;
	    canvas3.className = "test-canvas";
	    document.body.appendChild(canvas3);
	
	    //game loop
	    var lastTime = void 0;
	    function main() {
	        var now = Date.now();
	        var dt = (now - lastTime) / 1000.0;
	        update(dt);
	        render();
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
	        pos: [0, 0],
	        sprite: new Sprite(pikachu, [0, 0], [280, 200])
	    };
	
	    //Speed in pixels per second
	    var playerSpeed = 200;
	
	    //the main update function. Called every frame.
	    function update(dt) {
	        handleInput(dt);
	        updateEntities(dt);
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
	        if (window.input.isDown('DOWN') || window.input.isDown('s')) {
	            player.pos[1] += playerSpeed * dt;
	        }
	
	        if (window.input.isDown('UP') || window.input.isDown('w')) {
	            player.pos[1] -= playerSpeed * dt;
	            console.log("sup");
	        }
	
	        if (window.input.isDown('LEFT') || window.input.isDown('a')) {
	            player.pos[0] -= playerSpeed * dt;
	        }
	
	        if (window.input.isDown('RIGHT') || window.input.isDown('d')) {
	            player.pos[0] += playerSpeed * dt;
	        }
	    }
	
	    //updating your Pikachu Sprite.
	    function updateEntities(dt) {
	        player.sprite.update(dt);
	    }
	
	    // Draw the player
	    var render = function render() {
	        ctx3.drawImage(scrollImg, scrollVal, 0, 640, 854, 0, 0, canvas3.width, canvas3.height);
	        renderEntity(player);
	    };
	
	    var renderEntity = function renderEntity(entity) {
	        ctx3.save();
	        ctx3.translate(entity.pos[0], entity.pos[1]);
	        entity.sprite.render(ctx3, entity.sprite.url);
	        ctx3.restore();
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
	
	    render: function render(ctx, url) {
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
	
	        ctx.drawImage(url, 0, 0, this.size[0], this.size[1], 0, 283, 70, 50);
	    }
	};
	
	window.Sprite = Sprite;
	module.exports = Sprite;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map