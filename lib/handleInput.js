import * as Pikachu from './pikachu';


let pika1 = new Audio('assets/audio/pika1.mp3');
let pika2 = new Audio('assets/audio/pika2.mp3');
let pika3 = new Audio('assets/audio/pika3.mp3');
let pika4 = new Audio('assets/audio/pika4.mp3');

let pikaNoises = [pika1, pika2, pika3, pika4];
pikaNoises.forEach(function(el){el.volume=1;});


function handleInput(dt) {
  let gravity = 0.2;

  if(window.input.isDown('UP') || window.input.isDown('w')) {
    if(!Pikachu.player.jumping){
       Pikachu.player.jumping = true;
       pikaNoises[Math.floor(Math.random() * 4)].play();
       Pikachu.player.velY = -250 * 2.2 * dt;
    }
  }
  if(window.input.isDown('LEFT') || window.input.isDown('a')) {
      Pikachu.player.pos[0] -= 400 * dt;
  }
  if(window.input.isDown('RIGHT') || window.input.isDown('d')) {
      Pikachu.player.pos[0] += 400 * dt;
  }
  Pikachu.player.velY += gravity;
  Pikachu.player.pos[1] += Pikachu.player.velY;
}

export {handleInput, pikaNoises};
