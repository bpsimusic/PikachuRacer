import Sprite from "./sprite.js";


let pikachu = new Image();
pikachu.src = "assets/images/pikachuspritesheet.png";

let player = {
    pos: [0, 507],
    velY: 0,
    boxSize: [200, 143],
    jumping: false,
    sprite: new Sprite(pikachu, [0, 0], [450, 321], 10, [0,1,2,3])
};


export {player};
