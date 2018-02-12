import get from 'lodash/get'
import Ui from './ui'

class RocketApp {
  constructor() {
    this.ui = new Ui()
    this.domEls = {}

    // Marker display
    this.isMarkerShown = false

    // Vectors display
    this.showSpeed = false
    this.showForce = false
  }
  init = () => {
    this.ui.init({
      onClickSpeed: this.toggleSpeedDisplay,
      onClickForce: this.toggleForceDisplay
    })
  }
  /* Marker */
  getMarkerShown = () => this.isMarkerShown
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.ui.toggle()
  }
  /* Screen Filters */
  toggleSpeedDisplay = () => {
    this.showSpeed = !this.showSpeed
  }
  toggleForceDisplay = () => {
    this.showForce = !this.showForce
  }
  getSpeedDisplay = () => this.showForce
  getForceDisplay = () => this.showSpeed
  /* DOM manipulation */
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id)
}

export default RocketApp