export class Piece
{
    constructor(square)
    {
        this.square = square;
        this.cords = this.square.cords;
    }

    move(newCords)
    {
        this.cords = newCords;
        return true;
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

    cleanIconFromPreviousSquare(oldSquareHTMLHandle)
    {
        oldSquareHTMLHandle.textContent = '';
    }
}
