export class SquareInput
{
    constructor(square, pieces)
    {
        this.square = square;
        this.pieces = pieces;
        this.prepareSquareClick();
    }

    prepareSquareClick()
    {
        const squareHandle = this.square.getSquareHandle();
        const self = this;
        squareHandle.addEventListener('click', () => {
            this.squareClick();
        });
    }

    squareClick()
    {
        console.log(this);
        const containedPiece = this.checkIfSquareContainingPiece();
        const ownedPiece = this.checkIfPieceOwned();

        if(containedPiece !== null)
        {
            if(ownedPiece !== null)
            {
                const sameColors = this.checkIfSameColors(ownedPiece, containedPiece);
                if(sameColors)
                    this.ownPiece(containedPiece);
                else
                {
                    this.takePiece(containedPiece);
                    this.putPiece(ownedPiece);
                }
            }

            else
            {
                this.ownPiece(containedPiece);
            }
        }

        else
        {
            if(isOwned)
            {
                this.putPiece(ownedPiece);
            }
        }
    }

    checkIfSquareContainingPiece()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].square === this.square)
                return i;
        }

        return null;
    }

    ownPiece(piece)
    {
        for(let i = 0; i < piece.length; ++i)
        {
            if(piece.square === this.square)
                piece.isOwned = true;
        }
    }

    checkIfPieceOwned()
    {
        for(let i = 0; i < piece.length; ++i)
        {
            if(this.pieces[i].isOwned)
                return i;
        }

        return null;
    }

    checkIfSameColors(ownedPiece, containedPiece)
    {
        return (pieces[ownedPiece].color === pieces[containedPiece].color);
    }

    putPiece(pieceIndex)
    {
        const oldSquare = this.pieces[pieceIndex].square;
        this.pieces[pieceIndex].move(square);
        this.pieces[pieceIndex].updateDrawings(square);
    }

    takePiece(pieceIndex)
    {
        this.pieces.splice(pieceIndex);
    }
}
