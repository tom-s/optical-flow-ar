// Animated
const LOOP_LIMIT = 10
const RATIO = 100

class Animation {
  constructor({
    onAnimationEnd,
    a = 150,
    b = 100,
    m = 50,
    e = 0.7,
    x_offset = 250,
    y_offset = 150,
    endTime=100000,
    startTime=-100
  }) {
    this.time = startTime
    this.endTime = endTime
    this.last_x = 0
    this.last_y = 0
    this.a = a
    this.b = b
    this.m = m
    this.e = e
    this.x_offset = x_offset
    this.y_offset = y_offset

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
    var focus_x = this.x_offset + this.a*this.e
    var focus_y = this.y_offset
    var orbitPeriod = 2.0 * Math.PI * Math.sqrt(this.a*this.a*this.a/(this.m*this.m)) // G=1

    // 1) find the relative time in the orbit and convert to Radians
    var M = 2.0 * Math.PI * this.time/orbitPeriod

    // 2) Seed with mean anomaly and solve Kepler's eqn for E
    var u = M // seed with mean anomoly
    var u_next = 0
    var loopCount = 0
    // iterate until within 10-6
    while(loopCount++ < LOOP_LIMIT) {
      // this should always converge in a small number of iterations - but be paranoid
      u_next = u + (M - (u - this.e * Math.sin(u)))/(1 - this.e * Math.cos(u))
      if (Math.abs(u_next - u) < 1E-6)
        break
      u = u_next
    }

    // 2) eccentric anomoly is angle from center of ellipse, not focus (where centerObject is). Convert
    //    to true anomoly, f - the angle measured from the focus. (see Fig 3.2 in Gravity)
    var cos_f = (Math.cos(u) - this.e)/(1 - this.e * Math.cos(u))
    var sin_f = (Math.sqrt(1 - this.e*this.e) * Math.sin (u))/(1 - this.e * Math.cos(u))
    var r = this.a * (1 - this.e*this.e)/(1 + this.e * cos_f)

    this.time = this.time + 1
    // animate
    this.last_x = focus_x + r*cos_f
    this.last_y = focus_y + r*sin_f

    this.lastTick = {
      x: r* cos_f / RATIO,
      y: r*sin_f / RATIO
    }
    if(this.time>this.endTime){
      this.animationEnd()
    }
    return this.lastTick
  }
}


export default Animation
