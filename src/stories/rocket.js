import get from 'lodash/get'
import Ui from './ui'

class RocketApp {


  constructor(startingPos=1000, startingSpeed=0) {
    this.ui = new Ui()
    this.domEls = {}
    this.startingPos = startingPos
    this.startingSpeed = startingSpeed
    this.restart()

    // Marker display
    this.isMarkerShown = false

    // Vectors display
    this.showSpeed = false
    this.showForce = false
  }
  init = () => {
    this.ui.init({
      onClickSpeed: this._toggleSpeedDisplay,
      onClickForce: this._toggleForceDisplay
    })
  }
  /* Screen Filters */
  _toggleSpeedDisplay = () => {
    this.showSpeed = !this.showSpeed
  }
  _toggleForceDisplay = () => {
    this.showForce = !this.showForce
  }

  /* Public */
  getMarkerShown = () => this.isMarkerShown
  getSpeedDisplay = () => this.showForce
  getForceDisplay = () => this.showSpeed
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.ui.toggle()
  }


  /* DOM manipulation
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id)*/

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