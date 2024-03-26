var teamInPossession = "visitor";
var possessionNumber = 1;
var playResult;
var points;
var quarter;
var newQuarterScore;
var currentQuarterScore;
var visitorOff;
var visitorDef;
var homeOff;
var homeDef;

// $(".splash").hide();
// $(".game-simulator").show();

//------------------------------------------
// Splash
//------------------------------------------

$("#gamesimulator").on("click", function () {
  $(".game-simulator, .game-simulator-link").addClass("active");
  $(".splash").hide();
  $(".game-simulator, .universal-footer").show();
});

$("#diceroller").on("click", function () {
  $(".dice-roller, .dice-roller-link").addClass("active");
  $(".splash").hide();
  $(".dice-roller, .universal-footer").show();
});

//------------------------------------------
// Set Team Adjustments
//------------------------------------------

$(".visitor-offense").on("change", function () {
  visitorOff = $(this).val();
  // console.log("visitor offense: " + visitorOff);
});

$(".visitor-defense").on("change", function () {
  visitorDef = $(this).val();
  // console.log("visitor defense: " + visitorDef);
});

$(".home-offense").on("change", function () {
  homeOff = $(this).val();
  // console.log("home offense: " + homeOff);
});

$(".home-defense").on("change", function () {
  homeDef = $(this).val();
  // console.log("home defense: " + homeDef);
});

//------------------------------------------
// UI
//------------------------------------------

$(".dice-roller-link").on("click", function () {
  var $this = $(this);
  $(".game-simulator").hide();
  $(".dice-roller").show();
  $(".link").removeClass("active");
  $(".dice-roller-link").addClass("active");
});

$(".game-simulator-link").on("click", function () {
  var $this = $(this);
  $(".game-simulator").show();
  $(".dice-roller").hide();
  $(".link").removeClass("active");
  $(".game-simulator-link").addClass("active");
});

//---------------------------------------
// scoreboard
//---------------------------------------

$(".visitor-plus").on("click", function () {
  var visitorScore = $(".visitor-score").text();
  visitorScore++;
  $(".visitor-score").text(visitorScore);
});

$(".visitor-minus").on("click", function () {
  var visitorScore = $(".visitor-score").text();
  if (visitorScore > 0) {
    visitorScore--;
  }
  $(".visitor-score").text(visitorScore);
});

$(".home-plus").on("click", function () {
  var homeScore = $(".home-score").text();
  homeScore++;
  $(".home-score").text(homeScore);
});

$(".home-minus").on("click", function () {
  var homeScore = $(".home-score").text();
  if (homeScore > 0) {
    homeScore--;
  }
  $(".home-score").text(homeScore);
});

//------------------------------------------
// Dice Rolls
//------------------------------------------

// d100
function die100() {
  var dice = {
    sides: 100,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  };

  // result roll: d10 tens place
  die100Result = dice.roll();
  // console.log("Die 100 result: " + die100Result);
}

// d10
function die1() {
  var dice = {
    sides: 10,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  };

  // result roll: d10 tens place
  die1Result = dice.roll();
  // console.log("Die 1 result: " + die1Result);
}

// d10
function die2() {
  var dice = {
    sides: 10,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  };

  // result roll: d10 ones place
  die2Result = dice.roll();
  // console.log("Die 2 result: " + die2Result);
}

// d6
function die3() {
  var dice = {
    sides: 6,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  };

  // result roll: offensive play call
  die3Result = dice.roll();
  // console.log("Die 3 result: " + die3Result);
}

// d6
function die4() {
  var dice = {
    sides: 6,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  };

  // result roll
  die4Result = dice.roll();
  // console.log("Die 4 result: " + die4Result);
}

//------------------------------------------
// Functions
//------------------------------------------

function getResult() {
  die100();

  if (teamInPossession == "visitor") {
    // make offensive team adjustment to the roll
    if (visitorOff == 3) {
      die100Result = parseInt(die100Result) + 25;
    } else if (visitorOff == 2) {
      die100Result = parseInt(die100Result) + 15;
    } else if (visitorOff == 1) {
      die100Result = parseInt(die100Result) + 8;
    } else if (visitorOff == 0) {
      die100Result = parseInt(die100Result) - 0;
    }

    // make defensive team adjustment to the roll
    if (homeDef == -3) {
      die100Result = parseInt(die100Result) - 20;
    } else if (homeDef == -2) {
      die100Result = parseInt(die100Result) - 8;
    } else if (homeDef == -1) {
      die100Result = parseInt(die100Result) - 5;
    } else if (homeDef == 0) {
      die100Result = parseInt(die100Result) + 5;
    }
  } else if (teamInPossession == "home") {
    // make offensive team adjustment to the roll
    if (homeOff == 3) {
      die100Result = parseInt(die100Result) + 20;
    } else if (homeOff == 2) {
      die100Result = parseInt(die100Result) + 15;
    } else if (homeOff == 1) {
      die100Result = parseInt(die100Result) + 8;
    } else if (homeOff == 0) {
      die100Result = parseInt(die100Result) - 0;
    }

    // make defensive team adjustment to the roll
    if (visitorDef == -3) {
      die100Result = parseInt(die100Result) - 20;
    } else if (visitorDef == -2) {
      die100Result = parseInt(die100Result) - 8;
    } else if (visitorDef == -1) {
      die100Result = parseInt(die100Result) - 5;
    } else if (visitorDef == 0) {
      die100Result = parseInt(die100Result) + 5;
    }
    // console.log("adjusted die result: " + die1Result);
  }

  if (die100Result < 72) {
    playResult = "--";
    // console.log("-");
  } else if (die100Result >= 72 && die100Result < 83) {
    playResult = "FG";
    // console.log("FG");
  } else if (die100Result >= 83) {
    playResult = "TD";
    // console.log("TD");
  }

  // console.log("Play result: " + playResult);
}

