export class EnPassantControl
{
    static enPassant(pieces, attackingPawnIndex, takenPawnIndex, newSquare)
    {
        let attackingCords = pieces[attackingPawnIndex].square.cords;
        let takenCords = pieces[attackingPawnIndex].square.cords;
        if(attackingCords.cordY === takenCords.cordY
          && (attackingCords.cordX.charCodeAt(0) === takenCords.cordY.charCodeAt(0) + 1
           || attackingCords.cordX.charCodeAt(0) === takenCords.cordX.charCodeAt(0) - 1))
           {
              pieces[attackingPawnIndex].allowTake = true;
              return pieces[attackingPawnIndex].move(newSquare);
           }
        return false;

    }
}
