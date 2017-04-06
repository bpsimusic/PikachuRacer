import Sprite from "./sprite.js";

let pokeballs = [];
let pokeball = new Image();
pokeball.src = "assets/images/pokeball.png";

function createPokeball(dt){
  let xOffset = Math.random() * 1000 + 1200;
  return {
    type: 'pokeball',
    pos: [xOffset, 540],
    boxSize: [100, 100],
    sprite: new Sprite(pokeball, [0,0], [368, 368]),
    rotationRate: dt,
    rotationPosition: Math.random() * 360};
}

function updatePokeballs(obstacles, dt){
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].pos[0] -= 5;
    obstacles[i].rotationRate += dt;
    if (obstacles[i].pos[0] < -100){
      let index = obstacles.indexOf(obstacles[i]);
      obstacles.splice(index, 1);
    }
  }
}


export {createPokeball, updatePokeballs, pokeballs};
