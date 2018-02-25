// Constants
const WIDTH = 640
const HEIGHT = 480
const ZONE_SIZE = 10
const FRAMES_X = 1
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

const isPointInPoly = (poly, pt) => {
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  return c;
}


const initJsFeat = () => {
  stat = new profiler()
  ctx.fillStyle = "rgb(0,255,0)"
  ctx.strokeStyle = "rgb(0,255,0)"

  curr_img_pyr = new jsfeat.pyramid_t(3)
  prev_img_pyr = new jsfeat.pyramid_t(3)
  curr_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t)
  prev_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t)

  point_count = 0
  point_status = new Uint8Array(100)
  prev_xy = new Float32Array(100*2)
  curr_xy = new Float32Array(100*2)

  options = new demo_opt()
  gui = new dat.GUI()

  gui.add(options, 'win_size', 7, 30).step(1)
  gui.add(options, 'max_iterations', 3, 30).step(1)
  gui.add(options, 'epsilon', 0.001, 0.1).step(0.0025)
  gui.add(options, 'min_eigen', 0.001, 0.01).step(0.0025)

  stat.add("grayscale")
  stat.add("build image pyramid")
  stat.add("optical flow lk")
}

const getCursorPosition = event => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {
    x,
    y
  }
}

const calculate = () => {

}

const tick = () => {
  ticks++
  window.requestAnimationFrame(tick)
  if (ticks % FRAMES_X !== 0) return

  stat.new_frame()
  ctx.drawImage(video, 0, 0, 640, 480)
  var imageData = ctx.getImageData(0, 0, 640, 480)

  // swap flow data
  var _pt_xy = prev_xy
  prev_xy = curr_xy
  curr_xy = _pt_xy
  var _pyr = prev_img_pyr
  prev_img_pyr = curr_img_pyr
  curr_img_pyr = _pyr

  stat.start("grayscale")
  jsfeat.imgproc.grayscale(imageData.data, 640, 480, curr_img_pyr.data[0])
  stat.stop("grayscale")

  stat.start("build image pyramid")
  curr_img_pyr.build(curr_img_pyr.data[0], true)
  stat.stop("build image pyramid")

  stat.start("optical flow lk")
  jsfeat.optical_flow_lk.track(prev_img_pyr, curr_img_pyr, prev_xy, curr_xy, point_count, options.win_size|0, options.max_iterations|0, point_status, options.epsilon, options.min_eigen)
  stat.stop("optical flow lk")

  prune_oflow_points(ctx)

  // Update loc
  document.querySelector('#log').innerHTML = (stat.log() + '<br/>click to add tracking points: ' + point_count)
}

const onCanvasClick = e => {
  const coords = getCursorPosition(e)
  curr_xy[point_count<<1] = coords.x
  curr_xy[(point_count<<1)+1] = coords.y
  point_count++

  if(point_count === 4) {
    const polygon = [
      { x: curr_xy.slice(0,1)[0], y: curr_xy.slice(1,2)[0]},
      { x: curr_xy.slice(2,3)[0], y: curr_xy.slice(3,4)[0]},
      { x: curr_xy.slice(4,5)[0], y: curr_xy.slice(5,6)[0]},
      { x: curr_xy.slice(6,7)[0], y: curr_xy.slice(7,8)[0]},
      { x: curr_xy.slice(0,1)[0], y: curr_xy.slice(1,2)[0]}
    ]

    /*
    for(var i=0; i<= WIDTH; i=i+ZONE_SIZE/2) {
      for(var j=0; j<= HEIGHT; j=j+ZONE_SIZE/2) {
        if(isPointInPoly(polygon, {x: i, y:j})) {
          curr_xy[point_count<<1] = i
          curr_xy[(point_count<<1)+1] = j
          point_count++
        }
      }
    }**/
  }
}


function draw_circle(ctx, x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI*2, true)
  ctx.closePath()
  ctx.fill()
}

function prune_oflow_points(ctx) {
  var n = point_count
  var j=0
  for( var i=0;i < n; ++i) {
      if(point_status[i] == 1) {
          if(j < i) {
              curr_xy[j<<1] = curr_xy[i<<1]
              curr_xy[(j<<1)+1] = curr_xy[(i<<1)+1]
          }
          draw_circle(ctx, curr_xy[j<<1], curr_xy[(j<<1)+1])
          ++j
      }
  }
  point_count = j
}


const handleSuccess = (stream) => {
  video = document.querySelector('#video')
  canvas = document.querySelector('#canvas')
  ctx = canvas.getContext('2d')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  window.stream = stream // make stream available to browser console
  video.srcObject = stream

  // Init jsfeat
  initJsFeat()

  // LIsten to click
  canvas.addEventListener('click', onCanvasClick, false)

  // Starts capturing the flow from webcamera:
  window.requestAnimationFrame(tick)
}

const handleError = (error) => {
  console.log('navigator.getUserMedia error: ', error)
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)
