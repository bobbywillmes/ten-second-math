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
  let a = randomNumBetween(1, 20)
  let b = randomNumBetween(1, 20)
  c = a + b
  console.log(`${a} + ${b} = ${c}`)
  let equation = `${a} + ${b}`
  $('#equation').text(equation)
  return c
}

let score = 0
$('#answer input').keyup(function(event) {
  // console.log(`#answer keypress`)
  let value = $(this).val()
  // console.log(value)
  // console.log(event)
  if(value == c) {
    console.log(`correct!`)
    score += 1
    $('#score span').text(score)
    randomQuestion()
    $(this).val('')
  }
})


$(document).ready(function() {
  randomQuestion()
})