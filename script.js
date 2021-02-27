let c = 0
let operators = []
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
  const randomOperator = () => {
    // console.log(`randomOperator()`)
    let random = Math.random() * operators.length
    random = Math.floor(random)
    let operator = operators[random]
    // console.log(`operator: ${operator}`)
    return operator
  }
  let operator = randomOperator()
  let a = randomNumBetween(1, 10)
  let b = randomNumBetween(1, 10)
  let equation = undefined
  switch(true) {
    case operator == 'addition':
      equation = `${a} + ${b}`
      c = a + b
      break
    case operator == 'subtraction':
      if(a >= b) {
        equation = `${a} - ${b}`
        c = a - b
      } else {
        equation = `${b} - ${a}`
        c = b - a
      }
      break
    case operator == 'multiplication':
      equation = `${a} * ${b}`
      c = a * b
      break
    case operator == 'division':
      equation = `${a} / ${b}`
      let multiple = a * b
      equation = `${multiple} / ${a}`
      c = b
      break
    }
  $('#equation').text(equation)
  return c
}

let score = 0
let timeleft = 10
let timerStarted = false
let cntr = 90
let gameOver = false
function Timer(fn, t) {
  var timerObj = setInterval(fn, t)

  this.stop = function() {
    // console.log(`Timer.stop()`)
      if (timerObj) {
          clearInterval(timerObj)
          timerObj = null
      }
      return this
  }

  // start timer using current settings (if it's not already running)
  this.start = function() {
    // console.log(`Timer.start()`)
    timerStarted = true
    if (!timerObj) {
          this.stop()
          timerObj = setInterval(fn, t)
      }
      return this
  }

  // start with new interval, stop current interval
  this.reset = function(newT) {
    // console.log(`Timer.reset()`)
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
  // console.log(`endGame()`)
  score = 0
  cntr = 90
  gameOver = true
  $('#score span').text(score)
  $('#timer span').text('10')
}

var startTime = Date.now();
var timer = new Timer(function() {
  // console.log(`new Timer()`)
  if(timerStarted === true) {
    writeTime(cntr--)
  }
  if(cntr < 0) {
    // console.log(`cntr < 0`)
    timer.stop()
    logScore(score)
    endGame()
  }
}, 100);

function getOperators() {
  // console.log(`getOperators()`)
  operators = []
  // loop through each operator, if checked add to operators array & add btn-primary classs
  $('#operators div').each(function() {
    let operator = $(this).find('input').attr('id')
    let checkbox = $(this).find('input')
    let checked = checkbox.is(':checked')
    if(checked) {
      operators.push(operator)
      $(this).removeClass('btn-secondary')
      $(this).addClass('btn-primary')
    } else {
      $(this).removeClass('btn-primary')
      $(this).addClass('btn-secondary')
    }
  })
  // console.log(operators)
  randomQuestion()
}

getOperators()

$('#operators div').on('click', function() {
  getOperators()
})
  
let started = false
$('#answer input').keyup(function (event) {
  // console.log(`#answer keypress`)
  if(started == false) {
    $(this).removeAttr('placeholder')
  }
  let value = $(this).val()
  if(gameOver = true && started == true) {
    // console.log(`gameOver: ${gameOver} started: ${started}`)
    timer.start()
  }
if (value == c) {
    // console.log(`correct!`)
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