import {SpecialMoves} from './SpecialMoves.js';
import {King} from './King.js';
import {Pawn} from './Pawn.js';
import {Rook} from './Rook.js';//maybe delete later
import {Square} from './Square.js';
import {CompPlayer} from './CompPlayer.js';
import {PromotionSelector} from './PromotionSelector.js';
import {EnPassantControl} from './EnPassantControl.js';

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
        this.arrowFuncReference = () => this.squareClick();

        this.prepareSquareClick();
    }

    prepareSquareClick()
    {
        const squareHandle = this.square.getSquareHandle();
        let self = this;
        let arrowFuncReference = this.arrowFuncReference;
        squareHandle.addEventListener('click', arrowFuncReference);
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
                    let pieceColor = this.pieces[ownedPiece].color;
                    this.unOwnPiece(ownedPiece);
                    if(this.putPiece(ownedPiece))
                    {
                        let color = this.pieces[containedPiece].color;
                        this.takePiece(containedPiece);
                        let index = this.getKingIndex(color);
                        this.seeIfCheckmateOrStalemate(index, color, pieceColor);
                    }
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
        if(this.pieces[pieceIndex].color === this.moveControl.moveOf)
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
        let containedPieceIndex = this.getIndexBySqr(this.square);

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
                        PromotionSelector.triggerModal(this.pieces, pieceIndex, this.moveControl, this.checkmateControl, this.pieces[index].square, this);
                    }
                }

                this.moveControl.rotatePieceAfterMoveIfNecessary(pieceIndex);
                this.moveControl.changePlayer();

                if(containedPieceIndex === null)
                    this.seeIfCheckmateOrStalemate(index, color, pieceColor);

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

                this.pieces[kingIndex].square.changeColor();
                EnPassantControl.disallow(this.pieces, pieceIndex);


                if(this.pieces[pieceIndex] instanceof Pawn && this.pieces[pieceIndex].enPassantIndex !== false)
                {
                    let piece = this.pieces[pieceIndex];
                    let color = this.pieces[piece.enPassantIndex].color;
                    let squareHandle = this.pieces[piece.enPassantIndex].square.getSquareHandle();//important for en passant;
                    this.pieces[piece.enPassantIndex].cleanIconFromPreviousSquare(squareHandle);
                    this.takePiece(piece.enPassantIndex);
                    piece.enPassantIndex = false;
                    let localKingIndex = this.getKingIndex(color);
                    this.seeIfCheckmateOrStalemate(localKingIndex, this.pieces[localKingIndex].color, piece.color);
                    this.gameoverControl.checkIfDrawDueToMaterial();
                }

                return true;
            }

            else
            {
                this.ownPiece(pieceIndex);
                return false;
            }
        }
        else
        {
            this.ownPiece(pieceIndex);
            return false;
        }
    }

    seeIfCheckmateOrStalemate(index, color, pieceColor)
    {
        let isCheck = this.checkmateControl.seeIfCheck(this.pieces[index].color, this.pieces[index].square);
        if(isCheck)
            this.pieces[index].square.changeColor('yellow');
        if(this.checkmateControl.seeIfHaveNoMove(index, color))
        {
            if(isCheck)
            {
                let winners = 'białe.';
                if(pieceColor !== 'white')
                  winners = 'czarne.';
                this.gameoverControl.displayFinishSwal("Koniec gry! Wygrały "+winners+"(mat).");
                this.pieces[index].square.changeColor('#581845');
            }
            else
            {
                this.gameoverControl.displayFinishSwal("Koniec gry! Remis(pat).");
                this.pieces[index].square.changeColor('lightblue');
            }
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
