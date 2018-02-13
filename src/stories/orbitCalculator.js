
// Animated
var LOOP_LIMIT = 10;

class OrbitCalculator {
  constructor(props) {
    this.time = 0
    this.last_x = 0
    this.last_y = 0
  }

  calculate = ({
    a = 150,
    b = 100,
    m = 100,
    e = 0.7,
    x_offset = 250,
    y_offset = 150
  }) => {
    var focus_x = x_offset + a*e;
    var focus_y = y_offset;
    var orbitPeriod = 2.0 * Math.PI * Math.sqrt(a*a*a/(m*m)); // G=1

    // 1) find the relative time in the orbit and convert to Radians
    var M = 2.0 * Math.PI * this.time/orbitPeriod;

    // 2) Seed with mean anomaly and solve Kepler's eqn for E
    var u = M; // seed with mean anomoly
    var u_next = 0;
    var loopCount = 0;
    // iterate until within 10-6
    while(loopCount++ < LOOP_LIMIT) {
      // this should always converge in a small number of iterations - but be paranoid
      u_next = u + (M - (u - e * Math.sin(u)))/(1 - e * Math.cos(u));
      if (Math.abs(u_next - u) < 1E-6)
        break;
      u = u_next;
    }

    // 2) eccentric anomoly is angle from center of ellipse, not focus (where centerObject is). Convert
    //    to true anomoly, f - the angle measured from the focus. (see Fig 3.2 in Gravity)
    var cos_f = (Math.cos(u) - e)/(1 - e * Math.cos(u));
      var sin_f = (Math.sqrt(1 - e*e) * Math.sin (u))/(1 - e * Math.cos(u));
    var r = a * (1 - e*e)/(1 + e * cos_f);

    this.time = this.time + 1;
    // animate
    this.last_x = focus_x + r*cos_f;
    this.last_y = focus_y + r*sin_f;
    return {
      x: r* cos_f,
      y: r*sin_f
    }
  }
}




