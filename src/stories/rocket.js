import get from 'lodash/get'

class RocketApp {
  constructor() {
    this.isMarkerShown = false
    this.domEls = {}
    this.domInstructions = null
  }
  init = () => {
    this.domInstructions =  window.document.querySelector('#instructions')
  }
  /* Outer dom  */
  showIntructions = () => {
    if(this.domInstructions && this.domInstructions.style.visibility !== 'visible') {
      this.domInstructions.style.visibility = 'visible'
    }
  }
  hideIntructions = () => {
    if(this.domInstructions && this.domInstructions.style.visibility !== 'hidden') {
      this.domInstructions.style.visibility = 'hidden'
    }
  }
  /* Marker */
  getMarkerShown = () => this.isMarkerShown
  markerShow = () => {
    this.isMarkerShown = true
  }
  markerLost = () => {
    this.isMarkerShown = false
  }
  /* DOM manipulation */
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id)
}

export default RocketApp