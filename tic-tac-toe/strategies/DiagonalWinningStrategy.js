const WinningStrategy = require("./WinningStrategy");

class DiagonalWinningStrategy extends WinningStrategy {

  checkWinner(board, move) {

    const symbol = move.player.symbol;
    let win = true;

    for (let i = 0; i < board.size; i++) {
      if (board.grid[i][i].symbol !== symbol) {
        win = false;
        break;
      }
    }

    if (win) return true;

    win = true;

    for (let i = 0; i < board.size; i++) {
      if (board.grid[i][board.size - i - 1].symbol !== symbol) {
        win = false;
        break;
      }
    }

    return win;
  }
}

module.exports = DiagonalWinningStrategy;