import Sprite from "./sprite.js";

let berries = [];
let berry = new Image();
berry.src = "assets/images/berry.png";

function createBerry(){
  let xOffset = Math.random() + 1200;
  return {
    type: 'berry',
    pos: [xOffset, 300],
    boxSize: [80, 92],
    sprite: new Sprite(berry, [0,0], [92, 105])};
}

function updateBerries(obstacles){
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].pos[0] -= 5;
    if (obstacles[i].pos[0] < -100){
      let index = obstacles.indexOf(obstacles[i]);
      obstacles.splice(index, 1);
    }
  }
}

export {createBerry, updateBerries, berries};
