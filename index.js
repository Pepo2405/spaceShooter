import { updateLvlLabel, updateLvlMeter, updatePoints } from './js/ui.js'
import { Player } from './js/classes/Player.js'
import { Proyectile } from './js/classes/Proyectile.js'
import { renderEnemies, spawnEnemies } from './js/classes/Enemy.js'
import { renderParticles } from './js/classes/Particle.js'


const MOVEMENT_SPEED = 3

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}


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

let animationid;

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()
  animationid = requestAnimationFrame(animate)
  renderProyectiles()
  renderEnemies({ enemiesArr, projectiles, player, particles })
  renderParticles({ particles })

}

function startGame() {
  animate()
  spawnEnemies({ ctx, enemiesArr, canvas, player })
}

startGame()


// Shoot the laser!
setInterval(() => {
  if (keys.w.pressed) {
    player.y -= MOVEMENT_SPEED
    if (player.y + player.radius < 0) player.y = canvas.height - player.radius
  }
  if (keys.s.pressed) {
    player.y += MOVEMENT_SPEED
    if (player.y + player.radius > canvas.height) player.y = 0 - player.radius

  }
  if (keys.a.pressed) {
    player.x -= MOVEMENT_SPEED
    if (player.x + player.radius < 0) player.x = canvas.width + player.radius
  }
  if (keys.d.pressed) {
    player.x += MOVEMENT_SPEED
    if (player.x - player.radius > canvas.width) player.x = 0 - player.radius
  }
}, 15)









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

  var sound = new Howl({
    src: ['./sounds/sound.mp3'],
    volume: 0.04,

  });

  sound.play();

  const createBullet = () => {
    const angle = Math.atan2(
      e.clientX - player.x,
      e.clientY - player.y
    )
    const velocity = { x: Math.sin(angle) * 4, y: Math.cos(angle) * 4 }
    const proyectile = new Proyectile({ ctx, x: player.x, y: player.y, dmg: player.dmg, radius: player.bulletSize, color: 'black', velocity })
    return proyectile
  }
  projectiles.push(createBullet())
  let count = 0
  const id = setInterval(() => {
    const bullet = createBullet()
    projectiles.push(bullet)
    count++
    if (count >= Math.floor(player.lvl / 5)) clearInterval(id)
  }, 50)

})



window.addEventListener('point', updatePoints)

window.addEventListener('resize', function (event) {
  canvas.width = this.innerWidth
  canvas.height = this.innerHeight
  player.x = this.innerWidth / 2
  player.y = this.innerHeight / 2
}, true);

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      return
    case 'a':
      keys.a.pressed = true
      return
    case 's':
      keys.s.pressed = true
      return
    case 'd':
      keys.d.pressed = true
      return
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      return
    case 'a':
      keys.a.pressed = false
      return
    case 's':
      keys.s.pressed = false
      return
    case 'd':
      keys.d.pressed = false
      return
  }
})

let paused = false;

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') { // Barra espaciadora
    paused = !paused;
    if (paused) {
      cancelAnimationFrame(animationid); // Pausar la animación del juego
    } else {
      animate(); // Reanudar la animación del juego
    }
  } else if (e.key === 'Escape') {
    paused = true;
    cancelAnimationFrame(animationid); // Pausar la animación del juego
  }
});