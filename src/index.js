import 'aframe-touch-rotation-controls'
import RocketApp from './stories/rocket'

/* Allow to drag an element by clicking on it
import registerClickDrag from 'aframe-click-drag-component'
registerClickDrag(AFRAME) */

// Create rocket app
const ROCKET = new RocketApp()

window.addEventListener('load', () => {
  console.log("loaded")
  // Init rocket App
  ROCKET.init()
})

/* Marker tracking */
AFRAME.registerComponent('register-events', {
  init: function() {
    console.log("init register events !", this)
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

AFRAME.registerComponent('handle-instructions', {
  tick: function () {
    const el = this.el
    const isShown = ROCKET.getMarkerShown()
    if(isShown) {
      ROCKET.hideIntructions()
    } else {
      ROCKET.showIntructions()
    }
  }
})


/* Booster fall */
AFRAME.registerComponent('booster-fall', {
  init: function() {
    console.log("init register events !", this)
	  const booster = this.el
    // Make the element emit events when found and when lost.

  }
})



