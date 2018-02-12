import get from 'lodash/get'

class RocketApp {
  constructor() {
    this.isMarkerShown = false
    this.domEls = {}
    this.domUi = []
  }
  init = () => {
    this.domUi =  window.document.querySelectorAll('.rocket-ui')
  }
  /* Outer UI  */
  updateUi = (markerShown) => {
    if(this.domUi) {
      this.domUi.forEach(el => {
        el.style.visibility = el.style.visibility === 'hidden'
          ? 'visible'
          : 'hidden'
      })
    }
  }
  /* Marker */
  getMarkerShown = () => this.isMarkerShown
  markerShow = () => {
    this.isMarkerShown = true
    this.updateUi()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.updateUi()
  }
  /* DOM manipulation */
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id)
}

export default RocketApp