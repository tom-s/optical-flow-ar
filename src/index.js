import 'aframe-touch-rotation-controls'
import RocketApp from './stories/rocket'

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

/* Booster fall */
AFRAME.registerComponent('booster-fall', {
  init: function() {
	  const booster = this.el
    // Make the element emit events when found and when lost.

  }
})



