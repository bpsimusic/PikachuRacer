import * as Pikachu from './pikachu.js';

let canvas;
document.addEventListener('DOMContentLoaded', function(){
  canvas = document.getElementById("canvas");
});

function boundaryCheck(){
  if (Pikachu.player.pos[0] < 0 && Pikachu.player.pos[1] >= (canvas.height - 143)){
    Pikachu.player.pos[0]=0;
    Pikachu.player.jumping = false;
    Pikachu.player.pos[1] = (canvas.height - 143);
  } else if (Pikachu.player.pos[0] < 0 && Pikachu.player.pos[1] < (canvas.height - 143)){
    Pikachu.player.pos[0]=0;
  } else if (Pikachu.player.pos[0] >(canvas.width - 200) && Pikachu.player.pos[1] >= (canvas.height - 143)){
    Pikachu.player.pos[0] = (canvas.width - 200);
    Pikachu.player.jumping = false;
    Pikachu.player.pos[1] = (canvas.height - 143);
  } else if (Pikachu.player.pos[0] >(canvas.width - 200) && Pikachu.player.pos[1] < (canvas.height - 143)){
    Pikachu.player.pos[0] = (canvas.width - 200);
  } else if (Pikachu.player.pos[1] >= (canvas.height - 143)){
    Pikachu.player.jumping = false;
    Pikachu.player.pos[1] = (canvas.height - 143);
  }
}

export {boundaryCheck};
