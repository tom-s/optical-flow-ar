import 'aframe-touch-rotation-controls'
import RocketApp, { STEPS } from './stories/rocket'

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

    // Init animation
  }
})

/* Booster fall
AFRAME.registerComponent('booster-fall', {
  init: function() {
    const booster = this.el
    // Make the element emit events when found and when lost.
  },

  tick: function() {
    const animation = ROCKET.getAnimation('fall')
    if(animation) {
      const { position } = animation.getValues()
      this.el.setAttribute('position', {x:0,y:ROCKET.position/1000,z:0})
      console.log("tick", ROCKET.position, ROCKET.speed, this.el)
    }
  }
}) */

/* Rocket takeoff */
AFRAME.registerComponent('anim-takeoff', {
  tick: function() {
    const { position } = ROCKET.animation.tick()
    this.el.setAttribute('position', {x:0,y:position,z:0})
  },
})

