import 'aframe-touch-rotation-controls'
import RocketApp, { STEPS } from './stories/rocket'
import 'aframe-look-at-component'
import 'aframe-arrow-component'

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
      el.setAttribute('position', {y:position})
    }
  }
})

/* Rocket takeoff */
AFRAME.registerComponent('anim-fall', {
  tick: function() {
    const el = this.el
    const { position } = ROCKET.getAnimation('fall').tick()
    if(position) {
      el.setAttribute('position', {y:position})
    }
  }
})

AFRAME.registerComponent('anim-restart', {
  tick: function() {
    const el = this.el
    const { position } = ROCKET.getAnimation('restart').tick()
    if(position) {
      el.setAttribute('position', {y:position})
    }
  }
})

/* Rocket takeoff */
AFRAME.registerComponent('anim-landing', {
  tick: function() {
    const el = this.el
    const { position } = ROCKET.getAnimation('landing').tick()
    if(position) {
      el.setAttribute('position', {y:position})
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
  tick: function( ) {
    const scale = 100
    const isMarkerShown = ROCKET.getMarkerShown()
    const el = this.el
    let speed, position
    const currentStep = ROCKET.getCurrentStep()
    if (isMarkerShown){
      if (currentStep=='boosterFall'){
        speed = ROCKET.getAnimation('fall').getValue()['speed']
      }
      else if (currentStep=='boosterLanding'){
        speed = ROCKET.getAnimation('landing').getValue()['speed']

      }
      else{
        speed = 0
      }
      el.setAttribute('arrow', `direction: 0 ${speed} 0; length : ${scale*Math.abs(speed)} ; color : blue `)
    }
  }
})

AFRAME.registerComponent('acceleration-vector', {
  tick: function( ) {
    const scale = 1000
    const isMarkerShown = ROCKET.getMarkerShown()
    const el = this.el
    let acceleration
    const currentStep = ROCKET.getCurrentStep()
    if (isMarkerShown){
      if (currentStep=='boosterFall'){
        acceleration = ROCKET.getAnimation('fall').getValue()['acceleration']
      }
      else if (currentStep=='boosterLanding'){
        acceleration = ROCKET.getAnimation('landing').getValue()['acceleration']
      }
      else{
        acceleration = 0
      }
      el.setAttribute('arrow', `direction: 0 ${acceleration} 0; length : ${Math.abs(acceleration)*scale}; color : red`)
    }
  }
})

AFRAME.registerComponent('booster-on', {
  tick: function() {
    const el = this.el
    const isMarkerShown = ROCKET.getMarkerShown()
    if (isMarkerShown){
      const booster = ROCKET.getBoosterOn()
      console.log("booster", booster)
      if(booster){
        el.setAttribute("src", "./assets/models/texture/fire.png")
      }
      else{
        el.setAttribute("src", "")
        el.setAttribute("color", "white")
      }
    }
  }
})


