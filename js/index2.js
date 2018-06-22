$(function(){// variables for connect 4

var board = new Array(6);
var winner = false;
var player1 = '';
var player2 = '';
var currentPlayer = '';
var currentColor = '';
var boardInput = '';
var boardLocation = '';

//these keep track of how many spots are left in each column.
//if someone makes the first move in the middle column 'I'
//subtract a 1 from col 3 which represents the middle column and
//there is one less spot available in it now.
//everything is 0 based so there are 0-5 open spots or 6 open spots
//in each column.
var col0 = 5;
var col1 = 5;
var col2 = 5;
var col3 = 5;
var col4 = 5;
var col5 = 5;
var col6 = 5;

//$('#num00').on('click', $('#num00').css('color', 'red'));
//the main function that gets called whenever a column is chosen

var circles = document.getElementsByClassName('circle');
for (var i = 0; i < circles.length; i++) {
  circles[i].addEventListener("click", function(){
    selectColumn(i % 7);
});
}




function selectColumn(colNum) {
  //if someone already won break out and don't let anyone make another move.
 if (winner) {
    return;
  }

  //a case for when each column is selected. If the column doesn't have anymore
  //open spots return and let the player keep their turn.
  switch (colNum) {
    case 0:
      //check if there are any open spots in that column
      if (col0 == -1) {
        return
      }
      //boardlocation will tell me where to put the black or green circle
      //depending on whos turn it is.
      //							which row					which column
      boardLocation = col0.toString() + colNum.toString();
      //put something in the board array to show that someone has
      //chosen that column. boardInput is an 'x' for player1 and
      //an 'o' for player2.
      board[col0][colNum] = boardInput;
      //take away an available row in the selected column.
      col0--;
      break;
    case 1:
      if (col1 == -1) {
        return
      }
      boardLocation = col1.toString() + colNum.toString();
      board[col1][colNum] = boardInput;
      col1--;
      break;
    case 2:
      if (col2 == -1) {
        return
      }
      boardLocation = col2.toString() + colNum.toString();
      board[col2][colNum] = boardInput;
      col2--;
      break;
    case 3:
      if (col3 == -1) {
        return
      }
      boardLocation = col3.toString() + colNum.toString();
      board[col3][colNum] = boardInput;
      col3--;
      break;
    case 4:
      if (col4 == -1) {
        return
      }
      boardLocation = col4.toString() + colNum.toString();
      board[col4][colNum] = boardInput;
      col4--;
      break;
    case 5:
      if (col5 == -1) {
        return
      }
      boardLocation = col5.toString() + colNum.toString();
      board[col5][colNum] = boardInput;
      col5--;
      break;
    case 6:
      if (col6 == -1) {
        return
      }
      boardLocation = col6.toString() + colNum.toString();
      board[col6][colNum] = boardInput;
      col6--;
      break;
    default:
  }
  //change the game board by making the selected column a black or green circle
  //player1 is black and player2 is green
  var temp = document.getElementById(boardLocation);
  temp.style.background = currentColor;
  //check the board for a winner
  if (checkForWinner()) {
    //display which player won.
    document.getElementById('playerTurnLbl').innerHTML = currentPlayer + ' won!';
    winner = true;
    alert(currentPlayer + ' won!'); // change alerts?
    return;
  }
  //change players after the turn is complete and there is no winner.
  getCurrentPlayer();
}

//alternate between player1 and player2
//and set the input color for the circles black for p1 and green for p2
function getCurrentPlayer() {
  if (currentPlayer == player2) {
    currentPlayer = player1
    currentColor = 'black';
    boardInput = 'x'; // check?
  } else {
    currentPlayer = player2
    currentColor = 'green';
    boardInput = 'o'; // check?
  }
  document.getElementById('playerTurnLbl').innerHTML = currentPlayer + '\'s turn';
}

//get the players names
function setPlayers() {
  var p1 = document.getElementById("player1-id");
  var p2 = document.getElementById("player2-id");
  p1.style.border = "";
  p2.style.border = "";
  if (p1.value === "" || p2.value === "" || p1.value === p2.value) {
    p1.style.border = "solid 1px black";
    p2.style.border = "solid 1px black";
    if (p1.value !== "" && p1.value !== p2.value)
      p1.style.border = "";
    if (p2.value !== "" && p1.value !== p2.value)
      p2.style.border = "";

    return;
  }
  player1 = document.getElementById("player1-id").value;
  player2 = document.getElementById("player2-id").value;
  currentPlayer = player2;
  getCurrentPlayer();
  document.getElementById('playerTurnLbl').innerHTML = currentPlayer + '\'s turn';
  document.getElementById('Menu').style.display = 'none';
  document.getElementById('main').style.display = '';
  setBoard();

}
//create the 2 dimensional array that will act as the virtual game board
//the array will be 6 by 7 to mimick the game board that the user see's.
function setBoard() {
  for (var i = 0; i < 6; i++) {
    board[i] = new Array(7);
  }
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      board[i][j] = ' ';
    }
  }
}

