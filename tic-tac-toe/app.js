// Enums
const SymbolType = {
    X: "X",
    O: "O",
    EMPTY: null
};

const GameStatus = {
    IN_PROGRESS: "IN_PROGRESS",
    WINNER: "WINNER",
    DRAW: "DRAW"
};

// Models
class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.symbol = SymbolType.EMPTY;
    }
    isEmpty() {
        return this.symbol === SymbolType.EMPTY;
    }
}

// Strategies
class WinningStrategy {
    checkWinner(board, move) {}
}

class RowWinningStrategy extends WinningStrategy {
    checkWinner(board, move) {
        let row = move.row;
        const symbol = move.player.symbol;
        for (let k = 0; k < board.size; k++) {
            if (board.grid[row][k].symbol !== symbol) {
                return false;
            }
        }
        return true;
    }
}

class ColumnWinningStrategy extends WinningStrategy {
    checkWinner(board, move) {
        let col = move.col;
        const symbol = move.player.symbol;
        for (let k = 0; k < board.size; k++) {
            if (board.grid[k][col].symbol !== symbol) {
                return false;
            }
        }
        return true;
    }
}

class DiagonalWinningStrategy extends WinningStrategy {
    checkWinner(board, move) {
        const symbol = move.player.symbol;
        let size = board.size;
        
        // Main diagonal
        if (move.row === move.col) {
            let win = true;
            for (let i = 0; i < size; i++) {
                if (board.grid[i][i].symbol !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        // Anti-diagonal
        if (move.row + move.col === size - 1) {
            let win = true;
            for (let i = 0; i < size; i++) {
                if (board.grid[i][size - 1 - i].symbol !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        return false;
    }
}

class Board {
    constructor(size, strategies) {
        this.size = size;
        this.strategies = strategies;
        this.grid = [];
        this.initializeBoard();
    }

    initializeBoard() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(new Cell(i, j));
            }
            this.grid.push(row);
        }
    }

    isValidMove(row, col) {
        return (
            row >= 0 &&
            col >= 0 &&
            row < this.size &&
            col < this.size &&
            this.grid[row][col].isEmpty()
        );
    }

    placeMove(move) {
        if (!this.isValidMove(move.row, move.col)) {
            throw new Error("Invalid Move");
        }
        this.grid[move.row][move.col].symbol = move.player.symbol;
        return this.checkWinner(move);
    }

    checkWinner(move) {
        for (let strategy of this.strategies) {
            if (strategy.checkWinner(this, move)) {
                return true;
            }
        }
        return false;
    }

    isFull() {
        return this.grid.every(row => row.every(cell => !cell.isEmpty()));
    }
}

class Move {
    constructor(player, row, col) {
        this.player = player;
        this.row = row;
        this.col = col;
    }
}

class Game {
    constructor(players, board) {
        this.players = players;
        this.board = board;
        this.currentPlayerIndex = 0;
        this.status = GameStatus.IN_PROGRESS;
    }

    makeMove(row, col) {
        if (this.status !== GameStatus.IN_PROGRESS) return;

        const player = this.players[this.currentPlayerIndex];
        const move = new Move(player, row, col);

        const isWinner = this.board.placeMove(move);

        if (isWinner) {
            this.status = GameStatus.WINNER;
            return;
        }

        if (this.board.isFull()) {
            this.status = GameStatus.DRAW;
            return;
        }

        this.switchTurn();
    }

    switchTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetBtn = document.getElementById('reset');

    let game;

    function initGame() {
        const players = [
            new Player("Player X", SymbolType.X),
            new Player("Player O", SymbolType.O)
        ];

        const strategies = [
            new RowWinningStrategy(),
            new ColumnWinningStrategy(),
            new DiagonalWinningStrategy()
        ];

        const board = new Board(3, strategies);
        game = new Game(players, board);

        renderBoard();
        updateStatus();
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                const symbol = game.board.grid[i][j].symbol;
                if (symbol) {
                    cell.textContent = symbol;
                    cell.classList.add(symbol.toLowerCase());
                    cell.classList.add('taken');
                }
                cell.addEventListener('click', () => handleMove(i, j));
                boardElement.appendChild(cell);
            }
        }
    }

    function handleMove(row, col) {
        if (game.board.isValidMove(row, col) && game.status === GameStatus.IN_PROGRESS) {
            game.makeMove(row, col);
            renderBoard();
            updateStatus();
        }
    }

    function updateStatus() {
        if (game.status === GameStatus.WINNER) {
            const winner = game.players[game.currentPlayerIndex];
            statusElement.textContent = `${winner.name} Wins!`;
            statusElement.style.color = winner.symbol === SymbolType.X ? '#d93025' : '#1a73e8';
        } else if (game.status === GameStatus.DRAW) {
            statusElement.textContent = "It's a Draw!";
            statusElement.style.color = '#5f6368';
        } else {
            const currentPlayer = game.getCurrentPlayer();
            statusElement.textContent = `${currentPlayer.name}'s Turn`;
            statusElement.style.color = currentPlayer.symbol === SymbolType.X ? '#d93025' : '#1a73e8';
        }
    }

    resetBtn.addEventListener('click', initGame);

    initGame();
});
