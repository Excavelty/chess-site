import {SpecialMoves} from './SpecialMoves.js';
import {King} from './King.js';
import {Pawn} from './Pawn.js';
import {Queen} from './Queen.js';//maybe delete later
import {Square} from './Square.js';
import {CompPlayer} from './CompPlayer.js';
import {PromotionSelector} from './PromotionSelector';

export class SquareInput
{
    constructor(square, pieces, squares, playersColor, moveControl)
    {
        this.playersColor = playersColor;
        this.square = square;
        this.squares = squares;
        this.pieces = pieces;
        this.moveControl = moveControl;
        this.compPlayer = new CompPlayer('black');
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
                        let rook = this.getPieceBySquare(firstRookSquare);
                        if(rook)
                        {
                            if(potentialPiece === null)
                            SpecialMoves.castle(rook, newSquare);
                        }
                    }

                    else if(this.square === secondCompSquare)
                    {
                        let newSquare = this.squares[kingSqrCordXChrCode - 97 - 1][kingSqrCordYIndex];
                        potentialPiece = this.getPieceBySquare(newSquare);
                        let potentialPiece2 = this.getPieceBySquare(this.squares[kingSqrCordXChrCode - 97 - 3][kingSqrCordYIndex]);

                        if(potentialPiece === null)
                            potentialPiece = potentialPiece2;

                        let rook = this.getPieceBySquare(secondRookSquare);
                        if(rook)
                        {
                            if(potentialPiece === null)
                              SpecialMoves.castle(rook, newSquare);
                        }
                    }
                }

                if(potentialPiece === null)
                {
                    this.unOwnPiece(ownedPiece);
                    this.putPiece(ownedPiece);

                    /*let pieceIndexes = this.compPlayer.getPieceIndexes();
                    let index = this.getIndexBySqr(this.squares[pieceIndexes.first][pieceIndexes.second]);
                    let newCords = this.compPlayer.getSquareIndexes();
                    this.ownPiece(index);
                    const oldSquare = this.pieces[index].square;
                    this.pieces[index].move(this.squares[newCords.first][newCords.second]);
                    this.pieces[index].updateDrawings(oldSquare);*/
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

    putPiece(pieceIndex)
    {
        const oldSquare = this.pieces[pieceIndex].square;
        if(this.pieces[pieceIndex].move(this.square))
        {
            this.pieces[pieceIndex].updateDrawings(oldSquare);
            if(this.pieces[pieceIndex] instanceof Pawn)
            {
                if(this.square.cords.cordY === 1 && this.pieces[pieceIndex].color === 'black')
                {
                    PromotionSelector.triggerModal(this.pieces, pieceIndex);
                }

                else if(this.square.cords.cordY === 8 && this.pieces[pieceIndex].color === 'white')
                {
                    PromotionSelector.triggerModal(this.pieces, pieceIndex);
                }
            }

            this.moveControl.changePlayer();
            return true;
        }
        else
        {
            this.ownPiece(pieceIndex);
            return false;
        }
    }

    takePiece(pieceIndex)
    {
        this.pieces.splice(pieceIndex, 1);
    }
}
