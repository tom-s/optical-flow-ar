AFRAME.registerComponent('register-events', {
  init: function() {
    console.log("init register events !", this)
	  const marker = this.el;
    // Make the element emit events when found and when lost.

	  marker.setAttribute('emitEvents', true);
	  marker.addEventListener('markerFound', () => {
	  	const markerId = marker.id
	  	console.log('markerFound', markerId)
	  	// TODO: Add your own code here to react to the marker being found.
	  })
	  marker.addEventListener('markerLost', () => {
	  	const markerId = marker.id;
	  	console.log('markerLost', markerId);
	  	// TODO: Add your own code here to react to the marker being lost.
	  })
  }
})