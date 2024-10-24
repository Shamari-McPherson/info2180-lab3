document.addEventListener('DOMContentLoaded', initializeGame);

function initializeGame() {
    const boardElement = document.getElementById("board");
    const totalSquares = boardElement.childElementCount;

    // Add event listener to "New Game" button
    const controlButtons = document.getElementsByClassName("controls");
    controlButtons[0].addEventListener('click', handleNewGame);

    // Loop through each square in the board
    for (let squareIndex = 0; squareIndex < totalSquares; squareIndex++) {
        const square = boardElement.children[squareIndex];
        square.classList.add("square");  // Add square class
        square.addEventListener('click', handleSquareClick);  // Click handler
        square.addEventListener('mouseover', handleSquareHover);  // Mouseover handler
        square.addEventListener('mouseout', handleSquareHover);  // Mouseout handler
    }
    return boardElement;
}

function isSquareEmpty(position) {
    return playerMoves[0][position] === "0" && playerMoves[1][position] === "0";
}

function handleSquareClick(event) {
    if (!isGameOver) {
        const board = initializeGame();
        const squareIndex = Array.from(board.children).indexOf(event.target);
        if (isSquareEmpty(squareIndex)) {
            makeMove(squareIndex);
            moveCount++;
            if (moveCount >= 5) {
                checkForWin();
            }
        }
    }
}

function makeMove(position) {
    const currentPlayer = currentMove === 2 ? "X" : "O";
    const board = initializeGame();
    
    board.children[position].classList.add(currentPlayer);
    board.children[position].innerHTML = currentPlayer;
    
    playerMoves[currentMove - 1] = playerMoves[currentMove - 1].substring(0, position) + "1" + playerMoves[currentMove - 1].substring(position + 1);
    currentMove = currentMove === 2 ? 1 : 2;
}

function isHoverEvent(event) {
    return event.type === "mouseover";
}

function handleSquareHover(event) {
    const squareIndex = Array.from(initializeGame().children).indexOf(event.target);
    if (isHoverEvent(event)) {
        initializeGame().children[squareIndex].classList.add("hover");
    } else {
        initializeGame().children[squareIndex].classList.remove("hover");
    }
}

function checkForWin() {
    for (let comboIndex = 0; comboIndex < winningCombinations.length; comboIndex++) {
        if (playerMoves[0] === winningCombinations[comboIndex]) {
            declareWinner("O");
            return;
        } else if (playerMoves[1] === winningCombinations[comboIndex]) {
            declareWinner("X");
            return;
        }
    }
}

function declareWinner(winner) {
    const statusElement = document.getElementById("status");
    statusElement.classList.add("you-won");
    statusElement.innerHTML = `Congratulations! ${winner} is the Winner!`;
    isGameOver = true;
}

function handleNewGame(event) {
    if (moveCount !== 0) {
        if (event) {
            playerMoves = ["000000000", "000000000"];
            moveCount = 0;
            isGameOver = false;
            const statusElement = document.getElementById("status");
            statusElement.classList.remove("you-won");
            statusElement.innerHTML = "Move your mouse over a square and click to play an X or an O.";

            const squares = initializeGame().children;
            for (let squareIndex = 0; squareIndex < squares.length; squareIndex++) {
                squares[squareIndex].classList.remove("O", "X");
                squares[squareIndex].innerHTML = "";
            }
        }
    }
}

const winningCombinations = [
    "111000000",
    "111100000",
    "111010000",
    "111001000",
    "111000100",
    "111000010",
    "111000001",
    "111100010",
    "111100001",
    "111010100",
    "111010001",
    "111001100",
    "111001010",
    "000111000",
    "100111000",
    "010111000",
    "001111000",
    "000111100",
    "000111010",
    "000111001",
    "100111010",
    "100111001",
    "010111100",
    "010111001",
    "001111100",
    "001111010",
    "000000111",
    "100000111",
    "010000111",
    "001000111",
    "000100111",
    "000010111",
    "000001111",
    "100010111",
    "100001111",
    "010100111",
    "010001111",
    "001100111",
    "001010111",
    "100100100",
    "110100100",
    "101100100",
    "100110100",
    "100101100",
    "100100110",
    "100100101",
    "110110100",
    "110101100",
    "110100110",
    "110100101",
    "101110100",
    "101101100",
    "101100110",
    "101100101",
    "010010010",
    "110010010",
    "011010010",
    "010110010",
    "010011010",
    "010010110",
    "010010011",
    "110110010",
    "110011010",
    "110010110",
    "110010011",
    "011110010",
    "011011010",
    "011010110",
    "011010011",
    "010110110",
    "010110011",
    "010011110",
    "010011011",
    "001001001",
    "101001001",
    "011001001",
    "001101001",
    "001011001",
    "001001101",
    "001001011",
    "101101001",
    "101011001",
    "101001101",
    "101001011",
    "011101001",
    "011011001",
    "011001101",
    "011001011",
    "001101101",
    "001101011",
    "001011101",
    "001011011",
    "100010001",
    "110010001",
    "101010001",
    "100110001",
    "100011001",
    "100010101",
    "100010011",
    "110110001",
    "110011001",
    "110010101",
    "110010011",
    "101110001",
    "101011001",
    "101010101",
    "101010011",
    "100110101",
    "100110011",
    "100011101",
    "100011011",
    "001010100",
    "101010100",
    "011010100",
    "001110100",
    "001011100",
    "001010110",
    "001010101",
    "101110100",
    "101011100",
    "101010110",
    "101010101",
    "011110100",
    "011011100",
    "011010110",
    "011010101",
    "001110110",
    "001110101",
    "001011110",
    "001011101",
];

let isGameOver = false;
let currentMove = Math.floor(Math.random() * 2) + 1;
let playerMoves = ["000000000", "000000000"];
let moveCount = 0;