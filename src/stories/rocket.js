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
      onClickSpeed: this._toggleSpeedDisplay,
      onClickForce: this._toggleForceDisplay
    })
  }
  /* Screen Filters */
  _toggleSpeedDisplay = () => {
    this.showSpeed = !this.showSpeed
  }
  _toggleForceDisplay = () => {
    this.showForce = !this.showForce
  }

  /* Public */
  getMarkerShown = () => this.isMarkerShown
  getSpeedDisplay = () => this.showForce
  getForceDisplay = () => this.showSpeed
  markerShow = () => {
    this.isMarkerShown = true
    this.ui.toggle()
  }
  markerLost = () => {
    this.isMarkerShown = false
    this.ui.toggle()
  }


  /* DOM manipulation
  registerDomEl = (id, el) => {
    this.domEls[id] = el
  }
  getDomEl = id => get(this.domEls, id) */
}

export default RocketApp