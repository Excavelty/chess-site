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
        this.updateDrawings(this.square);
        this.allowCastle = true;
        this.disallowCastleCompletly = false;
        this.disallowKingsideCastle = false;
        this.disallowQueensideCastle = false;
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        //console.log(this.allowCastle);
        if(this.allowCastle)
        {
          if(this.color === 'white')
          {
              if(newCords.cordX === 'g' && newCords.cordY === 1 && this.disallowKingsideCastle === false
                || newCords.cordX === 'c' && newCords.cordY === 1 && this.disallowQueensideCastle === false)
              {
                  this.allowCastle = false;
                  this.disallowCastleCompletly = true;
                  return true;
              }
          }

          if(this.color === 'black')
          {
              if(newCords.cordX === 'g' && newCords.cordY === 8 && this.disallowKingsideCastle === false
                || newCords.cordX === 'c' && newCords.cordY === 8 && this.disallowQueensideCastle === false)
               {
                  this.allowCastle = false;
                  this.disallowCastleCompletly = true;
                  return true;
               }
          }
        }

        if(cords.cordY === newCords.cordY)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === this.shiftChar(newCords.cordX, 1))
              {
                  this.allowCastle = false;
                  this.disallowCastleCompletly = true;
                  return true;
              }
            return false;
        }

        else if(cords.cordY === newCords.cordY + 1
          || cords.cordY === newCords.cordY - 1)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, 1)
              || cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === newCords.cordX)
              {
                  this.allowCastle = false;
                  this.disallowCastleCompletly = true;
                  return true;
              }
        }

        else return false;
    }
}
