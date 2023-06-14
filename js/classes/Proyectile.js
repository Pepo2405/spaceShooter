
export class Proyectile {
  constructor({ ctx, x, y, radius, color, velocity, dmg }) {
    this.x = x;
    this.y = y;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.dmg = dmg;
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
    this.ctx.fillStyle = 'rgba(255,255,255,.2)'
    this.ctx.fill()

  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  playerUpgrade() {
    window.dispatchEvent(new Event("playerUpgrade"));
  }



}


