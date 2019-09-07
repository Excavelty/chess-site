import {cloneDeep} from 'lodash';
import {PieceValidator} from './MoveValidators/PieceValidator.js';
import {King} from './King.js';
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
                if(this.pieces[i].checkIfCouldMove(kingSquare))
                {
                  this.addCheckColor(kingSquare);
                  let index = this.getPieceIndexBySqr(kingSquare);
                  return true;
                }
            }
        }

        return false;
    }

    seeIfWouldCauseCheck(pieceIndex, kingIndex, kingColor, newSquare)//work on that
    {
        const oldSquare = this.pieces[pieceIndex].square;
        let potentialyTakenPieceIndex = this.getPieceIndexBySqr(newSquare);

        if(potentialyTakenPieceIndex !== null && this.pieces[potentialyTakenPieceIndex].color === kingColor)
        {
            return true;
        }
        this.pieces[pieceIndex].square = newSquare;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(kingColor !== this.pieces[i].color)
            {
                if(this.pieces[i] instanceof Pawn)
                {
                    this.pieces[i].specialTakeAllowed = true;
                }
                if(i !== potentialyTakenPieceIndex && this.pieces[i].checkIfCouldMove(this.pieces[kingIndex].square))
                {
                    this.pieces[pieceIndex].square = oldSquare;
                    return true;
                }
            }
        }

        this.pieces[pieceIndex].square = oldSquare;
        return false;
    }

    seeIfHaveNoMove(kingIndex, kingColor)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color === kingColor)
            {
                for(let j = 0; j < this.squares.length; ++j)
                {
                  for(let k = 0; k < this.squares.length; ++k)
                  {
                     if(this.seeIfWouldCauseCheck(i, kingIndex, kingColor, this.squares[j][k]) === false
                        && this.pieces[i].checkIfCouldMove(this.squares[j][k]))
                      {
                            //console.log(this.pieces[i]);
                            //console.log(this.squares[j][k]);
                          return false;
                      }
                  }
                }
            }
        }

        return true;
    }

    /*seeIfWouldCauseCheck(pieceIndex, kingIndex, kingColor, newSquare)
    {
      //deep cloning
        let localPieces = cloneDeep(this.pieces);
        for(let i = 0; i < localPieces.length; ++i)
        {
            localPieces[i].square = this.pieces[i].square;
            let validator = new PieceValidator(localPieces, this.squares);
            localPieces[i].setValidator(validator);
        }

        let potentialPieceIndex = this.getPieceIndexBySqr(newSquare);
        if(potentialPieceIndex !== null && localPieces[potentialPieceIndex].color === localPieces[pieceIndex].color)
        {
            return true;
        }

        localPieces[pieceIndex].square = newSquare;//simulate move;

        for(let i = 0; i < localPieces.length; ++i)
        {
            localPieces[i].allowTake = true;

            if(localPieces[i].color !== kingColor)
            {
                if(i !== potentialPieceIndex && localPieces[i].checkIfCouldMove(localPieces[kingIndex].square))
                  return true;
            }
        }
        return false;
    }

    seeIfHaveNoMove(kingIndex, kingColor)
    {
        let localPieces = cloneDeep(this.pieces);
        for(let i = 0; i < this.pieces.length; ++i)
        {
          if(this.pieces[i].color === kingColor)
            for(let j = 0; j < this.squares.length; ++j)
              for(let k = 0; k < this.squares[j].length; ++k)
              {
                  localPieces[i].square =  this.pieces[i].square;
                  localPieces[i].setValidator(new PieceValidator(localPieces, this.squares));
                  if(this.seeIfWouldCauseCheck(i, kingIndex, kingColor, this.squares[j][k]) === false
                    && localPieces[i].checkIfCouldMove(this.squares[j][k]))
                    return false;
              }
        }

        return true;
    }*/

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
