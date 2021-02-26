let c = 0
const randomQuestion = () => {
  // console.log(`randomQuestion()`)
  const randomNumBetween = (min, max) => {
    // console.log(`randomNumBetween(${min}, ${max})`)
    let range = max - min
    let random = Math.random() * range
    random = Math.floor(random)
    random = random + min
    // console.log(random)
    return random
  }
  let a = randomNumBetween(1, 10)
  let b = randomNumBetween(1, 10)
  c = a + b
  console.log(`${a} + ${b} = ${c}`)
  let equation = `${a} + ${b}`
  $('#equation').text(equation)
  return c
}

let score = 0
let timeleft = 10
let timerStarted = false
let cntr = 50
let gameOver = false
function Timer(fn, t) {
  var timerObj = setInterval(fn, t)

  this.stop = function() {
    console.log(`Timer.stop()`)
      if (timerObj) {
          clearInterval(timerObj)
          timerObj = null
      }
      return this
  }

  // start timer using current settings (if it's not already running)
  this.start = function() {
    console.log(`Timer.start()`)
    timerStarted = true
    if (!timerObj) {
          this.stop()
          timerObj = setInterval(fn, t)
      }
      return this
  }

  // start with new interval, stop current interval
  this.reset = function(newT) {
    console.log(`Timer.reset()`)
      t = newT
      return this.stop().start()
  }
}

function logScore(msg) {
  $('#scoresLabel').css('display', 'block')
  var target = document.getElementById("scores")
  var div = document.createElement("div")
  div.innerHTML = msg
  target.insertBefore(div, target.firstChild)
}

function writeTime(time) {
  // console.log(time)
  let displayTime = time / 10
  displayTime = displayTime.toFixed(1)
  $('#timer span').text(displayTime)
}

function endGame() {
  console.log(`endGame()`)
  score = 0
  cntr = 50
  gameOver = true
  $('#score span').text(score)
}

var startTime = Date.now();
var timer = new Timer(function() {
  console.log(`new Timer()`)
  // logScore(cntr-- + ": " + ((Date.now() - startTime) /1000).toFixed(3));
  if(timerStarted === true) {
    writeTime(cntr--)
  }
  if(cntr < 0) {
    console.log(`cntr < 0`)
    timer.stop()
    logScore(score)
    endGame()
  }
}, 100);

function resetGame() {
  var newTime = +document.getElementById("timer").value * 1000
  score = 0
  cntr = 50
  $('#score span').text(score)
  timerStarted = true
}

document.getElementById("reset").addEventListener("click", function(e) {
  console.log(`#reset click`)
  resetGame()
});

document.getElementById("start").addEventListener("click", function(e) {
  timer.start()
});

document.getElementById("stop").addEventListener("click", function(e) {
  timer.stop();
});
  
let started = false
$('#answer input').keyup(function (event) {
  console.log(`#answer keypress`)
  console.log(cntr)
  console.log(started)
  if(started == false) {
    $(this).removeAttr('placeholder')
  }
  let value = $(this).val()
  if(gameOver = true && started == true) {
    console.log(`gameOver: ${gameOver} started: ${started}`)
    timer.start()
  }
if (value == c) {
    console.log(`correct!`)
    score += 1
    cntr += 10
    timerStarted = true
    started = true

    $('#score span').text(score)
    randomQuestion()
    $(this).val('')
  }
})


$(document).ready(function () {
  randomQuestion()
})