import Sprite from "./sprite.js";

let pidgeys=[];

let pidgey = new Image();
pidgey.src = "assets/images/pidgeyspritesheet.png";

function createPidgey(){
  let xOffset = Math.random() * 1000 + 1200;//range: 1200 - 2200
  let oscillatePhase = Math.random() * 10;
  return {
    type: 'pidgey',
    pos: [xOffset, 220],
    boxSize: [100, 91],
    oscillatePhase,
    sprite: new Sprite(pidgey, [0, 0], [63, 57], 10, [0,1,2,3,4])};
}

function updatePidgeys(obstacles, dt){
  for (let i = 0; i < obstacles.length; i++) {
    let bird = obstacles[i];
    bird.sprite.update(dt);
    bird.oscillatePhase += dt;
    bird.pos[0] -= 5;
    bird.pos[1] += 3 * Math.sin(2 * bird.oscillatePhase);
    if (bird.pos[0] < -100){
      let index = obstacles.indexOf(bird);
      obstacles.splice(index, 1);
    }
  }
}


export {createPidgey, updatePidgeys, pidgeys};
