var gameScore = 0;
var gameWidth = 0;
var gameHeight = 0;
var ballColor = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];
var counter = 3;
var ballSpawnTimer = 0;
// var timeNow = new Date()



$('button').click(function() {
  gameScore = 0;
  $('.results').hide();
  $('button').hide();
  $('.directions').hide();

  //countdown timer code
  $('.message').html("<h3>Game starting in</h3>" + counter);

  var interval = setInterval(function() {
    counter--;
    if (counter >= 0) {
      $('.message').html("<h3>Game starting in</h3>" + counter);
    }
    if (counter == 0) {
      clearInterval(interval);
      $('.message').html("");
    }
  }, 1000);

  randomBallPlacement();
  attachBall();
});


function randomBallPlacement() {
  //seting random ball location and not allowing to surpass edge of screens.
  gameHeight = (Math.random() * $(window).height()) - 150;
  gameWidth = (Math.random() * $(window).width()) - 150;

  if (gameHeight < 0) {
    gameHeight = 0;
  }
  if (gameWidth < 0) {
    gameWidth = 0;
  }

  //randomBallColor code
  randomNumBallColor = Math.floor(Math.random() * ballColor.length);
  randomBallColor = ballColor[randomNumBallColor];
}

function attachBall() {
  //Spawn ball at random time between 0-5 only after the game is started
  if (gameScore == 0) {
    ballSpawnTimer = 3000;
  } else {
    ballSpawnTimer = Math.random() * 4000;
  }
  //attach ball to DOM
  setTimeout(function() {
    $('.gameArea').append('<div class="box"></div>');
    $('.box').css('top', gameHeight);
    $('.box').css('left', gameWidth);
    $('.box').css('background-color', randomBallColor);
    ballClick();
    timeNow = new Date();
  }, ballSpawnTimer);
  console.log(ballSpawnTimer);
}

function clearBall() {
  $('.box').detach();
}

function scoreBoard(seconds) {
  $('.results').show();
  $('.results').html("Score: " + gameScore + ' of 15');
  $('.message').html("It took you " + seconds + ' seconds to react');
}

function ballClick() {
  $('.box').click(function() {
    var timeOfClick = new Date();
    var seconds = (timeOfClick.getTime() - timeNow.getTime()) / 1000;

    if (gameScore == 14 && seconds <= 1) {
      winner(seconds);
    } else if (seconds <= 1) {
      gameScore++;
      scoreBoard(seconds);
      clearBall(); //this fixes multiple balls spawning after round 1
      randomBallPlacement();
      attachBall();
    } else {
      youLose(seconds);
      clearBall();
    }
  });
};

function youLose(seconds) {
  $('.results').show();
  $('.message').html("It took you " + seconds + ' seconds to react');
  $('.results').html("Too Slow! <span id=loser>You Lose!</span> Your score was " + gameScore + " <br> Click the start button to play again!");
  $('button').show();
  counter = 3;
}

function winner(seconds) {
  clearBall();
  $('.message').html("It took you " + seconds + ' seconds to react');
  $('.results').html("You reached 15! <span id=winner>You Win!</span> <br> Click the start button to play again!");
  $('button').show();
  counter = 3;
}
