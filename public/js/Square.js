export class Square
{
    constructor(cords)
    {
        this.cords = cords;
        this.squareRep = document.createElement('div');
        this.squareRep.style.backgroundColor = this.chooseSquareColor();
        this.squareRep.style.width = '6vw';
        this.squareRep.style.height = '6vw';
        this.squareRep.style.float = 'left';
        //this.squareRep.style.marginLeft = 4 * (this.cords.cordX.charCodeAt(0) - 97) + 'vw';
        const text = document.createTextNode(this.cords.cordX + this.cords.cordY);
        this.squareRep.append(text);
        this.squareRep.classList += 'square';
    }

    getHTMLRepresentation()
    {
        return this.squareRep;
    }

    chooseSquareColor()
    {
        const emptyLight = '#DEB887';
        const emptyDark = '#8B4513';

        if(this.cords.cordY % 2 === 1)
        {
            switch(this.cords.cordX)
            {
                case 'a':
                case 'c':
                case 'e':
                case 'g':
                {
                    return emptyDark;
                }break;

                default: return emptyLight;
            }
        }

        else
        {
            switch(this.cords.cordX)
            {
                case 'a':
                case 'c':
                case 'e':
                case 'g':
                {
                    return emptyLight;
                }break;

                default: return emptyDark;
            }
        }
    }
}
