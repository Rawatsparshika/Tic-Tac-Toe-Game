document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    
    let currentPlayer = 'X';
    let gameActive = true;
    const boardState = Array(9).fill(null);

    const createBoard = () => {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.dataset.index = i;
            cell.addEventListener('click', handleClick);
            board.appendChild(cell);
        }
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (boardState[index] || !gameActive) return;
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (boardState.every(cell => cell)) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const restartGame = () => {
        boardState.fill(null);
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        Array.from(board.children).forEach(cell => cell.textContent = '');
    };

    restartButton.addEventListener('click', restartGame);

    createBoard();
    status.textContent = `Player ${currentPlayer}'s turn`;
});
