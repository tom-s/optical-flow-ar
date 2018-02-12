import get from 'lodash/get'

class RocketApp {
  constructor(startingPos=1000, startingSpeed=0) {
    this.isMarkerShown = false
    this.domEls = {}
    this.position = startingPos
    this.speed = startingSpeed
  }
  /* Marker */
  getMarkerShown = () => this.isMarkerShown
  markerShow = () => {
    this.isMarkerShown = true
  }
  markerLost = () => {
    this.isMarkerShown = false
  }
  /* DOM manipulation */
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id)

  motion = (acceleration = -9.8, dt=0.1) => {
    /*
    acceleration : acceleration of the rocket. Set to free fall acceleration
    dt: elapsed physical time between two frames. Set to 1 sec (ie: 60 times faster than reality if 60 fps)
    */
    this.position = this.position + dt * this.speed
    this.speed = this.speed + dt * acceleration
  }
}

export default RocketApp