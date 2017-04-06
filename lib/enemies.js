import Sprite from "./sprite.js";


let pokeball = new Image();
pokeball.src = "assets/images/pokeball.png";

function createPokeball(dt){
  let xOffset = Math.random() * 1000 + 1200;
  return { pos: [xOffset, 540],
    boxSize: [100, 100],
    sprite: new Sprite(pokeball, [0,0], [368, 368]),
    rotationRate: dt,
    rotationPosition: Math.random() * 360};
}


export {createPokeball};
