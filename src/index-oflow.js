import FlowCalculator from './assets/scripts/oflow/flowCalculator'


// Constants
const WIDTH = 640
const HEIGHT = 480
const ZONE_SIZE = 10
const FRAMES_X = 10

// Code
let calculator, video, canvas, ctx, ctx2, ticks = 0, oldImage, trackingPoints = []

const constraints = {
  audio: false,
  video: true
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
  const newImage = ctx.getImageData(0, 0, WIDTH, HEIGHT).data
  if (oldImage && newImage) {
    const zones = calculator.calculate(oldImage, newImage, WIDTH, HEIGHT)
    // Update tracking points
    trackingPoints = trackingPoints.map((point, i) => {
      let zoneIndex = null
      const trackZone = zones.zones.forEach((zone, i) => {
        if (zone.x - ZONE_SIZE >= point.x && point.x <= zone.x)
          && (zone.y - ZONE_SIZE >= point.y && point.y <= zone.y) {
            zoneIndex = i
          }
      })
      console.log("trackZone", trackZone)
      // Return updated coordinates
      return point
    })
  }
  oldImage = newImage
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

  // Instanciate
  calculator = new FlowCalculator(ZONE_SIZE)

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


