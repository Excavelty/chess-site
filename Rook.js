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
        this.pieceImg = this.color + 'Rook.png';
        this.updateDrawings(this.square);
        this.allowCastle = true;
    }

    checkIfCouldMove(newSquare)
    {
        return this.validator.validateStraight(this.square, newSquare);
    }

    move(newSquare)
    {
        if(super.move(newSquare))
        {
            this.allowCastle = false;
            return true;
        }

        return false;
    }
}
