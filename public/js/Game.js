import {Square} from './Square.js';
import {King} from './King.js';
import {Queen} from './Queen.js';
import {Bishop} from './Bishop.js';
import {Knight} from './Knight.js';
import {Pawn} from './Pawn.js';
import {Rook} from './Rook.js';

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
        this.pieces = [];
        this.pieces.push(this.preparePawns());
        this.pieces.push(this.prepareRooks());
        this.pieces.push(this.prepareKnights());
        this.pieces.push(this.prepareKings());
        this.pieces.push(this.prepareQueens());
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
        return [
            new Rook(this.squares[0][0], 'white'),
            new Rook(this.squares[7][0], 'white'),
            new Rook(this.squares[0][7], 'black'),
            new Rook(this.squares[7][7], 'black')
        ];
    }

    prepareKnights()
    {
        return [
            new Knight(this.squares[1][1], 'white'),
            new Knight(this.squares[6][1], 'white'),
            new Knight(this.squares[1][7], 'black'),
            new Knight(this.squares[6][7], 'black')
        ];
    }

    prepareBishops()
    {
        return [
            new Bishop(this.squares[2][1], 'white'),
            new Bishop(this.squares[5][1], 'white'),
            new Bishop(this.squares[2][7], 'black'),
            new Bishop(this.squares[5][7], 'black')
        ];
    }

    prepareKings()
    {
        return [
            new King(this.squares[4][0], 'white'),
            new King(this.squares[4][7], 'black')
        ];
    }

    prepareQueens()
    {
        return [
            new Queen(this.squares[3][0], 'white'),
            new Queen(this.squares[3][7], 'black')
        ];
    }

    updateLogic()
    {

    }

    updateDrawings()
    {

    }
}
