import {Square} from './Square.js';
import {SquareInput} from './SquareInput.js';

export class SpecialMoves
{
    castle(rookCords)
    {
        const rookSquare = Square.getByCords(rookCords);
        const squareInput = SquareInput.getBySquare();//think of it somehow;
    }
}
