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

    checkIfCouldMove(newSquare)//think of it low-priority
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        if(cords.cordX === newCords.cordX || cords.cordY === newCords.cordY)
            return true;
        return false;
    }
}