//check the board to see if someone won, every possible winning combination must be checked.
function checkForWinner() {

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 7; j++) {
      if (vertical(i, j)) {
        return true;
      }
    }
  }

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 4; j++) {
      if (horizontal(i, j)) {
        return true;
      }
    }
  }
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      if (downRight(i, j)) {
        return true;
      }
    }
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 3; j < 7; j++) {
      if (downLeft(i, j)) {
        return true;
      }
    }
  }
  return false;

}
//check diagonal
function downRight(row, col) {
  if ((board[row][col] == board[row + 1][col + 1]) && (board[row][col] == board[row + 2][col + 2]) && (board[row][col] == board[row + 3][col + 3]) && (board[row][col] != ' ')) {
    return true;
  }

  return false;
}
//check diagonal
function downLeft(row, col) {
  if ((board[row][col] == board[row + 1][col - 1]) && (board[row][col] == board[row + 2][col - 2]) && (board[row][col] == board[row + 3][col - 3]) && (board[row][col] != ' ')) {
    return true;
  }

  return false;
}
//check up and down
function vertical(row, col) {
  if ((board[row][col] == board[row + 1][col]) && (board[row][col] == board[row + 2][col]) && (board[row][col] == board[row + 3][col]) && (board[row][col] != ' ')) {
    return true;
  }

  return false;
}
//check left and right
function horizontal(row, col) {
  if ((board[row][col] == board[row][col + 1]) && (board[row][col] == board[row][col + 2]) && (board[row][col] == board[row][col + 3]) && (board[row][col] != ' ')) {
    return true;
  }
  return false;
}
//When the reset button is pressed reset everything
//to its original state. every spot int the arrays must be
//cleaned out and the game board circles need to be whited out.
function reset() {
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      board[i][j] = ' ';
      boardLocation = i.toString() + j.toString();
      var temp = document.getElementById(boardLocation);
      temp.style.background = "white";
    }

  }
  winner = false;
  currentColor = '';
  boardInput = '';
  boardLocation = '';
  //show there are all open spots in the columns
  col0 = 5;
  col1 = 5;
  col2 = 5;
  col3 = 5;
  col4 = 5;
  col5 = 5;
  col6 = 5;
  getCurrentPlayer();
}

function showMenu() {
  reset();
  document.getElementById('Menu').style.display = '';
  document.getElementById('main').style.display = 'none';
}

function startGame() {
  // by click the play button, the menu disappears and shows the board

  document.getElementById('main').classList.remove("displayN");
  document.getElementById('main').classList.add("displayB");

  // this removes the board from the menu.
  document.getElementById('main').classList.add("displayB");
  document.getElementById('Menu').classList.remove("displayB")
  document.getElementById('main').classList.add("displayN");
  setPlayers();
}

  //  jquey play button
var play = $('#play-button');
$(play).on('click', startGame);

// var rset = $('#resetButton');
// $(rset).on('click', reset);
//
// var hme = $('#MainButton');
// $(hme).on('click', showMenu);

})
