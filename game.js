var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// You'll need a way to keep track of whether if the game has started or not, so you that only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;


//  Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (started === false) {

    started = true;
    nextSequence();
  }
});


//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // creating a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  // the contents of the variable userChosenColour to the end of this new userClickedPattern array
  userClickedPattern.push(userChosenColour);

  // When a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);

  // call the animate function whenever user presses any of the 4 buttons
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  // increase the level by 1 every time nextSequence() is called so that corresponding level will be shown in h1
  level++;

  userClickedPattern = [];

  // update the h1 with the value of current level.
  $("#level-title").text("Level " + level);

  // generating a random number between 0 and 3
  var randomNumber = Math.floor(Math.random()*4);

  //  use the randomNumber from above step to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // Add the randomChosenColour generated in above step to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  // Use jQuery to animate a flash to the button selected in above step.
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

  playSound(randomChosenColour);
}


function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern or not
    // it means user is entering the correct sequence
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      // here we are checking that whether user has entered the complete sequence or not
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      // Call startOver() if the user gets the sequence wrong and start the new game
      startOver();
    }

}


function playSound(name) {

  // use Javascript to play the sound for the button color selected and it is stored in variable "name"
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// this function is taking a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked by user
  $("#" + currentColor).addClass("pressed");

  //use Javascript to remove the pressed class after 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//1. Create a new function called startOver().
function startOver() {

  // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
