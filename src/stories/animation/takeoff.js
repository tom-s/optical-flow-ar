const MAX_HEIGHT = 1.5

class Animation {
  constructor({ onAnimationEnd }) {
    this.position = 0
    this.isPlaying = true
    this.onAnimationEnd = onAnimationEnd
    this.lastTick = {}
  }
  animationEnd = () => {
    this.isPlaying = false
    this.onAnimationEnd && this.onAnimationEnd()
  }
  getValue = () => this.lastTick
  tick = () => {
    if(!this.isPlaying) return {}
    this.position = this.position + 1/100
    if(this.position > MAX_HEIGHT) {
      this.animationEnd()
    }
    this.lastTick =  {
      position: this.position,
      progress: this.position / MAX_HEIGHT
    }
    return this.lastTick
  }
}


export default Animation
