import {SpecialMoves} from './SpecialMoves.js';
import {King} from './King.js';

export class SquareInput
{
    constructor(square, pieces)
    {
        this.square = square;
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
            console.log('conaining');
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
                console.log('owningUnowned');
                this.ownPiece(containedPiece);
            }
        }

        else
        {
            if(ownedPiece !== null)
            {
                /*if(this.pieces[ownedPiece] instanceof King)
                {
                    console.log(this.pieces[ownedPiece]);
                    const rookCords = {
                        cordX: this.pieces[ownedPiece].square.cordY,
                        cordY: String.fromCharCode(this.pieces[ownedPiece].square.cords.cordX
                          .charCodeAt(0) + 2)
                    };
                    if(this.square.cords === rookCords);
                    {
                        let rookPiece = this.findPieceByCords(rookCords);
                    }
                }*/
                console.log('puttingPiece');
                this.unOwnPiece(ownedPiece);
                this.putPiece(ownedPiece);
            }
        }
    }

    findPieceByCords(cords)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].square.cords === cords)
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
        console.log('halo');
        return null;
    }

    checkIfPieceOwned()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i].isOwned)
                return i;
        }
        console.log('halo');
        return null;
    }

    ownPiece(pieceIndex)
    {
        this.pieces[pieceIndex].square.changeColor('green');
        this.pieces[pieceIndex].isOwned = true;
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
