export class CheckmateControl
{
    constructor(pieces, squares)
    {
        this.pieces = pieces;
        this.squares = squares;
    }

    seeIfCheck(color, kingSquare)
    {
        let compareColor = 'white';
        if(color === 'white')
          compareColor = 'black';

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color === compareColor)
            {
                this.pieces[i].allowTake = true;
                if(this.pieces[i].checkIfCouldMove(kingSquare))
                {
                  this.addCheckColor(kingSquare);
                  let index = this.getPieceIndexBySqr(kingSquare);
                  this.pieces[index].allowCastle = false;
                  return true;
                }
            }
        }

        return false;
    }

    seeIfWouldCauseCheck(pieceIndex, kingIndex, kingColor, newSquare)//work on that
    {
        let oldSquare = this.pieces[pieceIndex].square;
        let potentialPieceIndex = this.getPieceIndexBySqr(newSquare);
        this.pieces[pieceIndex].square = newSquare;
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color !== kingColor)
            {
                this.pieces[i].allowTake = true;
                if(potentialPieceIndex !== i && this.pieces[i].checkIfCouldMove(this.pieces[kingIndex].square))
                {
                    this.pieces[pieceIndex].square = oldSquare;
                    this.pieces[kingIndex].square.changeColor('yellow');
                    return true;
                }
            }
        }

        this.pieces[pieceIndex].square = oldSquare;
        this.pieces[kingIndex].square.changeColor();
        return false;
    }

    seeIfHaveNoMove(kingIndex, kingColor)
    {
        let flattenedSquareArray = this.squares.reduce((acc, val) => acc.concat(val), []);
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color === kingColor)
            {
                for(let j = 0; j < flattenedSquareArray.length; ++j)
                {
                    let potentialPieceIndex = this.getPieceIndexBySqr(flattenedSquareArray[j]);
                    if(this.seeIfWouldCauseCheck(i, kingIndex, kingColor, flattenedSquareArray[j]) === false
                      && this.pieces[i].checkIfCouldMove(flattenedSquareArray[j]));
                        return false;
                }
            }
        }

        return true;
    }

    getPieceIndexBySqr(square)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].square === square)
                return i;
        }

        return null;
    }

    addCheckColor(square)
    {
        let handle = square.getSquareHandle();
        handle.style.backgroundColor = 'yellow';
    }

    deepClonePieces()
    {
        let newArray = [];
        for(let i = 0; i < this.pieces.length; ++i)
            newArray[i] = new Piece()
    }
}
