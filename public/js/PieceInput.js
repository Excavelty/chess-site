export class PieceInput
{
    constructor(square, piece)
    {
        this.square = square;
        this.piece = piece;
        this.prepareSquareOnClick();
    }

    prepareSquareOnClick()
    {
        const squareHandle = this.square.getSquareHandle();
        squareHandle.addEventListener('click', () => {
            this.pieceSquare
        });
    }
}
