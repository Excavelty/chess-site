import {cloneDeep} from 'lodash/cloneDeep';
import {PieceValidator} from './MoveValidators/PieceValidator.js';

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
        const localPieces = _.cloneDeep(this.pieces);//to do: work on checkmates
        localPieces[pieceIndex].square = newSquare;
        let localValidator = new PieceValidator(localPieces, this.squares)
        for(let i = 0; i < localPieces.length; ++i)
        {
            localPieces[i].setValidator(localValidator);
            if(localPieces[i].color !== kingColor)
            {
                if(localPieces[i].checkIfCouldMove(localPieces[kingIndex].square))
                {
                    console.log(localPieces[pieceIndex].square);
                    console.log(localPieces[kingIndex].square);
                    return true;
                }
            }
        }

        this.pieces[kingIndex].square.changeColor();
        return false;
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
