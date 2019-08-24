export class CheckmateControl
{
    constructor(pieces)
    {
        this.pieces = pieces;
    }

    static seeIfCheck(color, kingSquare)
    {
        let compareColor = 'white';
        if(color === 'white')
          compareColor = 'black';

        for(let i = 0; i < this.pieces.size; ++i)
        {
            if(this.pieces.color === compareColor)
            {
                if(this.pieces[i].checkIfCouldMove(kingSquare))
                  return true;
            }
        }

        return false;
    }
}
