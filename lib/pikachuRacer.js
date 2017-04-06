import Sprite from "./sprite";
import * as Collision from "./collision";
import * as Input from "./input";
import * as Enemies from "./enemies";
import * as Pikachu from "./pikachu";
import {boundaryCheck} from "./boundaryCheck";
import {handleInput} from "./handleInput";
import Setup from "./setup";

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

const setup = new Setup();

//disable up/down scrolling
window.addEventListener("keydown", function(e){
  if([32,37,38,39,40].indexOf(e.keyCode) > -1){
    e.preventDefault();
  }
});

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let win = 0;
let paused = false;
let song = document.getElementById("theme-song");
let winMessage = new Image();
winMessage.src = "assets/images/winmessage.png";
song.addEventListener("ended", function(){
  win = 1;
});

let scrollImg = new Image();
let scrollVal = 0;
let speed = 0.18;
scrollImg.src = "assets/images/background.jpg";
function renderScrollImage(){
  //if you change scrollVal >=, you must change the ctx.drawImage.
    if(scrollVal >= 1100){
        return;
    }
    if (!paused){
      scrollVal+=speed;
    }
    setTimeout(function(){renderScrollImage();},10);
}

let clear = document.createElement("div");
clear.id = "clear";
document.getElementById("game-area").appendChild(clear);
clear.addEventListener("click", function(){
  this.style.display='none';
  init();
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
    ctx.drawImage(winMessage, 0,0, 628, 326, 404, 100, 400, 200 );
    ctx.font="40px Montserrat, sans-serif";
    ctx.fillText("You Lose",514,200);
  } else {
    ctx.drawImage(winMessage, 0,0, 628, 326, 404, 100, 400, 200 );
    ctx.font="40px Montserrat, sans-serif";
    ctx.fillText("You Win!!!",514,200);
  }
  let playAgain = document.createElement("button");
  playAgain.innerHTML = "Play Again";
  playAgain.addEventListener("click", function(){
    location.reload();
  });
  document.getElementById("game-area").appendChild(playAgain);
}

//Speed in pixels per second
let playerSpeed = 250;
let enemies = [];

//the main update function. Called every frame.
  function update(dt) {
      handleInput(dt);
      updateEntities(dt);
      boundaryCheck();
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    Pikachu.player.sprite.update(dt);
    while(enemies.length<2){
      let pokeball = Enemies.createPokeball(dt);
      enemies.push(pokeball);
    }
    updateEnemies(enemies, dt);
  }

  function updateEnemies(obstacles, dt){
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].pos[0] -= 5;
      enemies[i].rotationRate += dt;
      if (enemies[i].pos[0] < -100){
        let index = enemies.indexOf(enemies[i]);
        enemies.splice(index, 1);
      }
    }
  }
// Draw the game
  let render = () => {
    //draw the background
    if(!paused){
    ctx.drawImage(scrollImg, scrollVal, 0, 900, 1000, 0,0,canvas.width, canvas.height);
    }
    //draw the player
    renderEntity(Pikachu.player);
    //draw the pokeballs
    renderEntities(enemies);
    if(win ===1){
      return 1;
    }
    if(enemies.length > 0){
      for (var i = 0; i < enemies.length; i++) {
        if(Collision.boxCollision(Pikachu.player.pos, Pikachu.player.boxSize, enemies[i].pos, enemies[i].boxSize)){
          return -1;
        }
      }

    }
    return 0;
  };

  let renderEntity = (entity) => {
      let jump;
      ctx.save();
      //this is 'where' the entity gets drawn on the board
      ctx.translate(entity.pos[0], entity.pos[1]);

      jump = entity.pos[1] < 507 ? true : false;

      entity.sprite.render(ctx, entity.sprite.url, entity.boxSize, jump);
      ctx.restore();
  };

  let renderEntities = (array) => {
    for (let i = 0; i < array.length; i++) {
      let entity = array[i];
      ctx.save();
      ctx.translate(entity.pos[0]+50, entity.pos[1]+50); // change origin
      ctx.rotate((-250 * entity.rotationRate * Math.PI/180) + entity.rotationPosition);
      ctx.translate(-50, -50);
      entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
      ctx.restore();
    }
  };
