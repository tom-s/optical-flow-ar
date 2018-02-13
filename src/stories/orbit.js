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

export const STEPS = {
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
      [MARKERS.EARTH]: { id: MARKERS.EARTH, visible: false },
      [MARKERS.CRASH]: { id: MARKERS.CRASH, visible: false },
      [MARKERS.GEO]: { id: MARKERS.GEO, visible: false },
      [MARKERS.ELLIPTIC]: { id: MARKERS.ELLIPTIC, visible: false },
      [MARKERS.SPACE]: { id: MARKERS.SPACE, visible: false }
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
    tick: () => ({}),
    getValue: () => ({})
  }))

  // Marker
  markerShow = id => {
    console.log("marker found",  id)
    this.markerIndex++
    this.markers[id].visible = true
    this.markers[id].index = this.markerIndex
    this.markers[id].id = id
    this.checkStep()
    this.ui.hide()
  }
  markerLost = id => {
    console.log("marker lost",  id)
    this.markers[id].visible = false
    if(Object.values(this.markers).filter(marker => marker.visible).length === 0) {
      this.ui.show()
    }
    this.checkStep()
  }

  checkStep = () => {
    let noStep = true
    if(Object.values(this.markers).filter(marker => marker.visible).length >= 2) {
      if(this.markers[MARKERS.EARTH].visible) {
        // Go to approriate step
        const nextStep = get(Object.values(this.markers).filter(marker => marker.id !== MARKERS.EARTH && marker.visible).sort((a, b) => a.index - b.index), [0, 'id'])
        if(nextStep) {
          noStep = false
          this.goToStep(nextStep)
        }
      }
    }
    if(noStep) {
      this.goToStep(STEPS.NONE)
    }
  }

  goToStep = (step) => {
    this.currentStep = step // update current step
    console.log("go to step", this.currentStep)
    // Switch
    if(step === STEPS.NONE) {
      this.animations = {} // reset
    }
    if(step === MARKERS.CRASH) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({
          m:20,
          startTime:-150,
          endTime:-10,
          e :0.9,
          a:75
        })
      }
    }
    if(step === MARKERS.GEO) {
      // Start animating
      this.animations[step] = {
        'orbit': new OrbitAnimation({
          e: 0
        })
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
        'orbit': new OrbitAnimation({
          e:0.9,
          a:300,
          m:10,
          endTime: 10000
        })
      }
    }
  }
}

export default RocketApp