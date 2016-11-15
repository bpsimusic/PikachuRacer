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
/***/ function(module, exports) {

	"use strict";
	
	// import GameView from "./game_view.js";
	
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  var playerCanvas = document.getElementById("player-canvas");
	  var ctx = canvas.getContext("2d");
	  var ctx2 = playerCanvas.getContext("2d");
	
	  var scrollImg = new Image();
	  var scrollVal = 0;
	  var speed = 0.08;
	
	  scrollImg.src = "assets/pokemon.jpg";
	  scrollImg.onload = renderImage;
	
	  var pikachu = new Image();
	
	  pikachu.onload = function () {
	    ctx2.drawImage(pikachu, 0, 0, 280, 200, 0, 283, 70, 50);
	  };
	
	  pikachu.src = "assets/pikachu.jpg";
	
	  function renderImage() {
	    //if you change scrollVal >=, you must change the ctx.drawImage.
	    if (scrollVal >= 600) {
	      return;
	    }
	    scrollVal += speed;
	    ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0, 0, canvas.width, canvas.height);
	    setTimeout(function () {
	      renderImage();
	    }, 10);
	  }
	
	  //  const game = new Game();
	  //  new GameView(game, ctx).start();
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map