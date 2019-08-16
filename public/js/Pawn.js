import {Piece} from './Piece.js';

export class Pawn extends Piece
{
    constructor(square, color)
    {
          super(square, color);
          if(color === 'white')
              this.pieceIcon = '♙';
          else
              this.pieceIcon = '♟';
          this.updateDrawings(this.square);
          this.allowDoubleMove = true;
          this.allowTake = false;
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        if(this.allowTake)
        {
            this.allowTake = false;
              if(cords.cordX === this.shiftChar(newCords.cordX, 1)
                || cords.cordX === this.shiftChar(newCords.cordX, -1))
                {
                    if(this.color === 'white' && cords.cordY === newCords.cordY - 1)
                      return true;
                    else if(this.color === 'black' && cords.cordY === newCords.cordY + 1)
                      return true;
                    else
                      return false;
                }
              else
                return false;
        }

        if(this.allowDoubleMove)
        {
            switch(this.color)
            {
                case 'white': {
                    if(cords.cordY === newCords.cordY - 2 && cords.cordX === newCords.cordX)
                    {
                        this.allowDoubleMove = false;
                        return true;
                    }
                } break;

                default: {
                    if(cords.cordY === newCords.cordY + 2 && cords.cordX === newCords.cordX)
                    {
                        this.allowDoubleMove = false;
                        return true;
                    }
                }
            }
        }

        if(this.color === 'white' && cords.cordY === newCords.cordY - 1 && cords.cordX === newCords.cordX)
        {
            this.allowDoubleMove = false;
            return true;
        }

        else if(this.color === 'black' && cords.cordY === newCords.cordY + 1 && cords.cordX === newCords.cordX)
        {
            this.allowDoubleMove = false;
            return true;
        }

        else return false;
    }
}
