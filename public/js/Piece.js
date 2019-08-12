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
        if(this.checkIfCouldMove(newSquare))
        {
            this.square = newSquare;
            return true;
        }

        return false;
    }

    updateDrawings(oldSquare)
    {
          const oldSquareHTMLHandle = oldSquare.getSquareHandle();
          this.cleanIconFromPreviousSquare(oldSquareHTMLHandle);
          const currentSquareHTMLHandle = this.square.getSquareHandle();
          currentSquareHTMLHandle.textContent = this.pieceIcon;
    }

    cleanIconFromPreviousSquare(oldSquareHTMLHandle)
    {
        oldSquareHTMLHandle.textContent = '';
    }

    checkIfCouldMove(newSquare)
    {
        return true;
        //override
    }
}
