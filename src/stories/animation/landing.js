const MAX_HEIGHT = 1.5

class Animation {
  constructor({onAnimationEnd, position, speed}) {
    this.position = position
    this.speed = speed
    console.log("POSITION & SPEED", this.position, this.speed)
    this.acceleration = +9.8 *0.001
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
      position: this.position,
      speed: this.speed,
      acceleration : this.acceleration
    }
    if (this.position<0){
      this.animationEnd()
    }
    return this.lastTick
  }
}

export default Animation