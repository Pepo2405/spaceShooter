const lvlLabel = document.querySelector('#lvlLabel')
export const updateLvlLabel = (lvl) => {
  lvlLabel.innerHTML = lvl
}

const lvlMeter = document.querySelector('#lvl_id')
export const updateLvlMeter = ({ total, xp }) => {
  console.log("expe", xp / 100)
  lvlMeter.value = xp / total
}
let points = 0
const pointsLabel = document.querySelector('#pointsLabel')
export const updatePoints = () => {
  console.log("sexooooo")
  points += 5
  pointsLabel.innerHTML = points
}