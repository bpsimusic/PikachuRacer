import Sprite from "./sprite";
import * as Collision from "./collision";

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
    let song = document.getElementById("theme-song");
    song.play();
    let mute = document.createElement("button");
    mute.innerHTML = "mute";
    mute.addEventListener("click", function(){
      song.muted = !song.muted;
    });
    document.body.appendChild(mute);
    let scrollImg = new Image();
    let scrollVal = 0;
    let speed =0.08;
    scrollImg.src = "assets/pokemon.jpg";
    scrollImg.onload = renderScrollImage;

    function renderScrollImage(){
      //if you change scrollVal >=, you must change the ctx.drawImage.
        if(scrollVal >= 600){
            return;
        }
        scrollVal+=speed;
        setTimeout(function(){renderScrollImage();},10);
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
  let continueGame = render();
  if (!continueGame){
    song.pause();
    song.currentTime = 0;
    return ;
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
let player = {
    pos: [0, 430],
    velY: 0,
    boxSize: [70, 50],
    jumping: false,
    sprite: new Sprite(pikachu, [0, 0], [280, 200])
};

//Speed in pixels per second
let playerSpeed = 200;
let gravity = 0.2;
let enemies = [];




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
    if(window.input.isDown('UP') || window.input.isDown('w')) {
      if(!player.jumping){
         player.jumping = true;
         player.velY = -playerSpeed * 2 * dt;
      }
    }

    if(window.input.isDown('LEFT') || window.input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;

    }

    if(window.input.isDown('RIGHT') || window.input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }
    player.velY += gravity;
    player.pos[1] += player.velY;
    // player.pos[0] += player.vel;
  }

//boundaries
  function boundaryCheck(){
    if (player.pos[0] < 0){
      player.pos[0]=0;
    } else if (player.pos[0] >(canvas.width - 70)){
      player.pos[0] = (canvas.width - 70);
    } else if (player.pos[1] >= (canvas.height - 50)){
      player.jumping = false;
      player.pos[1] = (canvas.height - 50);
    }
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    player.sprite.update(dt);
    if(enemies.length===0){
      enemies.push({
        pos: [512, 430],
        boxSize: [80, 80],
        sprite: new Sprite(pokeball, [0,0], [600, 600])
      });
    }
    updateEnemies(enemies, dt);
  }

  function updateEnemies(enemies, dt){
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].pos[0] -= 5;
      if (enemies[i].pos[0] < -100){
        enemies.pop();
      }
    }
  }

  let pokeball = new Image();
  pokeball.src = "assets/pokeball.png";

// Draw the game
  let render = () => {
    //draw the background
    ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas.width, canvas.height);
    //draw the player
    renderEntity(player);
    //draw the pokeballs
    renderEntities(enemies);
    if(enemies.length > 0){

      if(Collision.boxCollision(player.pos, player.boxSize, enemies[0].pos, enemies[0].boxSize)){

        return false;
      }
    }
    return true;
  };


  let renderEntity = (entity) => {
      ctx.save();
      //this is 'where' the entity gets drawn on the board
      ctx.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
      ctx.restore();
  };

  let renderEntities = (array) => {
    for (let i = 0; i < array.length; i++) {
      renderEntity(array[i]);
    }
  };
});
