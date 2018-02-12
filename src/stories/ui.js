class Ui {
  constructor() {
    this.domEls = [] // all doms elements
    this.displaySpeedButton = null
    this.displayForceButton = null
  }
  init = ({
    onClickSpeed,
    onClickForce
  }) => {
    // Useful dom elements
    this.domEls =  window.document.querySelectorAll('.rocket-ui')
    this.displaySpeedButton = window.document.querySelector('#speed-display')
    this.displayForceButton = window.document.querySelector('#force-display')

    // Add event listeners
    this.displaySpeedButton.addEventListener('click', onClickSpeed)
    this.displayForceButton.addEventListener('click', onClickForce)
  }
  // Hide and show all UI
  toggle = () => {
    this.domEls.forEach(el => {
      el.style.visibility = el.style.visibility === 'hidden'
        ? 'visible'
        : 'hidden'
    })
  }
}


export default Ui
