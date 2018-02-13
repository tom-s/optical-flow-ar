import get from 'lodash/get'
import Ui from './ui'
import AnimationTakeOff from './animation/takeoff'
import AnimationBoosterFall from './animation/fall'

const TEXT_SHOW_DURATION = 5000

export const STEPS = {
  NONE: 'none',
  TAKE_OFF: 'takeoff',
  TAKE_OFF_END: 'takeoffEnd',
  BOOSTER_FALL: 'boosterFall',
  BOOSTER_LANDING: 'boosterLanding'
}

class RocketApp {
  constructor(startingPos=1000, startingSpeed=0) {
    this.ui = new Ui()
    this.domEls = {}
    this.startingPos = startingPos
    this.startingSpeed = startingSpeed

    // Animations
    this.animations = {
      [STEPS.NONE]: null,
      [STEPS.TAKE_OFF]: null,
      [STEPS.TAKE_OFF_END]: null,
      [STEPS.BOOSTER_FALL]: null
    }

    // Marker display
    this.isMarkerShown = false

    // Vectors display
    this.showSpeed = false
    this.showForce = false

    // App state
    this.currentStep = STEPS.NONE
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
  getAnimation = id => get(this.animations, [this.currentStep, id], ({
    tick: () => ({}),
    getValue: () => ({})
  }))

  // Marker
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
    this.goToStep(STEPS.TAKE_OFF)
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
      this.animations = {} // reset
    }
    if(step === STEPS.TAKE_OFF) {
      // Start animating
      this.animations[step] = {
        'takeOff': new AnimationTakeOff({
          onAnimationEnd: () => {
            this.goToStep(STEPS.TAKE_OFF_END)
          }
        })
      }
    }
    if(step === STEPS.TAKE_OFF_END) {
      // Trigger timeout
      window.setTimeout(() => {
        this.goToStep(STEPS.BOOSTER_FALL)
      }, TEXT_SHOW_DURATION)
    }
    if(step === STEPS.BOOSTER_FALL) {
      // Start animating
      this.animations[step] = {
        'fall': new AnimationBoosterFall({
          onAnimationEnd: () => {
            this.goToStep(STEPS.BOOSTER_LANDING)
          }
        })
      }
    }

  }
}

export default RocketApp