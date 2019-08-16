export class PieceValidator
{
    constructor(pieces, squares)
    {
        this.pieces = pieces;
        this.squares = squares;
        this.squaresNum = squares.length;
    }

    validateMove(piece)
    {
        //check if it does not cause check
        return true;
    }

    getPieceIndexBySqr(square)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(square === this.pieces[i].square)
                return i;
        }

        return null;
    }

    validateDiagonally(square, newSquare)
    {
        const cords = square.cords;
        const newCords = newSquare.cords;

        const cordXIndex = cords.cordX.charCodeAt(0) - 97;
        const cordYIndex = cords.cordY - 1;

        if(newCords.cordX < cords.cordX)
        {
            if(newCords.cordY < cords.cordY)
            {
                return this.diagonalValidationLoop(cordXIndex, cordYIndex, -1, -1, newSquare);
            }

            else if(newCords.cordY > cords.cordY)
            {
                return this.diagonalValidationLoop(cordXIndex, cordYIndex, -1, 1, newSquare);
            }

            else return false;
        }

        else if(newCords.cordX > cords.cordX)
        {
            if(newCords.cordY < cords.cordY)
            {
                return this.diagonalValidationLoop(cordXIndex, cordYIndex, 1, -1, newSquare);
            }

            else if(newCords.cordY > cords.cordY)
            {
                return this.diagonalValidationLoop(cordXIndex, cordYIndex, 1, 1, newSquare);
            }
        }

        else return false;
    }

    diagonalValidationLoop(firstIter, secondIter, firstChange, secondChange, newSquare)
    {
       console.log(firstIter);
       console.log(secondIter);
       console.log(firstChange);
       console.log(secondChange);
       console.log(newSquare);

       firstIter += firstChange;
       secondIter += secondChange;

        while(firstIter >= 0 && secondIter >= 0 && firstIter < this.squaresNum && secondIter < this.squaresNum)
        {
            let currentSquare = this.squares[firstIter][secondIter];

            if(currentSquare === newSquare)
            {
                return true;
            }

            const pieceIndex = this.getPieceIndexBySqr(currentSquare);
            if(pieceIndex !== null)
              return false;

            firstIter += firstChange;
            secondIter += secondChange;
        }

        return false;
    }
}
