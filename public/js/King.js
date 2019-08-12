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
    }

    checkIfCouldMove(newSquare)
    {
        let cords = this.square.cords;
        let newCords = newSquare.cords;

        console.log(cords);
        console.log(newCords);

        if(this.allowCastle)
        {
          if(this.color === 'white')
          {
              console.log('okokk');
              if(newCords.cordX === 'g' && newCords.cordY === 1
                || newCords.cordX === 'c' && newCords.cordY === 1)
              {
                  this.allowCastle = false;
                  return true;
              }
          }

          if(this.color === 'black')
          {
              if(newCords.cordX === 'g' && newCords.cordY === 8
                || newCords.cordX === 'c' && newCords.cordY === 8)
               {
                  this.allowCastle = false;
                  return true;
               }
          }
        }

        if(cords.cordY === newCords.cordY)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === this.shiftChar(newCords.cordX, 1))
              return true;
            return false;
        }

        else if(cords.cordY === newCords.cordY + 1
          || cords.cordY === newCords.cordY - 1)
        {
            if(cords.cordX === this.shiftChar(newCords.cordX, 1)
              || cords.cordX === this.shiftChar(newCords.cordX, -1)
              || cords.cordX === newCords.cordX)
              return true;
        }

        else
          return false;
    }
}
