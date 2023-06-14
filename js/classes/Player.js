export class Player {
  constructor({ ctx, x, y, radius, color }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.dmg = 10;
    this.bulletSize = 5;
    this.xp = 0;
    this.lvl = 1;
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
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  increaseRange(val) {
    if (this.range > 15) return
    this.range += val
  }

  upgrade() {
    this.dmg += .5
    if (this.bulletSize > 15) return

    this.bulletSize += .5
  }

  gainXp(xp) {
    this.xp += xp
    if (this.xp > this.lvl * 100 / 2) this.lvlUp()
  }

  lvlUp() {
    console.log(`lvl up ${this.lvl}`)
    this.lvl += 1;
    this.dmg += 2;
    this.xp = 0;
    this.increaseRange(1)
  }

}
