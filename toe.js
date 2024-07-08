const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;  
    console.log("Game initialized");
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellindex");
    console.log(`Cell ${cellIndex} clicked`);

    if (options[cellIndex] != "" || !running) {
        console.log(`Cell ${cellIndex} is already taken or game not running`);
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;  
    cell.textContent = currentPlayer;  
    console.log(`Cell ${index} updated to ${currentPlayer}`);
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    console.log(`Player changed to ${currentPlayer}`);
}

function checkWinner() {
    let roundWin = false;
    let winningCondition = null;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWin = true;
            winningCondition = condition;
            break;
        }
    }

    if (roundWin) {
        statusText.textContent = `${currentPlayer} Wins!`;
        console.log(`${currentPlayer} wins`);
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = 'Draw!';
        console.log('Draw');
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;  // Set running to true when restarting the game
    console.log("Game restarted");  


}
