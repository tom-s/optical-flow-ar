import 'aframe-touch-rotation-controls'
import RocketApp from './stories/rocket'

/* Allow to drag an element by clicking on it
import registerClickDrag from 'aframe-click-drag-component'
registerClickDrag(AFRAME) */

// Start rocket App
const ROCKET = new RocketApp()

/* Marker tracking */
AFRAME.registerComponent('register-events', {
  init: function() {
    console.log("init register events !", this)
	  const marker = this.el
    // Make the element emit events when found and when lost.

	  marker.setAttribute('emitEvents', true);
	  marker.addEventListener('markerFound', () => {
      console.log("marker found")
	  	ROCKET.markerShow()
	  })
	  marker.addEventListener('markerLost', () => {
      console.log("marker lost")
	  	ROCKET.markerLost()
	  })
  }
})

AFRAME.registerComponent('hide-on-marker-found', {
  tick: function () {
    const el = this.el
    const isShown = RocketApp.getMarkerShown()
    console.log("debug isShown ?", isShown)
    el.setAttribute('visible', isShown)
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


