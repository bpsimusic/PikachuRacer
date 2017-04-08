import Sprite from "./sprite";
import {pokeballs} from "./enemies";



let berries = [];
let berry = new Image();
berry.src = "assets/images/berry.png";

function createBerry(){
  let xOffset = Math.random() * 1000 + 1200; //range: 1200 - 2200
  let yOffset = Math.random() * 258 + 300;
  window.pokeballs = pokeballs;
  window.berries = berries;
//if any of the xOffsets of the new berry is within any of the pokeballs x position,
//pick a new xOffset. A Pokeball is 100 by 100.
  let overlapPokeballs= pokeballs.filter(function(el){
    let upperBoundPokeball = el.pos[0] + 100;
    let lowerBoundPokeball = el.pos[0] - 100;
    return (lowerBoundPokeball <= xOffset && xOffset <= upperBoundPokeball);
  });

  if (overlapPokeballs.length > 0){
    return null;
  }
  //if any of the x positions of previous berries are within xOffset,
  //pick a new xOffset.
  let overlapBerries = berries.filter(function(el){
    let upperBound = el.pos[0] + 80;
    let lowerBound = el.pos[0] - 80;
    return (lowerBound <= xOffset && xOffset <= upperBound);
  });


  if (overlapBerries.length > 0){
    return null;
  }

  return {
    type: 'berry',
    pos: [xOffset, yOffset],
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
