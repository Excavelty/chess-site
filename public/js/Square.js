export class Square
{
    constructor(cords)
    {
        this.cords = cords;
        this.squareRep = document.createElement('div');
        this.squareRep.id = 'square' + this.cords.cordX + this.cords.cordY;
        this.colorDefault = this.chooseSquareColor();
        this.squareRep.style.backgroundColor = this.colorDefault;//this.chooseSquareColor();
        this.squareRep.style.width = '12.5%';
        this.squareRep.style.height = '12.5%';
        //const text = document.createTextNode(this.cords.cordX + this.cords.cordY);
        //this.squareRep.append(text);
        this.squareRep.style.float = 'left';
        this.squareRep.style.fontSize = '7.6vh';
        this.squareRep.style.textAlign = 'center';
        this.squareRep.classList += 'square';
    }

    getHTMLRepresentation()
    {
        return this.squareRep;
    }

    getSquareHandle()
    {
        return document.querySelector('#'+this.squareRep.id);
    }

    attachCursorEvent()
    {
        const squareHandle = this.getSquareHandle();
        squareHandle.addEventListener('mouseover', function(){
            this.style.cursor = 'pointer';
        });
    }

    chooseSquareColor()
    {
        const emptyLight = '#ffffff';//'#DEB887';
        const emptyDark = 	'brown';//'#e8e8e8';//'#D3D3D3';//'#DEB887';//'#B0E0E6';//'#8B4513';

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

    getSquareByCords(cords)
    {
        return this.squares[cords.cordX.charCodeAt(0) - 97][cords.cordY - 1];
    }

    changeColor(color = this.colorDefault)
    {
        const squareHandle = this.getSquareHandle();
        squareHandle.style.backgroundColor = color;
    }
}
