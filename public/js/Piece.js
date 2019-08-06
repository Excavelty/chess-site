export class Piece
{
    constructor(cords)
    {
        this.cords = cords;
    }

    move(newCords)
    {
        this.cords = newCords;
        return true;
    }
}
