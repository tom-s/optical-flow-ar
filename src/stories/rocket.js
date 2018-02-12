import get from 'lodash/get'

class RocketApp {
  constructor(startingPos=1000, startingSpeed=0) {
    this.isMarkerShown = false
    this.domEls = {}
    this.startingPos = startingPos
    this.startingSpeed = startingSpeed
    this.restart()
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

  motion = (landing = false , dt=0.1) => {
    /*
    acceleration : acceleration of the rocket. Set to free fall acceleration
    dt: elapsed physical time between two frames. Set to 0.1 sec (ie: 60 times faster than reality if 60 fps)
    */
    this.position = this.position + dt * this.speed
    this.speed = this.speed + dt * this.acceleration

  if (this.position<0){
    this.restart()
  }
  if (landing){
    const boosterOn = this.position < this.startingPos*1/5
    this.Booster(boosterOn)
  }
  }

  restart(){
    this.position = this.startingPos
    this.speed = this.startingSpeed
    this.Booster()
  }

  Booster(boosterOn, power=6){
    const g = 9.8
    this.acceleration = boosterOn ? (power-1)*g : - g
  }

}

export default RocketApp