import Sprite from "./sprite";
import * as Collision from "./collision";
import * as Input from "./input";
import * as Enemies from "./enemies";
import * as Items from "./berries";
import * as Bird from "./pidgey";
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

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let score = 0;
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
    setTimeout(function(){renderScrollImage();}, 10);
}

let clear = document.createElement("div");
clear.id = "clear";
document.getElementById("game-area").appendChild(clear);
clear.addEventListener("click", function(){
  this.style.display='none';
  init();
});

canvas.addEventListener("click", function(){
  paused = paused ? false : true;
});

//the initialize function
function init() {
    lastTime = Date.now();
    song.play();
    renderScrollImage();
    main();
}

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


function winCondition(winParam){
  if(winParam === -1){
    setup.pikalose.play();
    ctx.drawImage(winMessage, 0,0, 628, 326, 404, 100, 400, 200 );
    ctx.font="40px Montserrat, sans-serif";
    ctx.fillText("You Lose",514,200);
  } else {
    setup.pikawin.play();
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


//the main update function. Called every frame.
  function update(dt) {
      handleInput(dt);
      updateEntities(dt);
      boundaryCheck();
  }

//updating your Pikachu Sprite.
  function updateEntities(dt) {
    Pikachu.player.sprite.update(dt);
    while(Enemies.pokeballs.length<3){
      let pokeball = Enemies.createPokeball(dt);
      if (pokeball) {
        Enemies.pokeballs.push(pokeball);
      }
    }
    Enemies.updatePokeballs(Enemies.pokeballs, dt);

    while(Bird.pidgeys.length<1){
      let pidgey = Bird.createPidgey();
      if (pidgey) {
        Bird.pidgeys.push(pidgey);
      }
    }
    Bird.updatePidgeys(Bird.pidgeys, dt);


    let numBerries = Math.floor(Math.random() * 4);
    while(Items.berries.length < numBerries){
      let berry = Items.createBerry();
      if (berry) {
        Items.berries.push(berry);
      }
    }
    Items.updateBerries(Items.berries);
  }


// Draw the game
  let render = () => {
    //draw the background
    if(!paused){
      ctx.drawImage(scrollImg, scrollVal, 0, 900, 1000, 0,0,canvas.width, canvas.height);
    }
    ctx.save();
    ctx.font = "30px SuperMario";
    ctx.fillStyle="white";
    ctx.fillText(`Score: ${score}`,10,50);
    ctx.restore();
    //draw the player
    renderEntity(Pikachu.player);
    //draw the pokeballs and berries
    renderEntities(Enemies.pokeballs);
    renderEntities(Bird.pidgeys);
    renderEntities(Items.berries);
    if(win ===1) return 1;
    if(Enemies.pokeballs.length > 0){
      for (let i = 0; i < Enemies.pokeballs.length; i++) {
        if(Collision.pokeballBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, Enemies.pokeballs[i].pos, Enemies.pokeballs[i].boxSize)){
          return -1;
        }
      }
    }

    if(Bird.pidgeys.length > 0){
      for (let i = 0; i < Bird.pidgeys.length; i++) {
        if(Collision.pidgeyBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, Bird.pidgeys[i].pos, Bird.pidgeys[i].boxSize)){
          return -1;
        }
      }
    }

    if(Items.berries.length > 0){
      for (let i = 0; i < Items.berries.length; i++) {
        let berry = Items.berries[i];
        if(Collision.berryBoxCollision(Pikachu.player.pos, Pikachu.player.boxSize, berry.pos, berry.boxSize)){
          Items.berries.splice(Items.berries.indexOf(berry),1);
          if (setup.points.play()){
            setup.points.pause();
            setup.points.currentTime = 0;
            setup.points.play();
          } else {
            setup.points.play();
          }
          score += 10;
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

      //507 is the bottom of the screen
      jump = entity.pos[1] < 507 ? true : false;

      entity.sprite.render(ctx, entity.sprite.url, entity.boxSize, jump);
      ctx.restore();
  };

  let renderEntities = (array) => {
    if (array[0]===undefined) return;
    switch (array[0].type) {
      case 'pokeball':
        for (let i = 0; i < array.length; i++) {
          let entity = array[i];
          ctx.save();
          ctx.translate(entity.pos[0]+50, entity.pos[1]+50); // change origin
          ctx.rotate((-250 * entity.rotationRate * Math.PI/180) + entity.rotationPosition);
          ctx.translate(-50, -50);
          entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
          ctx.restore();
        }
        break;
      case 'pidgey':
        for (let i = 0; i < array.length; i++) {
          let entity = array[i];
          ctx.save();
          ctx.translate(entity.pos[0], entity.pos[1]); // change origin
          entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
          ctx.restore();
        }
        break;
      case 'berry':
        for (let i = 0; i < array.length; i++) {
          let entity = array[i];
          ctx.save();
          ctx.translate(entity.pos[0], entity.pos[1]); // change origin
          entity.sprite.render(ctx, entity.sprite.url, entity.boxSize);
          ctx.restore();
        }
        break;
      default:
    }
  };
