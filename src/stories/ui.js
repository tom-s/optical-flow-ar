class Ui {
  constructor() {
    this.domEls = [] // all doms elements
    this.landingButton = null
  }
  init = ({
    onClickLanding,

  }) => {
    // Useful dom elements
    this.domEls =  window.document.querySelectorAll('.rocket-ui')
    this.landingButton = window.document.querySelector('#landing')

    // Add event listeners
    this.landingButton.addEventListener('click', onClickLanding)
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
