export class MoveControl
{
    constructor(pieces, squares)
    {
        this.moveOf = 'white';
        this.pieces = pieces;
        this.squares = squares;
        this.boardContainer = document.querySelector('.boardContainer');
    }

    changePlayer()
    {
        if(this.moveOf === 'white')
        {
            this.boardContainer.style.transform = 'rotate(180deg)';
            this.rotatePieces('rotate(180deg)');
        }
        else
        {
            this.boardContainer.style.transform = 'rotate(0deg)';
            this.rotatePieces('rotate(0deg)')
        }
        this.moveOf = (this.moveOf === 'white')? 'black' : 'white';
    }

    rotatePieces(rotation)
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            this.pieces[i].rotate(rotation)
        }
    }
}
