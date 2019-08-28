import {cloneDeep} from 'lodash/cloneDeep';
import {PieceValidator} from './MoveValidators/PieceValidator.js';
import {King} from './King.js';
import {Queen} from './Queen.js';
import {Bishop} from './Bishop.js';
import {Knight} from './Knight.js';
import {Pawn} from './Pawn.js';
import {Rook} from './Rook.js';

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
                  return true;
                }
            }
        }

        return false;
    }

    seeIfWouldCauseCheck(pieceIndex, kingIndex, kingColor, newSquare)//work on that
    {
        let oldSquare = this.pieces[pieceIndex].square;
        this.pieces[pieceIndex].square = newSquare;
        let potentialPieceIndex = this.getPieceIndexBySqr(newSquare);
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].color !== kingColor)
            {
                if(this.pieces[i].checkIfCouldMove(this.pieces[kingIndex].square) && potentialPieceIndex !== i)
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
