import { reduceOpacity } from "../utils.js";

export class Particle {
  constructor({ ctx, x, y, radius, color, velocity }) {
    this.x = x;
    this.y = y;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.radius = radius;
    this.color = color;
    this.ctx = ctx
    this.opacity = 100
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
    this.velocity.x = this.velocity.x * 0.99
    this.velocity.y = this.velocity.y * 0.99
    this.color = reduceOpacity(this.color)
    this.opacity -= 1
  }


}


export const renderParticles = ({ particles }) => {
  particles.forEach((particle, index) => {
    particle.draw()
    particle.update()
    if (particle.opacity <= 0) particles.splice(index, 1)

    // proyectileCollision({ projectiles, enemy: particle, enemyIndex, enemiesArr, particles })
    // playerCollision({ player, enemy: { ...particle, index: enemyIndex }, enemiesArr })
  });
}