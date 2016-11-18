# Pikachu Racer

[Pikachu live][mh]
[mh]: https://musicianhub.herokuapp.com/#/

Pikachu Racer is a game coded using vanilla JavaScript and the Canvas API. Sprite and Entity architecture are used to render the images and detect collisions. Pikachu Racer is inspired by Super Mario and the Chrome Dinosaur game.

All Pokemon images and trademarks used in Pikachu Racer belong to the Pokemon Company.

![image of Songs Index](/docs/splash.png)

## Sprite and Entities.

An Entity is just a Plain Old JavaScript Object.

```javascript
let player = {
    pos: [0, 430],
    velY: 0,
    boxSize: [70, 50],
    jumping: false,
    sprite: new Sprite(pikachu, [0, 0], [280, 200])
};
```

A Sprite is an image that represents an Entity. As you can see the player Entity above has a sprite key.

I decided on using entities in order to animate images, such as jumping and moving.

![image of Songs Index](/docs/PikachuDemo.png)


## Game Loop

The game loop, simplified:

```javascript
function main() {
  let now = Date.now();
  let dt = (now - lastTime) / 1000.0;
  update(dt);
  render();
  requestAnimFrame(main);
}
```

On each iteration of the game loop, the update method is called to update every Sprite. "dt" is in milliseconds, and is the difference in time between the last iteration and the current iteration of the loop.

After update, render is invoked to show the changes for each Sprite.

requestAnimFrame is a variable I have defined:

```javascript
let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
```
requestAnimFrame's value will always be a function. RequestAnimationFrame tells the browser that an animation will be performed, and that the animation will need to be updated before performing the animation. RequestAnimationFrame requires a callback, which is why we pass it "main".

There are multiple RequestAnimationFrame conditions in order to present browser compatibility.

## Collision Detection

When two sprites collide, it's as if two rectangles were colliding.

```javascript

export const collision = (x,y,r,b,x2,y2,r2,b2) => {
  return !(r<= (x2+4) || x > (r2+4) || b<=(y2+25) || y>(b2-4));
};

export const boxCollision = (pos, size, pos2, size2) => {
  return collision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1],
                  pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
};
```

(x,y) represents the top left corner of the first rectangle. (r, b) represents the bottom right corner of the rectangle. If any of the conditions return true, that means there is a gap between the two rectangles, which means they aren't touching. Constants were added to account for Pikachu's non-rectangular shape.

## Future Project Plans

- Add animation when Pikachu runs, as well as sound effects.
- Add badges for Pikachu to collect, which will result in a score.
- Add levels for increasing difficulty.
- Add more difficulty with the incoming obstacles.
