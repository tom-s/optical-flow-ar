import get from 'lodash/get'
import Ui from './ui'

const TEXT_SHOW_DURATION = 5000

export const MARKERS = {
  EARTH: 'earth',
  CRASH: 'crash',
  GEO: 'geo',
  ELLIPTIC: 'elliptic',
  SPACE: 'space'
}
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
    this.markers = {
      [MARKERS.EARTH]: { visible: false },
      [MARKERS.CRASH]: { visible: false },
      [MARKERS.GEO]: { visible: false },
      [MARKERS.ELLIPTIC]: { visible: false },
      [MARKERS.SPACE]: { visible: false }
    }

    // App state
    this.currentStep = STEPS.NONE
  }
  init = () => {
    this.ui.init()
  }

  /* Public */
  // Getters
  isMarkerShown = id => get(this.markers, [id]['visible'])
  getCurrentStep = () => this.currentStep
  getAnimation = id => get(this.animations, [this.currentStep, id], ({
    tick: () => ({}),
    getValue: () => ({})
  }))

  // Marker
  markerShow = id => {
    this.markers[id].visible = true
    //this.ui.toggle()
  }
  markerLost = id => {
    this.markers[id].visible = true
    //this.ui.toggle()
    //this.goToStep(STEPS.NONE)
  }

  goToStep = (step) => {
    this.currentStep = step // update current step
    console.log("go to step", this.currentStep)
    // Switch
    if(step === STEPS.NONE) {
      this.animations = {} // reset
    }
  }
}

export default RocketApp