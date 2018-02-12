import 'aframe-look-at-component'

import OrbitApp, { STEPS } from './stories/rocket'

export const STEPS_DETAILS = {
  [STEPS.TAKE_OFF_END]: `Apres 195 secondes de vol, \n
  les reacteurs d'appoint se decrochent \n
  et commencent leur chute libre.`
}

// Create rocket app
const ORBIT = new OrbitApp()

window.addEventListener('load', () => {
  // Init rocket App
  ORBIT.init()
})

/* Marker tracking */
AFRAME.registerComponent('register-events', {
  init: function() {
    const marker = this.el

    // Make the element emit events when found and when lost.
	  marker.setAttribute('emitEvents', true);
	  marker.addEventListener('markerFound', (id) => {
      console.log("id", id)
	  	ORBIT.markerShow()
	  })
	  marker.addEventListener('markerLost', (id) => {
      console.log("id")
	  	ORBIT.markerLost()
    })
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

