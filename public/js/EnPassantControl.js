export class EnPassantControl
{
    static execute(pieces, squares, attackingPawnIndex, newSquare)
    {
        let potentialIndex = null;

        switch(pieces[attackingPawnIndex].color)
        {
            case 'white': {
                potentialIndex = pieces[attackingPawnIndex].validator.getPieceIndexBySqr(
                  squares[newSquare.cords.cordX.charCodeAt(0) - 97][newSquare.cords.cordY - 2]);
            } break;

            default: {
                potentialIndex = pieces[attackingPawnIndex].validator.getPieceIndexBySqr(
                  squares[newSquare.cords.cordX.charCodeAt(0) - 97][newSquare.cords.cordY]);
            }
        }

        if(potentialIndex !== null && pieces[potentialIndex].color !== pieces[attackingPawnIndex].color
          && pieces[potentialIndex].allowEnPassant === true)
          return EnPassantControl.visualizeEnPassant(pieces, squares, attackingPawnIndex, newSquare, potentialIndex);
        return false;
    }

    static visualizeEnPassant(pieces, squares, attackingPawnIndex, newSquare, takenPawnIndex)
    {
        let oldSquare = pieces[attackingPawnIndex].square;
        pieces[attackingPawnIndex].square.changeColor();
        pieces[attackingPawnIndex].square = newSquare;
        pieces[attackingPawnIndex].updateDrawings(oldSquare);
        pieces[takenPawnIndex].cleanIconFromPreviousSquare(pieces[takenPawnIndex].square.getSquareHandle());
        pieces.splice(takenPawnIndex, 1);
        return true;
    }
}
