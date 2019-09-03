import {Pawn} from './Pawn.js';

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

        if(potentialPieceIndex !== null && this.pieces[potentialPieceIndex].color === kingColor)
          return true;
        else if(potentialPieceIndex !== null && this.pieces[potentialPieceIndex].color !== kingColor
          && this.pieces[pieceIndex] instanceof Pawn && (this.pieces[pieceIndex].square.cords.cordX === newSquare.cords.cordX
            || this.pieces[pieceIndex].square.cords.cordY === newSquare.cords.cordY))//needed to disallow 'taking' with just moving forward
            return true;
        this.pieces[pieceIndex].square = newSquare;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color !== kingColor)
            {
                this.pieces[i].allowTake = true;
                let allowDoubleMove = this.pieces[i] instanceof Pawn? this.pieces[i].allowDoubleMove : null;

                if(potentialPieceIndex !== i && this.pieces[i].checkIfCouldMove(this.pieces[kingIndex].square))
                {
                    this.pieces[pieceIndex].square = oldSquare;
                    if(this.pieces[i] instanceof Pawn)
                    {
                      this.pieces[i].allowDoubleMove = allowDoubleMove;
                    }
                    return true;
                }
            }
        }


        //if(pieceIndex === kingIndex)
        //console.log(this.pieces[pieceIndex].square);
        this.pieces[pieceIndex].square = oldSquare;
        return false;
    }

    seeIfHaveNoMove(kingIndex, kingColor)
    {
        let disallowCastleCompletly = this.pieces[kingIndex].disallowCastleCompletly;
        let allowCastle = this.pieces[kingIndex].allowCastle;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color === kingColor)
            {
                for(let j = 0; j < this.squares.length; ++j)
                  for(let k = 0; k < this.squares[j].length; ++k)
                  {
                      let allowDoubleMove = this.pieces[i] instanceof Pawn? this.pieces[i].allowDoubleMove : null;
                      let allowTake = this.pieces[i] instanceof Pawn? this.pieces[i].allowTake : null;

                      if(this.seeIfWouldCauseCheck(i, kingIndex, kingColor, this.squares[j][k]) === false
                        && this.pieces[i].checkIfCouldMove(this.squares[j][k]))
                        {
                           if(i === kingIndex)
                           {
                              this.pieces[kingIndex].disallowCastleCompletly = disallowCastleCompletly;
                              this.pieces[kingIndex].allowCastle = allowCastle;
                           }

                           if(allowDoubleMove !== null)
                           {
                              this.pieces[i].allowDoubleMove = allowDoubleMove;
                              //this.pieces[i].allowTake = allowTake;
                           }
                           return false;
                        }

                        if(allowDoubleMove !== null)
                        {
                           this.pieces[i].allowDoubleMove = allowDoubleMove;
                           this.pieces[i].allowTake = allowTake;
                        }
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
}
