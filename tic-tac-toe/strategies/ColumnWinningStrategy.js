const WinningStrategy = require("./WinningStrategy");

class ColumnWinningStrategy extends WinningStrategy {

  checkWinner(board, move) {

    const col = move.col;
    const symbol = move.player.symbol;

    for (let row = 0; row < board.size; row++) {
      if (board.grid[row][col].symbol !== symbol) {
        return false;
      }
    }

    return true;
  }
}

module.exports = ColumnWinningStrategy;