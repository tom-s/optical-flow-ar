// Constants
const WIDTH = 640
const HEIGHT = 480
const ZONE_SIZE = 10
const FRAMES_X = 10
const constraints = {
  audio: false,
  video: true
}

// Code
let video, canvas, ctx, ctx2, ticks = 0, trackingPoints = []
let stat, gui,options, curr_img_pyr, prev_img_pyr, point_count, point_status, prev_xy, curr_xy

class demo_opt {
  constructor() {
    this.win_size = 20
    this.max_iterations = 30
    this.epsilon = 0.01
    this.min_eigen = 0.001
  }
}


const initJsFeat = () => {
  stat = new profiler()
  ctx.fillStyle = "rgb(0,255,0)";
  ctx.strokeStyle = "rgb(0,255,0)";

  curr_img_pyr = new jsfeat.pyramid_t(3);
  prev_img_pyr = new jsfeat.pyramid_t(3);
  curr_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t);
  prev_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t);

  point_count = 0;
  point_status = new Uint8Array(100);
  prev_xy = new Float32Array(100*2);
  curr_xy = new Float32Array(100*2);

  options = new demo_opt();
  gui = new dat.GUI();

  gui.add(options, 'win_size', 7, 30).step(1);
  gui.add(options, 'max_iterations', 3, 30).step(1);
  gui.add(options, 'epsilon', 0.001, 0.1).step(0.0025);
  gui.add(options, 'min_eigen', 0.001, 0.01).step(0.0025);

  stat.add("grayscale");
  stat.add("build image pyramid");
  stat.add("optical flow lk");
}

const getCursorPosition = event => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {
    x,
    y,
    zone: null
  }
}

const calculate = () => {

}

const tick = () => {
  ticks++
  window.requestAnimationFrame(tick)
  if (ticks % FRAMES_X !== 0) return
  ctx.drawImage(video, 0, 0, 640, 480)

  // Update coordinates
  calculate()

  // Draw points of interests
  trackingPoints.forEach(({x, y}) => {
    ctx.fillStyle = "red"
    ctx.fillRect(x, y, 5, 5)
  })
}

const handleSuccess = (stream) => {
  video = document.querySelector('#video')
  canvas = document.querySelector('#canvas')
  ctx = canvas.getContext('2d')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream

  // Init jsfeat
  initJsFeat()

  // LIsten to click
  canvas.addEventListener('click', (e) => {
    const point = getCursorPosition(e)
    trackingPoints.push(point)
  }, false)



  // Starts capturing the flow from webcamera:
  window.requestAnimationFrame(tick)
}

const handleError = (error) => {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)


