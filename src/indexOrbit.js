import 'aframe-look-at-component'

import OrbitApp, { STEPS } from './stories/orbit'

export const STEPS_DETAILS = {}

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
	  marker.addEventListener('markerFound', ({target: {id}}) => {
      console.log("markerFound", id)
	  	ORBIT.markerShow(id)
	  })
	  marker.addEventListener('markerLost', ({target: {id}}) => {
      console.log("markerLost", id)
	  	ORBIT.markerLost(id)
    })
  }
})

/* Text details */
AFRAME.registerComponent('text-details', {
  tick: function() {
    const el = this.el
    const currentStep = ORBIT.getCurrentStep()
    const stepDetails = STEPS_DETAILS[currentStep]
    el.setAttribute('value', stepDetails ? stepDetails : '')
  }
})

/* Animated orbit */
AFRAME.registerComponent('anim-orbit', {
  tick: function() {
    const el = this.el
    const { x, y } = ORBIT.getAnimation('orbit').tick()
    el.setAttribute('visible', x || y ? true : false)
    if(x || y) {
      el.setAttribute('position', {x:x,y:0,z:y})
    }
  }
})

/* Hide models on animation */
/* Animated orbit */
AFRAME.registerComponent('hide-on-anim', {
  tick: function() {
    const el = this.el
    const { x, y } = ORBIT.getAnimation('orbit').getValue()
    el.setAttribute('visible', x || y ? false : true)
  }
})


