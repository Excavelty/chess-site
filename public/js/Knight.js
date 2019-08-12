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

        if(cords.cordX === String.fromCharCode(newCords.cordX.charCodeAt(0) + 1)
          || cords.cordX === String.fromCharCode(newCords.cordX.charCodeAt(0) - 1))
        {
            if(cords.cordY === newCords.cordY - 2 || cords.cordY === newCords.cordY + 2)
            {
                    return true;
            }
            return false;
        }

        else if(cords.cordX === String.fromCharCode(newCords.cordX.charCodeAt(0) + 2)
          || cords.cordX === String.fromCharCode(newCords.cordX.charCodeAt(0) -2))
        {
            if(cords.cordY === newCords.cordY - 1 || cords.cordY === newCords.cordY + 1)
                return true;
            return false;
        }

        else
          return false;
    }
}
