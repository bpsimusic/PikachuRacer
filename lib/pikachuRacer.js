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
    document.body.style.backgroundColor = "green";
    let paused = false;
    let win = 0;
    let song = document.getElementById("theme-song");
    let mute = document.createElement("button");
    mute.innerHTML = "mute";
    mute.className = "mute";
    mute.addEventListener("click", function(){
      song.muted = !song.muted;
    });

    document.getElementById("instructions").appendChild(mute);
    let scrollImg = new Image();
    let scrollVal = 0;
    let speed =0.05;
    scrollImg.src = "assets/pokemon.jpg";
    function renderScrollImage(){
      //if you change scrollVal >=, you must change the ctx.drawImage.
        if(scrollVal >= 600){
            return;
        }
        if (!paused){
          scrollVal+=speed;
        }
        setTimeout(function(){renderScrollImage();},10);
    }

    let pikachu = new Image();
    pikachu.src = "assets/pikachu.png";

    let winMessage = new Image();
    winMessage.src = "assets/winmessage.png";

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 380;
canvas.className = "player-canvas";
document.getElementById("game-area").appendChild(canvas);

//create the clear-screen
let clear = document.createElement("div");
clear.id = "clear";
clear.addEventListener("click", function(){
  this.style.display='none';
  init();
})
document.getElementById("game-area").appendChild(clear);
let clearImage = document.createElement("img");
clearImage.src = "assets/pokemonmessage.jpg";
document.getElementById("clear").appendChild(clearImage);

let clearMessage = document.createElement("p");
clearMessage.innerHTML = "Click to Play";
document.getElementById("clear").appendChild(clearMessage);


let description = document.createElement("div");
description.className = "game-description";
description.innerText = "Pikachu hates Poké Balls!\
 To win the game, dodge every Poké Ball until the song \
 finishes playing. If you get hit by a Poké Ball, you lose.\n\n\
 Click to pause the game.\n\n\
 All Pokemon images and trademarks used in Pikachu Racer \
 belong to the Pokemon Company."
document.body.appendChild(description);


song.addEventListener("ended", function(){
  win = 1;
});


canvas.addEventListener("click", function(){
  if(paused){
    paused = false;
  } else {
    paused = true;
  }
});

//game loop
let lastTime;
function main() {
  let now = Date.now();
  let dt = (now - lastTime) / 1000.0;
  if(!paused){
    update(dt);
    if (song.paused){
      song.play();
    }
  } else {
    song.pause();
  }

  let gameCondition = render();
  if (gameCondition !== 0){
    song.pause();
    song.currentTime = 0;
    winCondition(gameCondition);
    return ;
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

function winCondition(win_param){
  if(win_param === -1){
    ctx.drawImage(winMessage, 0,0, 628, 326, 150, 100, 400, 200 );
    ctx.font="bold 40px Helvetica, sans-serif";
    ctx.fillText("You Lose",260,200);
  } else {
    ctx.drawImage(winMessage, 0,0, 628, 326, 150, 100, 400, 200 );
    ctx.font="bold 40px Helvetica, sans-serif";
    ctx.fillText("You Win!!!",260,200);
  }
  let playAgain = document.createElement("button");
  playAgain.innerHTML = "Play Again";
  playAgain.addEventListener("click", function(){
    location.reload();
  });
  document.getElementById("game-area").appendChild(playAgain);
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

  function createPokeball(){
    let xOffset = Math.random() * 1000 + 700;
    return { pos: [xOffset, 330],
      boxSize: [80, 80],
      sprite: new Sprite(pokeball, [0,0], [600, 600])};
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    player.sprite.update(dt);
    while(enemies.length<2){
      let pokeball = createPokeball();
      enemies.push(pokeball);
    }
    updateEnemies(enemies, dt);
  }

  function updateEnemies(enemies, dt){
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].pos[0] -= 5;
      if (enemies[i].pos[0] < -100){
        let index = enemies.indexOf(enemies[i]);
        enemies.splice(index, 1);
      }
    }
  }

  let pokeball = new Image();
  pokeball.src = "assets/pokeball.png";

// Draw the game
  let render = () => {
    //draw the background
    if(!paused){
    ctx.drawImage(scrollImg, scrollVal, 0, 900, 854, 0,0,canvas.width, canvas.height);
    }
    //draw the player
    renderEntity(player);
    //draw the pokeballs
    renderEntities(enemies);
    if(win ===1){
      return 1;
    }
    if(enemies.length > 0){
      for (var i = 0; i < enemies.length; i++) {
        if(Collision.boxCollision(player.pos, player.boxSize, enemies[i].pos, enemies[i].boxSize)){
          return -1;
        }
      }

    }
    return 0;
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
