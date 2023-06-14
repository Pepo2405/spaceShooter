export class Particle {
  constructor({ ctx, x, y, radius, color, velocity }) {
    this.x = x;
    this.y = y;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.radius = radius;
    this.color = color;
    this.ctx = ctx
  }
  draw() {
    this.ctx.beginPath()
    this.ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }


}