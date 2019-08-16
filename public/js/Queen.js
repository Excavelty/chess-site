import {Piece} from './Piece.js';

export class Queen extends Piece
{
    constructor(square, color)
    {
        super(square, color);
        if(color === 'white')
            this.pieceIcon = '♕';
        else
            this.pieceIcon = '♛';
        this.updateDrawings(this.square);
    }

    checkIfCouldMove(newSquare)
    {
        return this.validator.validateDiagonally(this.square, newSquare) || this.validator.validateStraight(this.square, newSquare);
    }
}
