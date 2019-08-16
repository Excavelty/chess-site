import {Piece} from './Piece.js';

export class Rook extends Piece
{
    constructor(square, color)
    {
        super(square, color);
        if(color === 'white')
            this.pieceIcon = '♖';
        else
            this.pieceIcon = '♜';
        this.updateDrawings(this.square);
        this.allowCastle = false;
    }

    checkIfCouldMove(newSquare)
    {
        return this.validator.validateStraight(this.square, newSquare);
    }
}
