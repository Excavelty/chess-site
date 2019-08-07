export class Piece
{
    constructor(square, color)
    {
        this.square = square;
        this.color = color;
        this.cords = this.square.cords;
        this.isOwned = false;
    }

    move(newSquare)
    {
        this.square = newSquare;
        return true;
    }

    updateDrawings(oldSquare)
    {
          const oldSquareHTMLHandle = oldSquare.getSquareHandle();///document.querySelector('#square'+oldSquare.cords.cordX
            //+oldSquare.cords.cordY);
          this.cleanIconFromPreviousSquare(oldSquareHTMLHandle);
          const currentSquareHTMLHandle = this.square.getSquareHandle();//this.square.getSquareHandle();//document.querySelector('#square'
            //+this.square.cords.cordX+this.square.cords.cordY);
          currentSquareHTMLHandle.textContent = this.pieceIcon;
    }

    cleanIconFromPreviousSquare(oldSquareHTMLHandle)
    {
        oldSquareHTMLHandle.textContent = '';
    }
}
