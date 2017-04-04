import Sprite from "./sprite";
import * as Collision from "./collision";
import * as Input from "./input";

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


//disable up/down scrolling
window.addEventListener("keydown", function(e){
  if([32,37,38,39,40].indexOf(e.keyCode) > -1){
    e.preventDefault();
  }
});

//render the background image
document.addEventListener("DOMContentLoaded", function(){
    let paused = false;
    let win = 0;
    let song = document.getElementById("theme-song");
    let mute = document.createElement("div");
    mute.className = "fa fa-volume-up";
    mute.addEventListener("click", function(){
      song.muted = !song.muted;
      mute.className == "fa fa-volume-up" ? mute.className = "fa fa-volume-off" : mute.className = "fa fa-volume-up"
    });

    document.getElementById("instructions").appendChild(mute);
    let scrollImg = new Image();
    let scrollVal = 0;

    let speed = 0.19;
    scrollImg.src = "assets/background.jpg";
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

    let pikachu = new Image();
    pikachu.src = "assets/pikachuspritesheet.png";

    let winMessage = new Image();
    winMessage.src = "assets/winmessage.png";

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 650;
canvas.className = "player-canvas";
document.getElementById("game-area").appendChild(canvas);

//create the clear-screen
let clear = document.createElement("div");
clear.id = "clear";
document.getElementById("game-area").appendChild(clear);
clear.addEventListener("click", function(){
  this.style.display='none';
  init();
})

let line0 = document.createElement("div");
line0.className = "flex";
line0.id = "click-to-play"
let clearMessage = document.createElement("p");
clearMessage.innerHTML = "Click to Play";
line0.appendChild(clearMessage);
document.getElementById("clear").appendChild(line0);


let clearImageArrows = document.createElement("img");
clearImageArrows.src = "assets/arrows.jpg";
clearImageArrows.id = "arrows";
let line1 = document.createElement("div");
line1.className = "flex";
line1.appendChild(clearImageArrows);
let outerDiv = document.createElement("div");
let move = document.createElement("span");
move.innerHTML = "Move";
move.id = "move-message";
let clearImagePikachu = document.createElement("img");
clearImagePikachu.src = "assets/pikachu.png";
clearImagePikachu.id = "pikachu";
outerDiv.appendChild(move);
outerDiv.appendChild(clearImagePikachu);
line1.appendChild(outerDiv);
document.getElementById("clear").appendChild(line1);


let line2 = document.createElement("div");
line2.className = "flex";
let outerDiv2 = document.createElement("div");
let clearImagePokeball = document.createElement("img");
clearImagePokeball.src = "assets/pokeball.png";
clearImagePokeball.id = "pokeball";
let avoid = document.createElement("span");
avoid.innerHTML = "Avoid";
avoid.id = "avoid-message";
outerDiv2.appendChild(avoid);
outerDiv2.appendChild(clearImagePokeball);
line2.appendChild(outerDiv2);
document.getElementById("clear").appendChild(line2);



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
    ctx.font="40px Montserrat, sans-serif";
    ctx.fillText("You Lose",260,200);
  } else {
    ctx.drawImage(winMessage, 0,0, 628, 326, 150, 100, 400, 200 );
    ctx.font="40px Montserrat, sans-serif";
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
    pos: [0, 507],
    velY: 0,
    boxSize: [200, 143],
    jumping: false,
    sprite: new Sprite(pikachu, [0, 0], [450, 321], 10, [0,1,2,3])
};

//Speed in pixels per second
let playerSpeed = 250;
let gravity = 0.2;
let enemies = [];

//the main update function. Called every frame.
  function update(dt) {
      handleInput(dt);
      updateEntities(dt);
      boundaryCheck();
  }

  //handles the input from the player
  function handleInput(dt) {

    if(window.input.isDown('UP') || window.input.isDown('w')) {

      if(!player.jumping){
         player.jumping = true;
         player.velY = -250 * 2.2 * dt;
      }
    }

    if(window.input.isDown('LEFT') || window.input.isDown('a')) {
        player.pos[0] -= 400 * dt;

    }

    if(window.input.isDown('RIGHT') || window.input.isDown('d')) {
        player.pos[0] += 400 * dt;
    }
    player.velY += gravity;
    player.pos[1] += player.velY;
  }

  //boundaries
function boundaryCheck(){
  if (player.pos[0] < 0 && player.pos[1] >= (canvas.height - 143)){
    player.pos[0]=0;
    player.jumping = false;
    player.pos[1] = (canvas.height - 143);
  } else if (player.pos[0] < 0 && player.pos[1] < (canvas.height - 143)){
    player.pos[0]=0;
  } else if (player.pos[0] >(canvas.width - 200) && player.pos[1] >= (canvas.height - 143)){
    player.pos[0] = (canvas.width - 200);
    player.jumping = false;
    player.pos[1] = (canvas.height - 143);
  } else if (player.pos[0] >(canvas.width - 200) && player.pos[1] < (canvas.height - 143)){
    player.pos[0] = (canvas.width - 200);
  } else if (player.pos[1] >= (canvas.height - 143)){
    player.jumping = false;
    player.pos[1] = (canvas.height - 143);
  }
}


  function createPokeball(){
    let xOffset = Math.random() * 1000 + 1200;
    return { pos: [xOffset, 540],
      boxSize: [140, 140],
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

  function updateEnemies(obstacles, dt){
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
    ctx.drawImage(scrollImg, scrollVal, 0, 900, 1000, 0,0,canvas.width, canvas.height);
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
      renderEntity(array[i]);
    }
  };
});
