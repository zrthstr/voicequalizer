const w = document.getElementById('pt').contentWindow

function init() {
  document.myform.url.value = "ws://localhost:8080/"
  document.myform.inputtext.value = "Hello World!"
  document.myform.disconnectButton.disabled = true
  doConnect()
}
function doConnect() {
  websocket = new WebSocket(document.myform.url.value)
  websocket.onopen = function(evt) {
    onOpen(evt)
  }
  websocket.onclose = function(evt) {
    onClose(evt)
  }
  websocket.onmessage = function(evt) {
    onMessage(evt)
  }
  websocket.onerror = function(evt) {
    onError(evt)
  }
}
function onOpen(evt) {
  writeToScreen("connected\n")
  document.myform.connectButton.disabled = true
  document.myform.disconnectButton.disabled = false
}
function onClose(evt) {
  writeToScreen("disconnected\n")
  document.myform.connectButton.disabled = false
  document.myform.disconnectButton.disabled = true
}
function onMessage(evt) {
  writeToScreen(w.alwaysVoice)
  writeToScreen('\n')
  writeToScreen("response: " + evt.data + '\n')
  const message = evt.data.split(' - ')[1]

  try {
    const mouseMovement = JSON.parse(message)
    doMouseMovement(mouseMovement)
  } catch (_) {}
}
function onError(evt) {
  writeToScreen('error: ' + evt.data + '\n')
  websocket.close()
  document.myform.connectButton.disabled = false
  document.myform.disconnectButton.disabled = true
}
function doSend(message) {
  writeToScreen("sent: " + message + '\n')
  websocket.send(message)
}
function writeToScreen(message) {
  document.myform.outputtext.value += message
  document.myform.outputtext.scrollTop = document.myform.outputtext.scrollHeight
}
window.addEventListener("load", init, false)
function sendText() {
  doSend(document.myform.inputtext.value)
}
function clearText() {
  document.myform.outputtext.value = ""
}
function doDisconnect() {
  websocket.close()
}

function doMouse({ x, y, duration }) {
  console.log('in doMouse with', x, y, duration)
  w.UI.startMouse({pageX: x, pageY: y})
  window.setTimeout(w.UI.endMouse, duration)
}

const getPoints = numTouches => start => step =>
  Array(numTouches)
    .fill()
    .map((_, i) => start + step * i)

function doMouseMovement({ start, stop, duration }) {
  console.log('in doMouseMovement with', start, stop, duration)
  const stepDuration = 5
  const numTouches = Math.floor(duration / stepDuration)

  const xRange = stop.x - start.x
  const yRange = stop.y - start.y

  const xStep = xRange / numTouches
  const yStep = yRange / numTouches
  const getPointsFn = getPoints(numTouches)

  const xPoints = getPointsFn(start.x)(xStep)
  const yPoints = getPointsFn(start.y)(yStep)
  const touchPoints = xPoints.map((x, i) => [x, yPoints[i]])

  w.UI.startMouse({
    pageX: start.x,
    pageY: start.y,
  })

  touchPoints.map(([pageX, pageY], i) =>
    window.setTimeout(w.UI.moveMouse.bind(w.UI, {
      pageX,
      pageY,
    }), stepDuration * i)
  )

  window.setTimeout(w.UI.endMouse, duration)
}
