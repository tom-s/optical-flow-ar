import get from 'lodash/get'
import Ui from './ui'

const TEXT_SHOW_DURATION = 5000

export const STEPS = {
  NONE: 'none',
}

class RocketApp {
  constructor() {
    this.ui = new Ui()

    // Animations
    this.animations = {
      [STEPS.NONE]: null
    }

    // Marker display
    this.isMarkerShown = false

    // App state
    this.currentStep = STEPS.NONE
  }
  init = () => {
    this.ui.init()
  }

  /* Public */
  // Getters
  getMarkerShown = () => this.isMarkerShown
  getCurrentStep = () => this.currentStep
  getAnimation = id => get(this.animations, [this.currentStep, id], ({
    tick: () => ({}),
    getValue: () => ({})
  }))

  // Marker
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.ui.toggle()
    this.goToStep(STEPS.NONE)
  }

  goToStep = (step) => {
    this.currentStep = step // update current step
    console.log("go to step", this.currentStep)
    // Switch
    if(step === STEPS.NONE) {
      this.animatons = {} // reset
    }
  }
}

export default RocketApp