import swal from 'sweetalert';
import {Bishop} from './Bishop.js';
import {Knight} from './Knight.js';
import {King} from './King.js';

export class GameoverControl
{
    constructor(pieces, squares)
    {
        this.pieces = pieces;
        this.squares = squares;
    }

    checkIfDrawDueToMaterial()
    {
        let result = false;

        if(this.pieces.length === 4)
        {
            result = this.checkIfJustKingsAndSameSquareColorBishopsLeft();
        }

        else if(this.pieces.length < 4)
        {
            result = this.checkIfJustKingsLeft() || this.checkIfJustKingsAndBishopLeft() || this.checkIfJustKingsAndKnightLeft();
        }

        if(result)
          swal("Koniec gry! Remis.");
        //return result;
    }

    checkIfJustKingsLeft()
    {
        if(this.pieces.length === 2)
            return true;
        return false;
    }

    checkIfJustKingsAndBishopLeft()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Bishop)
                return true;
        }

        return false;
    }

    checkIfJustKingsAndKnightLeft()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Knight)
                return true;
        }

        return false;
    }

    checkIfJustKingsAndSameSquareColorBishopsLeft()
    {
        let previousBishop = undefined;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Bishop)
            {
                if(previousBishop === undefined)
                {
                    previousBishop = this.pieces[i];
                }

                else
                {
                    if(previousBishop.color !== this.pieces[i].color
                      && previousBishop.square.colorDefault === this.pieces[i].square.colorDefault)
                      return true;
                    else
                      return false;
                }
            }
        }

        return false;
    }
}
