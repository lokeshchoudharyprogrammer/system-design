const WinningStrategy = require("./WinningStrategy");




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



module.exports = RowWinningStrategy;