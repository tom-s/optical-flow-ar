import get from 'lodash/get'
import Ui from './ui'
import AnimationTakeOff from './animation/takeoff'
import AnimationBoosterFall from './animation/fall'
import AnimationBoosterLanding from './animation/landing'

const TEXT_SHOW_DURATION = 5000

export const STEPS = {
  NONE: 'none',
  TAKE_OFF: 'takeoff',
  TAKE_OFF_END: 'takeoffEnd',
  BOOSTER_FALL: 'boosterFall',
  BOOSTER_LANDING: 'boosterLanding',
  ENDING: 'ending'
}

class RocketApp {
  constructor() {
    this.ui = new Ui()
    this.domEls = {}

    // Animations
    this.animations = {
      [STEPS.NONE]: null,
      [STEPS.TAKE_OFF]: null,
      [STEPS.TAKE_OFF_END]: null,
      [STEPS.BOOSTER_FALL]: null,
      [STEPS.BOOSTER_LANDING]: null,
      [STEPS.BOOSTER_LANDING]: null,
    }

    this.boosterOn = {
      [STEPS.NONE]: true,
      [STEPS.TAKE_OFF]: true,
      [STEPS.TAKE_OFF_END]: false,
      [STEPS.BOOSTER_FALL]: false,
      [STEPS.BOOSTER_LANDING]: true,
    }

    // Marker display
    this.isMarkerShown = false

    // Vectors display
    this.landing=false

    // App state
    this.currentStep = STEPS.NONE
  }
  init = () => {
    this.ui.init({
      onClickLanding: () => {
        this.landing = !this.landing
      }
    })
  }

  /* Public */
  // Getters
  getMarkerShown = () => this.isMarkerShown
  getLanding = () => this.landing
  getCurrentStep = () => this.currentStep
  getBoosterOn = () => this.boosterOn[this.currentStep]
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
    console.log("go to step", step)
    // Switch
    if(step === STEPS.NONE) {
      this.animatons = {} // reset
    }
    if(step === STEPS.TAKE_OFF) {
      // Start animating
      this.animations[step] = {
        'takeOff': new AnimationTakeOff({
          onAnimationEnd: () => {
            this.goToStep(STEPS.TAKE_OFF_END)
          },
          MAX_HEIGHT: 1.5
        })
      }
    }

    if(step === STEPS.TAKE_OFF_END) {
      // Trigger timeout
      window.setTimeout(() => {
        this.goToStep(STEPS.BOOSTER_FALL)
      }, TEXT_SHOW_DURATION)
    }

    if(step === STEPS.BOOSTER_FALL && this.landing) {
      // Start animating
      this.animations[step] = {
        'fall': new AnimationBoosterFall({
          onAnimationEnd: () => {
            this.goToStep(STEPS.BOOSTER_LANDING)
          },
          'end' : 0.5
        }),
        'restart': new AnimationTakeOff({
            onAnimationEnd: () => {
            },
            MAX_HEIGHT: 10,
            START_POS: 1.5
        })
      }
    }
    if(step === STEPS.BOOSTER_FALL && !this.landing) {
      // Start animating
      this.animations[step] = {
        'fall': new AnimationBoosterFall({
          onAnimationEnd: () => {
            this.goToStep(STEPS.ENDING)
          },
          'end' : 0
        }),
        'restart': new AnimationTakeOff({
            onAnimationEnd: () => {
            },
            MAX_HEIGHT: 10,
            START_POS: 1.5
        })
      }
    }

    if(step === STEPS.BOOSTER_LANDING) {
      // Start animating
      this.animations[step] = {
        'landing': new AnimationBoosterLanding({
          onAnimationEnd: () => {
            this.goToStep(STEPS.ENDING)
          },
          position : this.animations[STEPS.BOOSTER_FALL]['fall'].getValue()['position'],
          speed : this.animations[STEPS.BOOSTER_FALL]['fall'].getValue()['speed']
        })
      }
    }
  }
}

export default RocketApp