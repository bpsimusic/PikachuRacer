# Pikachu Racer


### Background

Pikachu Racer is a side-scrolling game inspired by Mario and the Chrome Dinosaur game. Keep Pikachu running without running into obstacles for one-minute to win the game!


### Functionality and MVP
Users will be able to play the game by moving a character sprite left and right using the arrow keys, and jump using the space bar.

Users can pause the game by clicking the game screen and toggle the music.

### Architecture and Technologies

I will be using Canvas as a viewport to display a small portion of a larger image (the entire game).

I will manipulate objects such as the Pikachu sprite within Canvas using the DOM and Vanilla Javascript; I will be using JQuery for collisions.

Webpack will be used to bundle the required scripts:

**Pikachu.js:** The main player.

**Projectile.js:** Any projectile. These will be randomly generated.

**Object.js:** Any object within the screen. There 'x' and 'y' attributes for each object, as well as a velocity. This will contain a method called "collided".

**Game.js:** The script that contains all objects, including the background image. It holds the logic for the win condition as well as the time.


### Wireframes

There will be a box on the browser that serves as the game screen.
On the top left of the screen are simple directions for the game controls.
You can toggle the music on the top right. Below the screen will be a
short bio/about on the game. The left sidebar will have my Github/LinkedIn.

As soon as you open the game in the browser, it should be clear to users that
they click on the screen to start the game. The interface should be clear
and simple.

![wireframes](/docs/wireframes/screen.png)


### Implementation Timeline

**Day One:**
Get setup. Research Technologies, especially Canvas, and
get started on the moving background.

**Day Two:**
Get started on Pikachu player sprite, and have controls for moving left, right, and jump implemented. By the end of Day Two have a working sprite and moving background finished.

**Day Three:**

Research collision.

Have random projectiles enter the screen from the right. When Pikachu player sprite collides with a projectile, the player loses. Make sure the game is not impossible to win when the projectiles enter: the projectiles should have some space between them.  



**Day Four:**
Implement a win condition. When the Pikachu player sprite has traveled some distance OR played for a certain amount of time, the player wins. Debug minor problems. By the end of Day 4 the game should be finished.

**Bonus:**
- Have items that boost the Pikachu player sprite.
- Add music (Pokemon theme music).
