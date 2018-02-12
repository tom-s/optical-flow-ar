const MAX_HEIGHT = 1.5

class Animation {
  constructor({onAnimationEnd}) {
    this.position = 0
    this.speed = 1
    this.acceleration = -9.8
    this.thresholds = thresholds
    this.isPlaying = true
    this.onAnimationEnd = onAnimationEnd
    this.lastTick = {}
  }
  animationEnd = () => {
    this.isPlaying = false
    this.onAnimationEnd && this.onAnimationEnd()
  }
  getValue = () => this.lastTick

  tick = (dt = 0.1) => {
    if(!this.isPlaying) return {}
    this.position = this.position + this.speed * dt + this.acceleration * dt * dt / 2
    this.speed = this.speed + this.acceleration * dt
    this.lastTick =  {
      position: this.position
    }
    console.log(this.position, this.speed, this.acceleration)
    if (this.position<MAX_HEIGHT/2){
      this.animationEnd()
    }
    return this.lastTick
  }
}

export default Animation
