$(function(){

//-------- THE VARIABLES FOR THE CONNECT 4 GAME ------------------------------//
// OPP as for the variables
var cheering = document.getElementById('win');
var connect = {
  blackPlayerName: "Player 1",
  greenPlayerName: "Player 2",
  startingPlayer: "black", // Choose 'black' or 'green'.
  takenMsg: "This position is already taken. Please make another choice.",
  drawMsg: "This game is a draw.",
  playerPrefix: "Current Player is: ",
  winPrefix: "The winner is: ",
  countToWin: 4,
};
// Defined the empty board as a two-dimensional array, full of zeros.
//In the game, 0 represents empty, 'green' represents a green disc, and 'black' represents
// a black disc.
var board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

// Set the starting player.
var currentPlayer = connect.startingPlayer;

// ---------- THE FUNCTIONS FOR CONNECT 4 ------------------------------------//
//----------------------------------------------------------------------------//

// * A function for changing players at the end of a turn.

function changePlayer() {
    // Change the value of our player variable.
    if (currentPlayer === 'black') {
        currentPlayer = 'green';
        document.getElementsByClassName('Player')[0].innerHTML= 'Player : ' + currentPlayer;
    } else {
        currentPlayer = 'black';
        document.getElementsByClassName('Player')[0].innerHTML= 'Player : ' + currentPlayer;
    }

    // Update the UI.
    $('#player').removeClass().addClass(currentPlayer).text(connect[currentPlayer + "PlayerName"]);
}
// Start at the bottom of the column, and step up, checking to make sure
// each position has been filled. If one hasn't, return the empty position.

function dropToBottom(x_pos, y_pos) {

    for (var y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            return y;
        }
    }

    return y_pos;
}

//----------------------------------------------------------------------------

function positionIsTaken(x_pos, y_pos) {
    var value = board[y_pos][x_pos];

    return value === 0 ? false : true;
}


function gameIsDraw() {
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }

//--   No locations were empty. Return true to indicate that the game is a draw.
    return true;
}

// This Functions and its variables is for vertical win
function verticalWin() {
  var currentValue = null,
    previousValue = 0,
    score = 0;

  // Scan each column in the series, scoring the length of each series. If a
  // series ever reaches four, return true for a win.
  for (var x = 0; x <= 6; x++) {
    for (var o = 0; o <= 5; o++) {
      currentValue = board[o][x];
      if (currentValue === previousValue && currentValue !== 0) {
        score += 1;
      } else {
        // Reset the score if you find a gap.
        score = 0;
      }
      if (score === connect.countToWin - 1) {
        return true;
      }
      previousValue = currentValue;
    }

    // After each column, reset the score and previous value.
    score = 0;
    previousValue = 0;
  }

  //this returns false which meand no vertical win was found.
  return false;
}
//---------------------------------------------------------------------------//
function horizontalWin() {
    var currentValue = null,
        previousValue = 0,
        score = 0;

    // Scan each row in series, scoring the length of each series. If a series
    // ever reaches four, return true for a win.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                score += 1;
            } else {
                // Reset the score if you find a gap.
                score = 0;
            }
            if (score === connect.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each row, reset the score and previous value.
        score = 0;
        previousValue = 0;
    }

    // No horizontal win was found.
    return false;
}