function outputResult() {
  // output result
  $("." + teamInPossession + ".pos-" + possessionNumber)
    .find("p")
    .text(playResult);

  // assign a new quarter after 3 drives
  if (possessionNumber <= 3) {
    quarter = "q1";
  } else if (possessionNumber > 3 && possessionNumber <= 6) {
    quarter = "q2";
  } else if (possessionNumber > 6 && possessionNumber <= 9) {
    quarter = "q3";
  } else if (possessionNumber > 9 && possessionNumber <= 12) {
    quarter = "q4";
  } else if (possessionNumber > 12 && possessionNumber <= 15) {
    quarter = "OT";
  }

  // assign points for a score
  if (playResult == "FG") {
    points = 3;
  } else if (playResult == "TD") {
    points = 7;
  }

  if (teamInPossession == "visitor") {
    // change score if score
    if (playResult == "FG" || playResult == "TD") {
      currentQuarterScore = $(".visitor-" + quarter)
        .find("p")
        .text();
      newQuarterScore = parseInt(currentQuarterScore) + parseInt(points);

      $(".visitor-" + quarter)
        .find("p")
        .text(newQuarterScore);

      var finalScore = $(".visitor-final").find("p").text();
      finalScore = parseInt(finalScore) + parseInt(points);
      $(".visitor-final").find("p").text(finalScore);
    }

    // change possession team
    teamInPossession = "home";
  } else if (teamInPossession == "home") {
    // change score if score
    if (playResult == "FG" || playResult == "TD") {
      currentQuarterScore = $(".home-" + quarter)
        .find("p")
        .text();
      newQuarterScore = parseInt(currentQuarterScore) + parseInt(points);
      $(".home-" + quarter)
        .find("p")
        .text(newQuarterScore);

      var finalScore = $(".home-final").find("p").text();
      finalScore = parseInt(finalScore) + parseInt(points);
      $(".home-final").find("p").text(finalScore);
    }

    // change possession team
    teamInPossession = "visitor";
    // change possession number
    possessionNumber++;
  }
}

function autoPlay() {
  for (let i = 0; i < 24; i++) {
    getResult();
    outputResult();
  }

  if ($(".visitor-final").text() == $(".home-final").text()) {
    $("#overtime").show();
  } else {
    $("#reset").show();
  }

  $("#roll").hide();
}

function autoPlayOT() {
  for (let i = 0; i < 9; i++) {
    if ($(".visitor-final").text() == $(".home-final").text()) {
      getResult();
      outputResult();
    } else {
      break;
      $("#overtime").hide();
      $("#reset").show();
    }
  }

  $("#overtime").hide();
  $("#reset").show();
}

function resetGame() {
  $(".scoring-grid .visitor, .scoring-grid .home").find("p").text("");
  $(".scoring-quarters .visitor, .scoring-quarters .home").find("p").text("0");
  teamInPossession = "visitor";
  possessionNumber = 1;
  $("#reset").hide();
  $("#roll").show();
}

$("#roll").on("click", function () {
  autoPlay();
});

$("#reset").on("click", function () {
  resetGame();
});

$("#overtime").on("click", function () {
  autoPlayOT();
});

function offenseRoll() {
  die3();
  $(".offense-roll").hide().text(die3Result).fadeIn();
}

function defenseRoll() {
  die3();
  $(".defense-roll").hide().text(die3Result).fadeIn();
}

function playResultRoll() {
  die1();
  die2();
  var playResultTotal = die1Result + die2Result;
  $(".play-result-roll").hide().text(playResultTotal).fadeIn();
}

function playerRoll() {
  die1();
  $(".player-roll").hide().text(die1Result).fadeIn();
}

function d10Roll() {
  die1();
  $(".d10-roll").hide().text(die1Result).fadeIn();
}

function d10Plusd10Roll() {
  die1();
  die2();

  var d10Plusd10RollResult = die1Result + die2Result;
  $(".d10-plus-d10-roll").hide().text(d10Plusd10RollResult).fadeIn();
}

function d6Roll() {
  die3();
  $(".d6-roll").hide().text(die3Result).fadeIn();
}

function d6Plusd6Roll() {
  die3();
  die4();

  var d6Plusd6RollResult = die3Result + die4Result;
  $(".d6-plus-d6-roll").hide().text(d6Plusd6RollResult).fadeIn();
}

function d10Plusd6Roll() {
  die1();
  die3();

  var d10Plusd6RollResult = die1Result + die3Result;
  $(".d10-plus-d6-roll").hide().text(d10Plusd6RollResult).fadeIn();
}

// primary rolls

$("#primaryroll").on("click", function () {
  // roll main rolls on button click
  offenseRoll();
  defenseRoll();
  playResultRoll();
  playerRoll();

  // clear secondary rolls on button click
  $(
    ".d6-roll, .d10-roll, .d6-plus-d6-roll, .d10-plus-d10-roll, .d10-plus-d6-roll"
  ).text("");
});

//---------------------------------------
// secondary rolls
//---------------------------------------

$(".d10-plus-d10").on("click", function () {
  d10Plusd10Roll();
});

$(".d6-plus-d6").on("click", function () {
  d6Plusd6Roll();
});

$(".d10-plus-d6").on("click", function () {
  d10Plusd6Roll();
});

$(".d10").on("click", function () {
  d10Roll();
});

$(".d6").on("click", function () {
  d6Roll();
});