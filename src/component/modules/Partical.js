export default class Partical {
  clock = 0;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  gravity = 0;
  friction = 1;

  constructor(options) {
    Object.assign(this, options);
  }

  update() {
    this.clock += 1;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }
}