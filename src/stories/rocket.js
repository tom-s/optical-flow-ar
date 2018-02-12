import get from 'lodash/get'

class RocketApp {
  constructor() {
    this.isMarkerShown = false
    this.domEls = {}
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