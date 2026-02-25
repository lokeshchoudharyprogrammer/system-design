const Player = require("./models/Player");
const Board = require("./models/Board");

const RowWinningStrategy =
require("./strategies/RowWinningStrategy");

const ColumnWinningStrategy =
require("./strategies/ColumnWinningStrategy");

const DiagonalWinningStrategy =
require("./strategies/DiagonalWinningStrategy");

const SymbolType =
require("./enums/Symbol");

const Game = require("./Game");

const players = [
    new Player("Arpit", SymbolType.O),
    new Player("Lokesh", SymbolType.X)
];

const strategies = [
  new RowWinningStrategy(),
  new ColumnWinningStrategy(),
  new DiagonalWinningStrategy()
];

const board = new Board(3, strategies);

const game = new Game(players, board);

game.makeMove(0,0);
game.makeMove(1,0);
game.makeMove(0,1);
game.makeMove(1,1);
game.makeMove(0,2);


// [0,0,0]
// [0,0,0]
// [0,0,0]
