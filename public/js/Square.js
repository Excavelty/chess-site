export class Square
{
    constructor(cords)
    {
        this.cords = cords;
        this.squareRep = document.createElement('div');
        this.squareRep.id = 'square' + this.cords.cordX + this.cords.cordY;
        this.squareRep.style.backgroundColor = this.chooseSquareColor();
        this.squareRep.style.width = '9vh';
        this.squareRep.style.height = '9vh';
        this.squareRep.style.float = 'left';
        this.squareRep.style.fontSize = '7vh';
        this.squareRep.style.textAlign = 'center';
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
        const emptyLight = '#ffffff';//'#DEB887';
        const emptyDark = '#B0E0E6';//'#DEB887';//'#8B4513';

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
                } break;

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
