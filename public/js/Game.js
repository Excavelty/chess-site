import {Square} from './Square.js';
export class Game
{
    constructor(boardContainer)
    {
          this.squaresNum = 8;
          this.squares = [];
          for(let i = 0; i < this.squaresNum; ++i)
          {
              this.squares[i] = [];
          }
          this.boardContainer = boardContainer;
          const boardContent = this.initializeBoard();
          this.boardContainer.innerHTML = boardContent;
    }

    initializeBoard()
    {
          let htmlContent = '';
          const aLetter = 'a';

          for(let j = this.squaresNum - 1; j >= 0; --j)
          {

              for(let i = 0; i < this.squaresNum; ++i)
              {
                  const cords = {
                        cordX: String.fromCharCode(aLetter.charCodeAt(0) + i),
                        cordY: 1 + j
                  }

                  this.squares[i][j] = new Square(cords);
                  htmlContent += this.squares[i][j].getHTMLRepresentation().outerHTML;
              }
          }

          return htmlContent;
    }

    initializePieces()
    {
        this.preparePawns()
    }

    preparePawns()
    {
        this.pawns = [];

        for(let i = 0; i < this.squaresNum; ++i)
        {
            this.pawns[i] = new Pawn(this.squares[i][1], 'white');//for second line in fact
        }

        for(let i = 0; i < this.squaresNum; ++i)
        {
            this.pawns[i + this.squaresNum] = new Pawn(this.squares[i][6], 'black');//for seventh line in fact
        }
    }

    prepareRooks()
    {
        this.rooks = [
            new Rook(this.squares[0][0], 'white'),
            new Rook(this.squares[0][7], 'white'),
            new Rook(this.squares[7][0], 'black'),
            new Rook(this.squares[7][7], 'black')
        ];
    }

    prepareKnights()
    {
        this.knights = [
            new Knight(this.squares[1][1], 'white'),
            new Knight(this.squares[1][6], 'white'),
            new Knight(this.squares[1][1], 'black'),
            new Knight(this.squares[1][6], 'black')
        ];
    }

    updateLogic()
    {

    }
}
