import 'aframe-touch-rotation-controls'

/* Allow to drag an element by clicking on it
import registerClickDrag from 'aframe-click-drag-component'
registerClickDrag(AFRAME) */

/* Marker tracking */
AFRAME.registerComponent('register-events', {
  init: function() {
    console.log("init register events !", this)
	  const marker = this.el;
    // Make the element emit events when found and when lost.

	  marker.setAttribute('emitEvents', true);
	  marker.addEventListener('markerFound', () => {
	  	const markerId = marker.id
	  	console.log('markerFound', markerId, {...marker})
	  	// TODO: Add your own code here to react to the marker being found.
	  })
	  marker.addEventListener('markerLost', () => {
	  	const markerId = marker.id;
	  	console.log('markerLost', markerId,  {...marker});
	  	// TODO: Add your own code here to react to the marker being lost.
	  })
  }
})