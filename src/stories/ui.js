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
  show = () => {
    this.domEls.forEach(el => {
      el.style.visibility = 'visible'
    })
  }
  hide = () => {
    this.domEls.forEach(el => {
      el.style.visibility = 'hidden'
    })
  }
}


export default Ui
