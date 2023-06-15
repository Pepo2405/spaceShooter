import { updateLvlLabel, updateLvlMeter, updatePoints } from './js/ui.js'
import { Player } from './js/classes/Player.js'
import { Proyectile } from './js/classes/Proyectile.js'
import { renderEnemies, spawnEnemies } from './js/classes/Enemy.js'
import { renderParticles } from './js/classes/Particle.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')



const projectiles = []
const enemiesArr = []
const particles = []


const renderProyectiles = () => {
  projectiles.forEach((projectile, index) => {
    projectile.draw()
    projectile.update()
    if (projectile.x - projectile.radius < 0) projectiles.splice(index, 1)
    if (projectile.y - projectile.radius < 0) projectiles.splice(index, 1)
    if (projectile.x - projectile.radius > canvas.width) projectiles.splice(index, 1)
    if (projectile.y - projectile.radius > canvas.height) projectiles.splice(index, 1)
  })
}
const player = new Player({ ctx, x: canvas.width / 2, y: canvas.height / 2, radius: 30, color: 'red' })



function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()
  requestAnimationFrame(animate)
  renderProyectiles()
  renderEnemies({ enemiesArr, projectiles, player, particles })
  renderParticles({ particles })

}
animate()
spawnEnemies({ ctx, enemiesArr, canvas, })

window.addEventListener('xp', (xp) => {
  player.gainXp(xp.detail)
  updateLvlLabel(player.lvl)
  updateLvlMeter({ xp: player.xp, total: player.lvl * 100 / 2 })
  // if (this.xp > this.lvl * 100 / 2) this.lvlUp()

})

window.addEventListener('playerUpgrade', () => {
  player.upgrade()
})

window.addEventListener('click', (e) => {
  const createBullet = () => {
    const angle = Math.atan2(
      e.clientX - canvas.width / 2,
      e.clientY - canvas.height / 2
    )
    const velocity = { x: Math.sin(angle) * 4, y: Math.cos(angle) * 4 }
    const proyectile = new Proyectile({ ctx, x: innerWidth / 2, y: innerHeight / 2, dmg: player.dmg, radius: player.bulletSize, color: 'black', velocity })
    return proyectile
  }

  projectiles.push(createBullet())
  setTimeout(() => {
    for (let i = 0; i < Math.floor(player.lvl / 5); i++) {
      projectiles.push(createBullet())
    }
  }, 50)
})

window.addEventListener('point', updatePoints)

window.addEventListener('resize', function (event) {
  canvas.width = this.innerWidth
  canvas.height = this.innerHeight
  player.x = this.innerWidth / 2
  player.y = this.innerHeight / 2
}, true);