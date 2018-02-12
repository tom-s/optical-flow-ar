import 'aframe-look-at-component'
import 'aframe-arrow-component'

import RocketApp, { STEPS } from './stories/rocket'

export const STEPS_DETAILS = {
  [STEPS.TAKE_OFF_END]: `Apres 195 secondes de vol, \n
  les reacteurs d'appoint se decrochent \n
  et commencent leur chute libre.`
}

// Create rocket app
const ROCKET = new RocketApp()

window.addEventListener('load', () => {
  // Init rocket App
  ROCKET.init()
})

/* Marker tracking */
AFRAME.registerComponent('register-events', {
  init: function() {
    const marker = this.el

    // Make the element emit events when found and when lost.
	  marker.setAttribute('emitEvents', true);
	  marker.addEventListener('markerFound', () => {
	  	ROCKET.markerShow()
	  })
	  marker.addEventListener('markerLost', () => {
	  	ROCKET.markerLost()
    })
  }
})

/* Rocket takeoff */
AFRAME.registerComponent('anim-takeoff', {
  tick: function() {
    const el = this.el
    const { position } = ROCKET.getAnimation('takeOff').tick()
    if(position) {
      el.setAttribute('position', {x:0,y:position,z:0})
    }
  }
})


/* Altitude counter */
AFRAME.registerComponent('altitude-counter', {
  tick: function() {
    const el = this.el
    const { position, progress } = ROCKET.getAnimation('takeOff').getValue()
    if(position) {
      const altitude = Math.round(60 * progress)
      el.setAttribute('value', `${altitude} km`)
    }
  }
})

/* Text details */
AFRAME.registerComponent('text-details', {
  tick: function() {
    const el = this.el
    const currentStep = ROCKET.getCurrentStep()
    const stepDetails = STEPS_DETAILS[currentStep]
    el.setAttribute('value', stepDetails ? stepDetails : '')
  }
})

/* Vectors */
AFRAME.registerComponent('speed-vector', {
  tick: function() {
    const el = this.el
    el.setAttribute('arrow', "direction: 0 1 0;")
  }
})
