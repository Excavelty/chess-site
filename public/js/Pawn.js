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
    }

    updateDrawings(oldSquare)
    {
          const oldSquareHTMLHandle = document.querySelector('#square'+oldSquare.cords.cordX
            +oldSquare.cords.cordY);
          this.cleanIconFromPreviousSquare(oldSquareHTMLHandle);
          const currentSquareHTMLHandle = document.querySelector('#square'
            +this.square.cords.cordX+this.square.cords.cordY);
          currentSquareHTMLHandle.textContent = this.pieceIcon;
    }
}
