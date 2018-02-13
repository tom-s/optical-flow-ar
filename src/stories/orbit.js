import get from 'lodash/get'
import Ui from './ui'
import OrbitAnimation from './animation/orbit'

const TEXT_SHOW_DURATION = 5000

export const MARKERS = {
  EARTH: 'earth',
  CRASH: 'crash',
  GEO: 'geo',
  ELLIPTIC: 'elliptic',
  SPACE: 'space'
}

const STEPS = {
  NONE: 'none',
  ...MARKERS
}

class RocketApp {
  constructor() {
    this.ui = new Ui()
    this.markerIndex = 0

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
    this.markerIndex++
    this.markers[id].visible = true
    this.markers[id].index = this.markerIndex
    this.markers[id].id = id
    this.ui.toggle()
    this.checkStep()
  }
  markerLost = id => {
    this.markers[id].visible = true
    this.checkStep()
  }

  checkStep = () => {
    console.log("visible", this.markers)
    if(Object.values(this.markers).filter(marker => marker.visible).length >= 2) {
      console.log("debug1")
      if(this.markers[MARKERS.EARTH].visible) {
        console.log("debug2", Object.values(this.markers).filter(marker => marker.id !== MARKERS.EARTH && marker.visible).sort((a, b) => a.index - b.index))
        // Go to approriate step
        const nextStep = get(Object.values(this.markers).filter(marker => marker.id !== MARKERS.EARTH && marker.visible).sort((a, b) => a.index - b.index), [0, 'id'])
        console.log("nextStep", nextStep)
        if(nextStep) this.goToStep(nextStep)
      }
    }
  }

  goToStep = (step) => {
    this.currentStep = step // update current step
    console.log("go to step", this.currentStep)
    // Switch
    if(step === MARKERS.NONE) {
      this.animations = {} // reset
    }
    if(step === MARKERS.CRASH) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({})
      }
    }
    if(step === MARKERS.GEO) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({})
      }
    }
    if(step === MARKERS.ELLIPTIC) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({})
      }
    }
    if(step === MARKERS.SPACE) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({})
      }
    }
  }
}

export default RocketApp