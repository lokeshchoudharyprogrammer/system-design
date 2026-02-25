const GameStatus = require("./enums/GameStatus");
const Move = require("./models/Move");

class Game {

  constructor(players, board) {
    this.players = players;
    this.board = board;
    this.currentPlayerIndex = 0;
    this.status = GameStatus.IN_PROGRESS;
  }

  makeMove(row, col) {

    const player =
      this.players[this.currentPlayerIndex];

    const move = new Move(player, row, col);

    const isWinner =
      this.board.placeMove(move);

    if (isWinner) {
      this.status = GameStatus.WINNER;
      console.log(`${player.name} wins`);
      return;
    }

    this.switchTurn();
  }

  switchTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) %
      this.players.length;
  }
}

module.exports = Game;