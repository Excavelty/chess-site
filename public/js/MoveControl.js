export class MoveControl
{
    constructor(pieces, squares)
    {
        this.moveOf = 'white';
        this.pieces = pieces;
        this.squares = squares;
        this.boardContainer = document.querySelector('.boardContainer');
        this.boardRotateHandle = document.querySelector('.boardRotate');
        this.rotateBoardReference = () => this.rotateBoard();
        this.boardRotateHandle.addEventListener('click', this.rotateBoardReference);
    }

    changePlayer()
    {
        this.moveOf = (this.moveOf === 'white')? 'black' : 'white';
    }

    rotateBoard()
    {
        const rotation = this.boardContainer.style.transform === 'rotate(180deg)'? 'rotate(0deg)' : 'rotate(180deg)';
        this.boardContainer.style.transform = rotation;
        this.rotatePieces(rotation);
    }

    rotatePieces(rotation)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            this.pieces[i].rotate(rotation);
        }
    }

    rotatePieceAfterMoveIfNecessary(index)
    {
        if(this.boardContainer.style.transform === 'rotate(180deg)')
            this.pieces[index].rotate('rotate(180deg)');
    }
}
