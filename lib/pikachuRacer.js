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

///////////////////
document.addEventListener("DOMContentLoaded", function(){
    // let canvas = document.getElementById("canvas");
    // let playerCanvas = document.getElementById("player-canvas");
    // let ctx = canvas.getContext("2d");
    // const ctx2 = playerCanvas.getContext("2d");

    let scrollImg = new Image();
    let scrollVal = 0;
    let speed =0.08;

    scrollImg.src = "assets/pokemon.jpg";
    scrollImg.onload = renderImage;

    let pikachu = new Image();
    pikachu.src = "assets/pikachu.png";

    function renderImage(){
      //if you change scrollVal >=, you must change the ctx.drawImage.
        if(scrollVal >= 600){
            return;
        }
        scrollVal+=speed;
        // ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas.width, canvas.height);
        setTimeout(function(){renderImage();},10);
    }

    pikachu.onload = function(){
      init();
    };
/////////////////////////////



// Create the canvas
let canvas3 = document.createElement("canvas");
let ctx3 = canvas3.getContext("2d");
canvas3.width = 512;
canvas3.height = 480;
canvas3.className = "test-canvas";
document.body.appendChild(canvas3);


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
    pos: [0, 0],
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
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    player.sprite.update(dt);
  }

// Draw the player
  let render = () => {
    ctx3.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas3.width, canvas3.height);
    renderEntity(player);
  };


  let renderEntity = (entity) => {
      ctx3.save();
      ctx3.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(ctx3, entity.sprite.url);
      ctx3.restore();
  };

});
