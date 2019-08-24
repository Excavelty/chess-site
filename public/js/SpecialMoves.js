import {Square} from './Square.js';

export class SpecialMoves
{
    static castle(rook, newSquare)
    {
        const oldSquare = rook.square;
        const boardContainer = document.querySelector('.boardContainer');
        rook.move(newSquare);
        rook.updateDrawings(oldSquare);
        const boardRotation = boardContainer.style.transform;
        if(boardRotation !== rook.getRotation())
        {
            if(boardRotation === 'rotate(180deg)')
                rook.rotate('rotate(180deg)');
            else
                rook.rotate('rotate(0deg)');
        }
    }
}
