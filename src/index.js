import FlowCalculator from './assets/scripts/oflow/flowCalculator'

// Constants
const WIDTH = 640
const HEIGHT = 480
const ZONE_SIZE = 8


// Code
let calculator, video, canvas, ctx, ctx2, ticks = 0, FRAMES_X = 10, oldImage

const constraints = {
  audio: false,
  video: true
}

const getCurrentPixels = () => ctx.getImageData(0, 0, WIDTH, HEIGHT).data

const calculate = () => {
  const newImage = getCurrentPixels();
  if (oldImage && newImage) {
    const zones = calculator.calculate(oldImage, newImage, WIDTH, HEIGHT)
    console.log("zones", zones)
  }
  oldImage = newImage
}

const tick = () => {
  ticks++
  window.requestAnimationFrame(tick)
  if (ticks % FRAMES_X !== 0) return
  console.log("tick")
  ctx.drawImage(video, 0, 0, 640, 480)
  calculate()
}

const handleSuccess = (stream) => {
  video = document.querySelector('#video')
  canvas = document.querySelector('#canvas')
  ctx = canvas.getContext('2d')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream

  // Instanciate
  calculator = new FlowCalculator(ZONE_SIZE)
  console.log("flowCalculator", calculator)

  // Starts capturing the flow from webcamera:
  window.requestAnimationFrame(tick)
}

const handleError = (error) => {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)


