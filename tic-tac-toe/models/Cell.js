const SymbolType = require("../enums/Symbol");


class Cell {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.symbol = SymbolType.EMPTY;
    }

    isEmpty() {
        return this.symbol == SymbolType.EMPTY;
    }
}

module.exports = Cell;