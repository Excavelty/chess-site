import {SpecialMoves} from './SpecialMoves.js';
import {King} from './King.js';
import {Square} from './Square.js';

export class SquareInput
{
    constructor(square, pieces, squares, playersColor)
    {
        this.playersColor = playersColor;
        this.square = square;
        this.squares = squares;
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
        const containedPiece = this.checkIfSquareContainingPiece();
        const ownedPiece = this.checkIfPieceOwned();
        console.log(containedPiece);
        console.log(ownedPiece);

        if(containedPiece !== null)
        {

            if(ownedPiece !== null)
            {
                const sameColors = this.checkIfSameColors(ownedPiece, containedPiece);
                if(sameColors)
                {
                    this.unOwnPiece(ownedPiece);
                    this.ownPiece(containedPiece);
                }
                else
                {
                    this.unOwnPiece(ownedPiece);
                    this.putPiece(ownedPiece);
                    this.takePiece(containedPiece);
                }
            }

            else
            {
                this.ownPiece(containedPiece);
            }
        }

        else
        {
            if(ownedPiece !== null)
            {
                if(this.pieces[ownedPiece] instanceof King)
                {
                    let kingSquare = this.pieces[ownedPiece].square;
                    const kingSqrCordXChrCode = kingSquare.cords.cordX.charCodeAt(0);
                    const kingSqrCordYIndex = kingSquare.cords.cordY - 1;
                    let firstRookSquare = this.squares
                     [kingSqrCordXChrCode - 97 + 3][kingSquare.cords.cordY - 1];
                    let secondRookSquare = this.squares
                     [kingSqrCordXChrCode - 97 - 4][kingSquare.cords.cordY - 1];
                    let firstCompSquare = this.squares[kingSqrCordXChrCode - 97 + 2][kingSqrCordYIndex];
                    let secondCompSquare = this.squares[kingSqrCordXChrCode - 97 - 2][kingSqrCordYIndex];

                    if(this.square === firstCompSquare)
                    {
                        let newSquare = this.squares[kingSqrCordXChrCode - 97 + 1][kingSqrCordYIndex];
                        let rook = this.getPieceBySquare(firstRookSquare);
                        if(rook)
                            SpecialMoves.castle(rook, newSquare);
                    }

                    else if(this.square === secondCompSquare)
                    {
                        let newSquare = this.squares[kingSqrCordXChrCode - 97 - 1][kingSqrCordYIndex];
                        let rook = this.getPieceBySquare(secondRookSquare);
                        if(rook)
                            SpecialMoves.castle(rook, newSquare);
                    }
                }

                this.unOwnPiece(ownedPiece);
                this.putPiece(ownedPiece);
            }
        }
    }

    getPieceBySquare(sqr)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].square === sqr)
                return this.pieces[i];
        }
        return null;
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

    checkIfPieceOwned()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].isOwned)
                return i;
        }
        return null;
    }

    ownPiece(pieceIndex)
    {
        if(this.pieces[pieceIndex].color === this.playersColor)
        {
            this.pieces[pieceIndex].square.changeColor('green');
            this.pieces[pieceIndex].isOwned = true;
        }
    }

    unOwnPiece(pieceIndex)
    {
        this.pieces[pieceIndex].square.changeColor();
        this.pieces[pieceIndex].isOwned = false;
    }

    checkIfSameColors(ownedPiece, containedPiece)
    {
        return (this.pieces[ownedPiece].color === this.pieces[containedPiece].color);
    }

    putPiece(pieceIndex)
    {
        const oldSquare = this.pieces[pieceIndex].square;
        this.pieces[pieceIndex].move(this.square);
        this.pieces[pieceIndex].updateDrawings(oldSquare);
    }

    takePiece(pieceIndex)
    {
        this.pieces.splice(pieceIndex, 1);
    }
}
