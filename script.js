
var TIMER;
var inputMins;
var timePassed = 0;

document.getElementById('input-date').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      // do stuff // parse value
      var input = document.getElementById("input-date").value
      console.log("enter pressed")
      setTimer(input)
      return false;
    }
  }

function setTimer(input) {
  var match = parseInput(input)
  if (match) {
    inputMins = match[0]
    console.log("running timer with " + inputMins.toString())
    TIMER = setInterval(runTimer, 1000)
  }
}

function runTimer() {
  // convert mins to secs
  var timeLeft = inputMins * 60 - timePassed
  console.log(`tick ${timeLeft}`)
  if (timeLeft < 0) {
    clearInterval(TIMER);
    document.getElementById("input-date").value = "EXPIRED";
    playSound()
  } else {
    var minStr = (Math.floor(timeLeft / 60)).toString()
    var secStr = (timeLeft % 60).toString()

    if (secStr.length === 1) {
      secStr = '0' + secStr
    }
    
    var timeLeftStr = minStr
                      + ':'
                      + secStr
    document.getElementById("input-date").value = timeLeftStr;
  }
  timePassed += 1
}

// var DATE_REGEX = /(\d?\d):(\d\d)/
var DATE_REGEX = /\d?\d/
function parseInput(input) {
  if (input.length === 0 || input.length > 3) {
    return
  }

  var match = DATE_REGEX.exec(input)
  if (match[0]) {
    if (match[0] > 60) {
      // number must be less than 60
      return false
    }

    if (match[0] <= 0 ) {
      return false
    }
    return match;

  } else {
    return false;
  }
}

function playSound() {
  var sound = new Audio('applause.wav')
  sound.play();
}
