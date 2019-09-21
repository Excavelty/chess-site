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
                  this.pieces[index].allowCastle = false;
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
        let rememberOfEnPassanted = false;

        if(potentialyTakenPieceIndex !== null && this.pieces[potentialyTakenPieceIndex].color === kingColor)
        {
            return true;
        }

        if(potentialyTakenPieceIndex === null && this.pieces[pieceIndex] instanceof Pawn)
        {
            potentialyTakenPieceIndex = this.getEnPassantedPawnIfPossible(newSquare, kingColor);
            if(potentialyTakenPieceIndex !== null)
            {
                  console.log(this.pieces[potentialyTakenPieceIndex]);
                  rememberOfEnPassanted = true;
            }
        }

        this.pieces[pieceIndex].square = newSquare;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(kingColor !== this.pieces[i].color)
            {
                let allowEnPassantRemember = this.pieces[i].allowEnPassant;
                if(this.pieces[i] instanceof Pawn)
                {
                    this.pieces[i].specialTakeAllowed = true;
                    //this.pieces[i].allowEnPassant = allowEnPassantRemember;
                }

                if(i !== potentialyTakenPieceIndex &&
                  this.pieces[i].checkIfCouldMove(this.pieces[kingIndex].square))
                {
                    this.pieces[pieceIndex].square = oldSquare;
                    if(this.pieces[i] instanceof Pawn)
                    {
                        this.pieces[i].specialTakeAllowed = false;
                        //this.pieces[i].allowEnPassant = allowEnPassantRemember;
                    }
                    return true;
                }

                if(this.pieces[i] instanceof Pawn)
                {
                    this.pieces[i].specialTakeAllowed = false;
                    //this.pieces[i].allowEnPassant = allowEnPassantRemember;
                }
            }
        }

        this.pieces[pieceIndex].square = oldSquare;
        this.pieces[pieceIndex].enPassantIndex = false;
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
                          this.pieces[i].enPassantIndex = false;
                          return false;
                      }

                      this.pieces[i].enPassantIndex = false;
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

    getEnPassantedPawnIfPossible(square, color)
    {
        switch(color)
        {
            case 'white': {
                let piece = this.getPieceIndexBySqr(this.squares[square.cords.cordX.charCodeAt(0) - 97][square.cords.cordY - 2]);
                if(piece !== null && this.pieces[piece].allowEnPassant === true)
                    return piece;
                return null;
            } break;

            default :
            {
                let piece = this.getPieceIndexBySqr(this.squares[square.cords.cordX.charCodeAt(0) - 97][square.cords.cordY]);
                if(piece !== null && this.pieces[piece].allowEnPassant === true)
                    return piece;
                return null;
            }
        }
    }

    addCheckColor(square)
    {
        let handle = square.getSquareHandle();
        handle.style.backgroundColor = 'yellow';
    }
}
