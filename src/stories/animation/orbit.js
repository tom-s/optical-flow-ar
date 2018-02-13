const MAX_HEIGHT = 1.5

class Animation {
  constructor({ onAnimationEnd }) {
    this.position = 0
    this.isPlaying = true
    this.onAnimationEnd = onAnimationEnd
  }
  animationEnd = () => {
    this.isPlaying = false
    this.onAnimationEnd && this.onAnimationEnd()
  }
  tick = () => {
    if(!this.isPlaying) return {}
    this.position = this.position + 1/100
    if(this.position > MAX_HEIGHT) {
      this.animationEnd()
    }
    return {
      position: this.position
    }
  }
}


export default Animation
