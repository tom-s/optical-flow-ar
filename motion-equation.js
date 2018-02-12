function motion(position, speed , acceleration = -9.8, dt=1){
  /*
  position : vertical position of the rocket
  speed : instant speed of the rocket
  acceleration : acceleration of the rocket. Set to free fall acceleration
  dt: elapsed physical time between two frames. Set to 1 sec (ie: 60 times faster than the reality)
  */
  position = position + dt * speed
  speed = speed + dt * acceleration
  return position, speed
}