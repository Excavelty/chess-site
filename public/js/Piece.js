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

    cleanIconFromPreviousSquare(oldSquareHTMLHandle)
    {
        oldSquareHTMLHandle.textContent = '';
    }
}
