export class Piece
{
    constructor(square, color)
    {
        this.square = square;
        this.color = color;
        //this.cords = this.square.cords;
        this.isOwned = false;
    }

    setValidator(validator)
    {
        this.validator = validator;
    }

    move(newSquare)
    {
        if(this.checkIfCouldMove(newSquare))
        {
            this.square = newSquare;
            return true;
        }

        return false;
    }

    updateDrawings(oldSquare)
    {
          const oldSquareHTMLHandle = oldSquare.getSquareHandle();
          this.cleanIconFromPreviousSquare(oldSquareHTMLHandle);
          const currentSquareHTMLHandle = this.square.getSquareHandle();
          let pieceIcon = document.createElement('img');
          pieceIcon.classList += 'pieceIcon';
          pieceIcon.src = '../img/' + this.pieceImg;
          pieceIcon.style.height = '80%';
          //pieceIcon.style.display = 'block';
          pieceIcon.style.position = 'relative';
          pieceIcon.style.marginBottom = '8%';
          pieceIcon.style.width = 'auto';
          //let pieceIcon = document.createElement('div');
          //pieceIcon.classList += 'pieceIcon';
          //pieceIcon.textContent = this.pieceIcon;
          currentSquareHTMLHandle.innerHTML = '';
          currentSquareHTMLHandle.append(pieceIcon);
          //currentSquareHTMLHandle.textContent = this.pieceIcon;
    }

    cleanIconFromPreviousSquare(oldSquareHTMLHandle)
    {
        let pieceIconHandle = oldSquareHTMLHandle.querySelector('.pieceIcon');
        if(pieceIconHandle)
        {
            pieceIconHandle.remove();
        }
    }

    rotate(rotation)
    {
        let pieceIconHandle = this.square.getSquareHandle().querySelector('.pieceIcon');
        if(pieceIconHandle !== null)
        {
          pieceIconHandle.style.transform = rotation;
          if(rotation === 'rotate(180deg)')
          {
              pieceIconHandle.style.transform = rotation + ' translateY(17%)';
          }
        }
    }

    getRotation()
    {
        return this.square.getSquareHandle().querySelector('.pieceIcon').style.transform;
    }

    checkIfCouldMove(newSquare)
    {
        return true;
        //override
    }

    shiftChar(character, number)
    {
        return String.fromCharCode(character.charCodeAt(0) + number);
    }
}