function diagonalWin() {
  var x = null,
    o = null,
    xtemp = null,
    otemp = null,
    currentValue = null,
    previousValue = 0,
    score = 0;

  // Test for down-right diagonals across the top.
  for (x = 0; x <= 6; x++) {
    xtemp = x;
    otemp = 0;

    while (xtemp <= 6 && otemp <= 5) {
      currentValue = board[otemp][xtemp];
      if (currentValue === previousValue && currentValue !== 0) {
        score += 1;
      } else {
        // Reset the score if you find a gap.
        score = 0;
      }
      if (score === connect.countToWin - 1) {
        return true;
      }
      previousValue = currentValue;

      // Shift down-right one diagonal index.
      xtemp++;
      otemp++;
    }
    // Reset the score and previous value when changing diagonals.
    score = 0;
    previousValue = 0;
  }

  // Test for down-left diagonals across the top.
  for (x = 0; x <= 6; x++) {
    xtemp = x;
    otemp = 0;

    while (0 <= xtemp && otemp <= 5) {
      currentValue = board[otemp][xtemp];
      if (currentValue === previousValue && currentValue !== 0) {
        score += 1;
      } else {
        // Reset the score if you find a gap.
        score = 0;
      }
      if (score === connect.countToWin - 1) {
        return true;
      }
      previousValue = currentValue;

      // Shift down-left one diagonal index.
      xtemp--;
      otemp++;
    }
    // Reset the score and previous value when changing diagonals.
    score = 0;
    previousValue = 0;
  }

  // for down-right diagonals down the left side.
  for (y = 0; y <= 5; y++) {
    xtemp = 0;
    otemp = y;

    while (xtemp <= 6 && otemp <= 5) {
      currentValue = board[otemp][xtemp];
      if (currentValue === previousValue && currentValue !== 0) {
        score += 1;
      } else {
        // Reset the score if you find a gap.
        score = 0;
      }
      if (score === connect.countToWin - 1) {
        return true;
      }
      previousValue = currentValue;

      // Shift down-right one diagonal index.
      xtemp++;
      otemp++;
    }
    // Reset the score and previous value when changing diagonals.
    score = 0;
    previousValue = 0;
  }
  // Test for down-left diagonals down the right side.
  for (y = 0; y <= 5; y++) {
    xtemp = 6;
    otemp = y;

    while (0 <= xtemp && otemp <= 5) {
      currentValue = board[otemp][xtemp];
      if (currentValue === previousValue && currentValue !== 0) {
        score += 1;
      } else {
        // Reset the score if you find a gap.
        score = 0;
      }
      if (score === connect.countToWin - 1) {
        return true;
      }
      previousValue = currentValue;

      // Shift down-left one diagonal index.
      xtemp--;
      otemp++;
    }
    // Reset the score and previous value when changing diagonals.
    score = 0;
    previousValue = 0;
  }

  // No diagonal wins found. Return false.
  return false;
}
function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
}


// * Print the contents of our `board` variable to the html page.

function printBoard() {
    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').addClass(board[y][x]);
            }
        }
    }
}

//-------------------------------------------------------------------------///



  // Setup game.
  connect.blackPlayerName = ("Please enter the first player's name. This player will use black game pieces.", connect.blackPlayerName) || connect.blackPlayerName;
  connect.greenPlayerName = ("Please enter the second player's name. This player will use green game pieces.", connect.greenPlayerName) || connect.greenPlayerName;
  $('.prefix').text(connect.playerPrefix);
  $('#player').addClass(currentPlayer).text(connect[currentPlayer + "PlayerName"]);

  // Trigger the game sequence by clicking on a position button on the board.
  $('.board button').click(function(e) {
    // Detect the x and y position of the button clicked.
    var y_pos = $('.board tr').index($(this).closest('tr'));
    var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

    // Ensure the piece falls to the bottom of the column.
    y_pos = dropToBottom(x_pos, y_pos);

    if (positionIsTaken(x_pos, y_pos)) {
      (connect.takenMsg);
      return;
    }

    addDiscToBoard(currentPlayer, x_pos, y_pos);
    printBoard();

    // Check to see if we have a winner.
    if (verticalWin() || horizontalWin() || diagonalWin()) {
      // Destroy our click listener to prevent further play.
      $('.board button').unbind('click' , );
      $('.prefix').text(connect.winPrefix);
      $('.play-again').show("slow");
      cheering.play();

      // showing which player is the winner
      document.getElementsByClassName('Player')[0].innerHTML= 'The winner is ' + currentPlayer;
      return;


    } else if (gameIsDraw()) {
      // Destroy our click listener to prevent further play.
      $('.board button').unbind('click');
      $('.message').text(connect.drawMsg);
      $('.play-again').show("slow");
      // list a draw when its implemented
      document.getElementsByClassName('Player')[0].innerHTML= "It's a draw";
      return;
    }

    changePlayer();
  });

  $('.play-again').click(function(e) {
    location.reload();
  });

});

function audioPlay(){
  cheering.play();
}

function audioPause(){
  cheerin.pause();
  cheering.currentTime = 0;
}
