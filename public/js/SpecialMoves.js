import {Square} from './Square.js';

export class SpecialMoves
{
    static castle(rook, newSquare)
    {
        const oldSquare = rook.square;
        rook.move(newSquare);
        rook.updateDrawings(oldSquare);
    }
}
