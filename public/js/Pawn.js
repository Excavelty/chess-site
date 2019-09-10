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

    move(newSquare)
    {
        if(super.move(newSquare))
        {
            this.allowDoubleMove = false;
            this.specialTakeAllowed = false;
            return true;
        }

        return false;
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        if(cords.cordX === this.shiftChar(newCords.cordX, 1)
          || cords.cordX === this.shiftChar(newCords.cordX, -1))
        {
            if(this.validator.validateIfOpponentPieceOnTheNewSquare(this.square, newSquare) === false
            && this.specialTakeAllowed !== true)
                return false;
            this.specialTakeAllowed = false;
            if(this.color === 'white' && cords.cordY === newCords.cordY - 1)
            {
                return true;
            }
            else if(this.color === 'black' && cords.cordY === newCords.cordY + 1)
            {
                return true;
            }
        }

        if(this.allowDoubleMove)
        {
            if(this.validator.validateStraight(this.square, newSquare) === false)
            {
                return false;
            }
            switch(this.color)
            {
                case 'white': {
                    if(cords.cordY === newCords.cordY - 2 && cords.cordX === newCords.cordX)
                    {
                        if(this.validator.validateIfOpponentPieceOnTheNewSquare(this.square, newSquare) === true)
                            return false;
                        this.allowEnPassant = true;
                        return true;
                    }
                } break;

                default: {
                    if(cords.cordY === newCords.cordY + 2 && cords.cordX === newCords.cordX)
                    {
                        if(this.validator.validateIfOpponentPieceOnTheNewSquare(this.square, newSquare) === true)
                          return false;
                        this.allowEnPassant = true;
                        return true;
                    }
                }
            }
        }

        if(this.color === 'white' && cords.cordY === newCords.cordY - 1 && cords.cordX === newCords.cordX)
        {
            if(this.validator.validatePawnForwardMove(this.square, newSquare) === false)
              return false;
            return true;
        }

        else if(this.color === 'black' && cords.cordY === newCords.cordY + 1 && cords.cordX === newCords.cordX)
        {
          if(this.validator.validatePawnForwardMove(this.square, newSquare) === false)
            return false;
          return true;
        }

        else
        {
            return false
        };
    }
}
