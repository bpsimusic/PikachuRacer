import * as Pikachu from './pikachu.js';



function handleInput(dt) {
  let gravity = 0.2;
  if(window.input.isDown('UP') || window.input.isDown('w')) {
    if(!Pikachu.player.jumping){
       Pikachu.player.jumping = true;
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

export {handleInput};
