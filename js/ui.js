const lvlLabel = document.querySelector('#lvlLabel')
export const updateLvlLabel = (lvl) => {
  lvlLabel.innerHTML = lvl
}

const lvlMeter = document.querySelector('#lvl_id')
export const updateLvlMeter = ({ total, xp }) => {
  console.log(lvlMeter)
  console.log(lvlMeter.width)
  lvlMeter.style = [`width:${xp / total * 100}%;`]
}
let points = 0
const pointsLabel = document.querySelector('#pointsLabel')
export const updatePoints = () => {
  points += 5
  pointsLabel.innerHTML = points
}