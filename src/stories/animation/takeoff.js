class Animation {
  constructor({ onAnimationEnd,MAX_HEIGHT, START_POS }) {
    this.position = START_POS ? START_POS : 0
    this.isPlaying = true
    this.onAnimationEnd = onAnimationEnd
    this.lastTick = {}
    this.MAX_HEIGHT = MAX_HEIGHT
  }
  animationEnd = () => {
    this.isPlaying = false
    this.onAnimationEnd && this.onAnimationEnd()
  }
  getValue = () => this.lastTick

  tick = () => {
    if(!this.isPlaying) return {}
    this.position = this.position + 1/300
    if(this.position > this.MAX_HEIGHT) {
      this.animationEnd()
    }
    this.lastTick =  {
      position: this.position,
      progress: this.position / this.MAX_HEIGHT
    }
    return this.lastTick
  }
}


export default Animation
