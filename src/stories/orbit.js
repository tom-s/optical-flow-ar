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
      [STEPS.NONE]: null,
      [MARKERS.EARTH]: null,
      [MARKERS.GEO]: null,
      [MARKERS.ELLIPTIC]: null,
      [MARKERS.SPACE]: null
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
    this.ui.init({})
  }

  /* Public */
  // Getters
  isMarkerShown = id => get(this.markers, [id]['visible'])
  getCurrentStep = () => this.currentStep
  getAnimation = id => get(this.animations, [this.currentStep, id], ({
    tick: () => ({})
  }))

  // Marker
  markerShow = id => {
    this.markers[id].visible = true
    this.checkStep()
  }
  markerLost = id => {
    this.markers[id].visible = true
    this.checkStep()
  }

  checkStep = () => {
    if(Object.values(this.markers).filter(marker => marker.visible).length === 2) {
      if(this.markers[MARKERS.EARTH].visible) {
        // Go to approriate step
        const nextStep = get(Object.keys(this.markers).filter(id => id !== MARKERS.EARTH), 0)
        console.log("nextStep", nextStep)
        if(nextStep) this.goToStep(nextStep)
      }
    }
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