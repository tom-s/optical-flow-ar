import get from 'lodash/get'
import Ui from './ui'

export const STEPS = {
  DEFAULT: 'default',
  TAKE_OFF: 'takeoff',
  BOOSTER_FALL: 'boosterfall'
}

class RocketApp {
  constructor() {
    this.ui = new Ui()
    this.domEls = {}

    // Marker display
    this.isMarkerShown = false

    // Vectors display
    this.showSpeed = false
    this.showForce = false

    // App state
    this.currentStep = STEPS.TAKE_OFF
  }
  init = () => {
    this.ui.init({
      onClickSpeed: () => {
        this.showSpeed = !this.showSpeed
      },
      onClickForce: () => {
        this.showForce = !this.showForce
      }
    })
  }

  /* Public */
  // Getters
  getMarkerShown = () => this.isMarkerShown
  getSpeedDisplay = () => this.showForce
  getForceDisplay = () => this.showSpeed
  getCurrentStep = () => this.currentStep

  // Marker
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.ui.toggle()
  }

  // App state
  stepFinished = step => {
    // Go to next step
    if(step === STEPS.TAKE_OFF) {
      this.currentStep = STEPS.BOOSTER_FALL
    }
  }


  /* DOM manipulation
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id) */
}

export default RocketApp