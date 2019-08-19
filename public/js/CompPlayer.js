export class CompPlayer
{
    constructor(color)
    {
        this.color = color;
    }

    getPieceIndexes()
    {
        return {
            first: 4,
            second: 6
        };
    }

    getSquareIndexes()
    {
        return {
            first: 4,
            second: 4
        };
    }
}
