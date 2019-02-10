import './index.scss';

import ThreeDeeRenderer from './ThreeDeeRenderer'
import planets from './planets.js'


const threeDR = new ThreeDeeRenderer();

planets.map((planet, index) => {
  threeDR.addGeometry(planet.radiusKm * 2, planet.color, planet.averageOrbitalDistance)
})
threeDR.render()


document.addEventListener("mousemove", function(e){
  const xPct = e.clientX / window.innerWidth;
  const yPct = e.clientY / window.innerHeight;
  threeDR.angleCamera(xPct, yPct * 3)
  threeDR.render()
})