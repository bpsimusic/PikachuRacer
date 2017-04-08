import Sprite from "./sprite.js";
import {berries} from "./berries";

let pokeballs = [];
let pokeball = new Image();
pokeball.src = "assets/images/pokeball.png";

function createPokeball(dt){
  let xOffset = Math.random() * 1000 + 1200;//range: 1200 - 2200


  let overlapPokeballs= pokeballs.filter(function(el){
    let upperBoundPokeball = el.pos[0] + 100;
    let lowerBoundPokeball = el.pos[0] - 100;
    return (lowerBoundPokeball <= xOffset && xOffset <= upperBoundPokeball);
  });

  if (overlapPokeballs.length > 0){
    return null;
  }

  let overlapBerries = berries.filter(function(el){
    let upperBound = el.pos[0] + 80;
    let lowerBound = el.pos[0] - 80;
    return (lowerBound <= xOffset && xOffset <= upperBound);
  });

  if (overlapBerries.length > 0){
    return null;
  }
  let speed = [5, 6, 7, 8];
  speed = speed[Math.floor(Math.random()* 4)];

  return {
    type: 'pokeball',
    pos: [xOffset, 540],
    boxSize: [100, 100],
    sprite: new Sprite(pokeball, [0,0], [368, 368]),
    speed,
    rotationRate: dt,
    rotationPosition: Math.random() * 360};
}

function updatePokeballs(obstacles, dt){
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].pos[0] -= obstacles[i].speed;
    obstacles[i].rotationRate += dt;
    if (obstacles[i].pos[0] < -100){
      let index = obstacles.indexOf(obstacles[i]);
      obstacles.splice(index, 1);
    }
  }
}


export {createPokeball, updatePokeballs, pokeballs};
