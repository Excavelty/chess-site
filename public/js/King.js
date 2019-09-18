import {Piece} from './Piece.js';

export class King extends Piece
{
    constructor(square, color)
    {
        super(square, color);
        if(color === 'white')
            this.pieceIcon = '♔';
        else
            this.pieceIcon = '♚';
        this.pieceImg = this.color + 'King.png';
        this.updateDrawings(this.square);
        this.allowCastle = true;
        this.disallowCastleCompletly = false;
        this.disallowKingsideCastle = false;
        this.disallowQueensideCastle = false;
    }

    move(newSquare)
    {
        if(super.move(newSquare))
        {
            this.allowCastle = false;
            this.disallowCastleCompletly = true;
            return true;
        }

        return false;
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        if(this.allowCastle)
        {
          if(this.color === 'white')
          {
              if(newCords.cordX === 'g' && newCords.cordY === 1 && this.disallowKingsideCastle === false
                || newCords.cordX === 'c' && newCords.cordY === 1 && this.disallowQueensideCastle === false)
              {
                  return true;
              }
          }

          if(this.color === 'black')
          {
              if(newCords.cordX === 'g' && newCords.cordY === 8 && this.disallowKingsideCastle === false
                || newCords.cordX === 'c' && newCords.cordY === 8 && this.disallowQueensideCastle === false)
               {
                  return true;
               }
          }
        }

        if(cords.cordY === newCords.cordY)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === this.shiftChar(newCords.cordX, 1))
              {
                  return true;
              }
            return false;
        }

        if(cords.cordY === newCords.cordY + 1
          || cords.cordY === newCords.cordY - 1)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, 1)
              || cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === newCords.cordX)
              {
                  return true;
              }
            return false;
        }

        else return false;
    }
}
