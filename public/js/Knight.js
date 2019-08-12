import {Piece} from './Piece.js';

export class Knight extends Piece
{
    constructor(square, color)
    {
        super(square, color);
        if(color === 'white')
            this.pieceIcon = '♘';
        else
            this.pieceIcon = '♞';
        this.updateDrawings(this.square);
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        if(cords.cordX === this.shiftChar(newCords.cordX, 1)
          || cords.cordX === this.shiftChar(newCords.cordX, -1))
        {
            if(cords.cordY === newCords.cordY - 2 || cords.cordY === newCords.cordY + 2)
            {
                    return true;
            }
            return false;
        }

        else if(cords.cordX === this.shiftChar(newCords.cordX, 2)
          || cords.cordX === this.shiftChar(newCords.cordX, -2))
        {
            if(cords.cordY === newCords.cordY - 1 || cords.cordY === newCords.cordY + 1)
                return true;
            return false;
        }

        else
          return false;
    }
}
