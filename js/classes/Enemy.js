import { Particle } from "./Particle.js";

export class Enemy {
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

  giveXp(xp) {
    window.dispatchEvent(new CustomEvent('xp', { detail: xp }),)
  }

  die() {
    window.dispatchEvent(new Event('point'),)
  }
}

export function spawnEnemies({ ctx, enemiesArr, canvas }) {
  let timer = 2000
  setInterval(() => {
    if (timer > 500) {
      timer -= 2
    }
    const radius = Math.floor(Math.random() * (45 - 15) + 15);
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const neonColors = [
      "#ff6eff", // Neon pink
      "#ff83ff", // Neon purple
      "#00ff8c", // Neon green
      "#00fff5", // Neon blue
      "#fffd00", // Neon yellow
      "#ffbe0b", // Neon orange
      "#ff2c00", // Neon red
      "#c900ff", // Neon violet
      "#00ff8c", // Neon cyan
      "#ff00e7", // Neon magenta
    ];

    const color = neonColors[Math.floor(Math.random() * neonColors.length)];

    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x
    );

    const velocity = { x: Math.cos(angle) * .8, y: Math.sin(angle) * .8 };

    const enemy = new Enemy({ ctx, x, y, radius, color, velocity });
    enemiesArr.push(enemy);
  }, 800);
}

export const renderEnemies = ({ enemiesArr, projectiles, player }) => {
  enemiesArr.forEach((enemy, enemyIndex) => {
    enemy.draw()
    enemy.update()
    proyectileCollision({ projectiles, enemy, enemyIndex, enemiesArr })
    playerCollision({ player, enemy: { ...enemy, index: enemyIndex }, enemiesArr })
  });
}

const proyectileCollision = ({ projectiles, enemy, enemyIndex, enemiesArr }) => {
  projectiles.forEach((projectile, i) => {
    const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
    if (distance - enemy.radius - projectile.radius < 1) {
      projectiles.splice(i, 1)
      if (enemy.radius >= 15) {
        enemy.giveXp(10)
        enemy.radius -= 10
        return
      }
      deleteEnemy({ enemy, enemyIndex, enemiesArr, projectiles, projectile })
      projectiles.splice(i, 1)
      projectile.playerUpgrade()
    }
  })
}

const playerCollision = ({ player, enemy, enemiesArr }) => {
  const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
  if (distance - enemy.radius - player.radius < 1) {
    // alert("nooooo")
    player.radius -= 1
    enemiesArr.splice(enemy.index, 1)
  }
}

const deleteEnemy = ({ enemy, enemyIndex, projectiles, enemiesArr, projectile }) => {
  for (let i = 0; i < 8; i++) {
    projectiles.push(new Particle({ x: projectile.x, y: projectile.y, color: enemy.color, radius: 5, velocity: { x: (Math.random() - .5) * 2, y: (Math.random() - .5) * 2 }, ctx: enemy.ctx }))
  }
  enemy.giveXp(15)
  enemy.die()
  enemiesArr.splice(enemyIndex, 1)

}