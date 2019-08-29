import {SpecialMoves} from './SpecialMoves.js';
import {King} from './King.js';
import {Pawn} from './Pawn.js';
import {Rook} from './Rook.js';//maybe delete later
import {Square} from './Square.js';
import {CompPlayer} from './CompPlayer.js';
import {PromotionSelector} from './PromotionSelector';

export class SquareInput
{
    constructor(square, pieces, squares, playersColor, moveControl, checkmateControl, gameoverControl)
    {
        this.playersColor = playersColor;
        this.square = square;
        this.squares = squares;
        this.pieces = pieces;
        this.moveControl = moveControl;
        this.compPlayer = new CompPlayer('black');
        this.checkmateControl = checkmateControl;
        this.gameoverControl = gameoverControl;

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


                    if(this.pieces[ownedPiece] instanceof Pawn)
                    {
                        let pawn = this.pieces[ownedPiece];
                        if(this.pieces[containedPiece].color != pawn.color)
                        {
                            pawn.allowTake = true;
                        }
                    }
                    this.unOwnPiece(ownedPiece);
                    if(this.putPiece(ownedPiece))
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
            let potentialPiece = null;
            let couldMove = true;

            if(ownedPiece !== null)
            {
                if(this.pieces[ownedPiece] instanceof King
                  &&this.pieces[ownedPiece].allowCastle)
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
                        potentialPiece = this.getPieceBySquare(newSquare);
                        let rookIndex = this.getIndexBySqr(firstRookSquare);
                        if(rookIndex !== null)
                        {
                            if(potentialPiece === null && this.pieces[rookIndex].allowCastle
                              && this.checkIfWouldCauseCheck(ownedPiece) === false
                              && this.checkmateControl.seeIfWouldCauseCheck(ownedPiece, ownedPiece, this.pieces[ownedPiece].color, newSquare) === false)
                                SpecialMoves.castle(this.pieces[rookIndex], newSquare);
                            else
                                couldMove = false;
                        }
                    }

                    else if(this.square === secondCompSquare)
                    {
                        let newSquare = this.squares[kingSqrCordXChrCode - 97 - 1][kingSqrCordYIndex];
                        potentialPiece = this.getPieceBySquare(newSquare);
                        let potentialPiece2 = this.getPieceBySquare(this.squares[kingSqrCordXChrCode - 97 - 3][kingSqrCordYIndex]);

                        if(potentialPiece === null)
                            potentialPiece = potentialPiece2;

                        let rookIndex = this.getIndexBySqr(secondRookSquare);
                        if(rookIndex !== null)
                        {
                            if(potentialPiece === null && this.pieces[rookIndex].allowCastle
                              && this.checkIfWouldCauseCheck(ownedPiece) === false
                              && this.checkmateControl.seeIfWouldCauseCheck(ownedPiece, ownedPiece, this.pieces[ownedPiece].color, newSquare) === false)
                                SpecialMoves.castle(this.pieces[rookIndex], newSquare);
                            else
                                couldMove = false;
                        }
                    }
                }

                if(couldMove)
                {
                    this.unOwnPiece(ownedPiece);
                    this.putPiece(ownedPiece);
                }
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

    getIndexBySqr(sqr)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].square === sqr)
                return i;
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
        if(this.pieces[pieceIndex].color === this.moveControl.moveOf)//this.pieces[pieceIndex].color === this.playersColor)
        {
            this.pieces[pieceIndex].square.changeColor('#26C281');
            this.pieces[pieceIndex].isOwned = true;
        }
    }

    unOwnPiece(pieceIndex)
    {
        this.pieces[pieceIndex].square.changeColor();
        this.prepareSquareClick();
        this.pieces[pieceIndex].isOwned = false;
    }

    checkIfSameColors(ownedPiece, containedPiece)
    {
        return (this.pieces[ownedPiece].color === this.pieces[containedPiece].color);
    }

    getKingIndex(color)
    {
        for(let i = 0; i < this.pieces.length; ++i)
            if(this.pieces[i] instanceof King && this.pieces[i].color === color)
                return i;
    }

    putPiece(pieceIndex)
    {
        const oldSquare = this.pieces[pieceIndex].square;

        const pieceColor = this.pieces[pieceIndex].color;
        const color = pieceColor === 'white'? 'black' : 'white';
        let index = this.getKingIndex(color);

        if(this.checkmateControl.seeIfHaveNoMove(this.getKingIndex(pieceColor), pieceColor))
            console.log('Koniec gry!');

        if(this.checkIfWouldCauseCheck(pieceIndex) === false)
        {
            if(this.pieces[pieceIndex].move(this.square))
            {
                this.pieces[pieceIndex].updateDrawings(oldSquare);
                if(this.pieces[pieceIndex] instanceof Pawn)
                {
                    if(this.square.cords.cordY === 1 && this.pieces[pieceIndex].color === 'black'
                      || this.square.cords.cordY === 8 && this.pieces[pieceIndex].color === 'white')
                    {
                        PromotionSelector.triggerModal(this.pieces, pieceIndex, this.moveControl, this.checkmateControl, this.pieces[index].square);
                    }
                }

                this.moveControl.rotatePieceAfterMoveIfNecessary(pieceIndex);
                this.moveControl.changePlayer();

                this.checkmateControl.seeIfCheck(this.pieces[index].color, this.pieces[index].square);
                let kingIndex = this.getKingIndex(pieceColor);
                if(this.pieces[pieceIndex] instanceof Rook)
                {
                    if(oldSquare.cords.cordX === 'a' && (oldSquare.cords.cordY === 1
                      || oldSquare.cords.cordY === 8))
                      this.pieces[kingIndex].disallowQueensideCastle = true;
                    else if(oldSquare.cords.cordX === 'h' && (oldSquare.cords.cordY === 1
                      || oldSquare.cords.cordY === 8))
                      this.pieces[kingIndex].disallowKingsideCastle = true

                    if(this.pieces[kingIndex].disallowKingsideCastle && this.pieces[kingIndex].disallowQueensideCastle)
                    {
                        this.pieces[kingIndex].allowCastle = false;
                        this.pieces[kingIndex].disallowCastleCompletly = true;
                    }
                }
                if(this.pieces[kingIndex].disallowCastleCompletly === false)
                    this.pieces[kingIndex].allowCastle = true;
                return true;
            }
        }
        else
        {
            this.ownPiece(pieceIndex);
            return false;
        }
    }

    checkIfWouldCauseCheck(pieceIndex)
    {
        const kingColor = this.pieces[pieceIndex].color;
        let kingIndex = this.getKingIndex(kingColor);
        return this.checkmateControl.seeIfWouldCauseCheck(pieceIndex, kingIndex, kingColor, this.square);
    }

    takePiece(pieceIndex)
    {
        this.pieces.splice(pieceIndex, 1);
        this.gameoverControl.checkIfDrawDueToMaterial();
    }
}
