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
}
