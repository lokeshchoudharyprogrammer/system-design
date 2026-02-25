const Cell = require("./Cell");

class Board {

  constructor(size, strategies) {
    this.size = size;
    this.strategies = strategies;
    this.grid = [];

    this.initializeBoard();
  }

  initializeBoard() {

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

    this.grid[move.row][move.col].symbol =
      move.player.symbol;

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
}

module.exports = Board;