const Sprite = require("./sprite.js");

let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

//render the background image
document.addEventListener("DOMContentLoaded", function(){
    let scrollImg = new Image();
    let scrollVal = 0;
    let speed =0.08;
    scrollImg.src = "assets/pokemon.jpg";
    scrollImg.onload = renderImage;

    function renderImage(){
      //if you change scrollVal >=, you must change the ctx.drawImage.
        if(scrollVal >= 600){
            return;
        }
        scrollVal+=speed;
        setTimeout(function(){renderImage();},10);
    }

    let pikachu = new Image();
    pikachu.src = "assets/pikachu.png";
    pikachu.onload = function(){
      init();
    };

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
canvas.className = "player-canvas";
document.body.appendChild(canvas);


//game loop
let lastTime;
function main() {
  let now = Date.now();
  let dt = (now - lastTime) / 1000.0;
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
let player = {
    pos: [0, 430],
    sprite: new Sprite(pikachu, [0, 0], [280, 200])
};

//Speed in pixels per second
let playerSpeed = 200;


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

      switch(code) {
      case 32:
          key = 'SPACE'; break;
      case 37:
          key = 'LEFT'; break;
      case 38:
          key = 'UP'; break;
      case 39:
          key = 'RIGHT'; break;
      case 40:
          key = 'DOWN'; break;
      default:
          // Convert ASCII codes to letters
          key = String.fromCharCode(code);
      }

      pressedKeys[key] = status;
  }

  document.addEventListener('keydown', function(e) {
      setKey(e, true);
  });

  document.addEventListener('keyup', function(e) {
      setKey(e, false);
  });

  window.addEventListener('blur', function() {
      pressedKeys = {};
  });

  window.input = {
      isDown: function(key) {
          return pressedKeys[key.toUpperCase()];
      }
  };

//handles the input from the player
  function handleInput(dt) {
    if(window.input.isDown('DOWN') || window.input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if(window.input.isDown('UP') || window.input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
        console.log("sup");
    }

    if(window.input.isDown('LEFT') || window.input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(window.input.isDown('RIGHT') || window.input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

    boundaryCheck();
  }

//boundaries
  function boundaryCheck(){
    if (player.pos[0] < 0){
      player.pos[0]=0
    } else if (player.pos[1] < 0){
      player.pos[1]=0
    } else if (player.pos[0] > (canvas.width - 70)){
      player.pos[0] = (canvas.width - 70)
    } else if (player.pos[1] > (canvas.height - 50)){
      player.pos[1] = (canvas.height - 50)
    }
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    player.sprite.update(dt);
  }

// Draw the game
  let render = () => {
    //draw the background
    ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas.width, canvas.height);
    //draw the player
    renderEntity(player);
  };


  let renderEntity = (entity) => {
      ctx.save();
      ctx.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(ctx, entity.sprite.url);
      ctx.restore();
  };

});
