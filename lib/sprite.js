
class Sprite {
  //only url, pos, size are required.
  constructor(url, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
  }

  update (dt) {
      this._index += this.speed*dt;
  }

  //render actually renders the animation logic for the Sprite.
  render (ctx, url, boxSize, jump) {
      let frame;

      if(this.speed > 0) {
          let max = this.frames.length;
          let idx = Math.floor(this._index);
            //frame is a number
          frame = jump ? 2 : this.frames[idx % max] ;
          if(this.once && idx >= max) {
              this.done = true;
              return;
          }
      }
      else {
          frame = 0;
      }

      //x and y are the starting position of the spritemap
      let x = this.pos[0];
      let y = this.pos[1];

      //frame is from (0-3)
      if(this.dir == 'vertical') {
          y += frame * this.size[1];
      }
      else {
          x += frame * this.size[0];
      }
      //x and y tell you which frame to start drawing from.
      ctx.drawImage(url,
                    x, y,
                    this.size[0], this.size[1],
                    0, 0,
                    boxSize[0], boxSize[1]);
      //  ctx.strokeRect(0, 0, boxSize[0], boxSize[1]);
  }
}

export default Sprite;
