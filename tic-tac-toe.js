// document.addEventListener('DOMContentLoaded', function() {
//     loadBoard();
// });

function loadBoard(){
        let parent = document.getElementById("board");
        let childAmt = parent.childElementCount;
    
        // Add event listener to "New Game" button
        let buttons = document.getElementsByClassName("controls");
        buttons[0].addEventListener('click', newGameHandler);
    
        // Loop through each child (square) in the board
        for(let childCnt = 0; childCnt < childAmt; childCnt++){
            parent.children[childCnt].classList.add("square");  // Add square class
            parent.children[childCnt].addEventListener('click', clickHandler);  // Click handler
            parent.children[childCnt].addEventListener('mouseover', hoverHandler);  // Mouseover handler
            parent.children[childCnt].addEventListener('mouseout', hoverHandler);  // Mouseout handler
        }
    return parent;   
}
function isEmpty(position){
    return playerMoves[0][position] == "0" && playerMoves[1][position] == "0";
}

function clickHandler(event){
    if(!win){
        let board = loadBoard();
        index = Array.from(board.children).indexOf(event.target);
        if(isEmpty(index)){
            nextMove(index);
            moveAmount++;
            if(moveAmount >= 5){
                winChecker();
            }
        }
    }
}

function nextMove(position){
    if(currentMove == 2){
        loadBoard().children[position].classList.add("X");
        loadBoard().children[position].innerHTML = "X";
        playerMoves[1] = playerMoves[1].substring(0, position) + "1" + playerMoves[1].substring(position + 1);
        currentMove = 1;
    }else{
        loadBoard().children[position].classList.add("O");
        loadBoard().children[position].innerHTML = "O";
        playerMoves[0] = playerMoves[0].substring(0, position) + "1" + playerMoves[0].substring(position + 1);
        currentMove = 2;
    }
}

function isHover(event){
    if(event.type == "mouseover"){
        return true
    }else if(event.type == "mouseout"){
        return false
    }
}

function hoverHandler(event){
    index = Array.from(loadBoard().children).indexOf(event.target);
    if(isHover(event)){
        loadBoard().children[index].classList.add("hover");
    }else{
        loadBoard().children[index].classList.remove("hover");
    }
}

function winChecker(){
    for(comboCount = 0; comboCount <= winCombos.length-1; comboCount++){
        if(playerMoves[0] == winCombos[comboCount]){
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").innerHTML = "Congratulations! O is the Winner!";
            win = true;
        }else if(playerMoves[1] == winCombos[comboCount]){
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").innerHTML = "Congratulations! X is the Winner!";
            win = true;
        }
    }
}

function newGameHandler(event){
    if(moveAmount != 0){
        if(event){
            playerMoves = ["000000000", "000000000"];
            moveAmount = 0;
            win = false;
            document.getElementById("status").classList.remove("you-won");
            document.getElementById("status").innerHTML = "Move your mouse over a square and click to play an X or an O.";

            for(let count = 0; count <= loadBoard().children.length-1; count++){
                console.log(count)
                loadBoard().children[count].classList.remove("O");
                loadBoard().children[count].innerHTML = "";
                loadBoard().children[count].classList.remove("X");
            }
        }
    }
}

const winCombos = [
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
    
    ]

var win = false;
var currentMove = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
var playerMoves = ["000000000", "000000000"];
var moveAmount = 0;

window.onload = loadBoard;