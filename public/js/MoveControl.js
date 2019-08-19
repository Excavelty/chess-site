export class MoveControl
{
    constructor()
    {
        this.moveOf = 'white';
    }

    changePlayer()
    {
        this.moveOf = (this.moveOf === 'white')? 'black' : 'white';
        console.log(this.moveOf);
    }
}
