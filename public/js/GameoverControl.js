import swal from 'sweetalert';
import {Game} from './Game.js';
import {Bishop} from './Bishop.js';
import {Knight} from './Knight.js';
import {King} from './King.js';

export class GameoverControl
{
    constructor(pieces, squares, game)
    {
        this.pieces = pieces;
        this.squares = squares;
        this.game = game;
    }

    checkIfDrawDueToMaterial()
    {
        let result = false;

        if(this.pieces.length === 4)
        {
            result = this.checkIfJustKingsAndSameSquareColorBishopsLeft();
        }

        else if(this.pieces.length < 4)
        {
            result = this.checkIfJustKingsLeft() || this.checkIfJustKingsAndBishopLeft() || this.checkIfJustKingsAndKnightLeft();
        }

        if(result)
          this.displayFinishSwal("Remis! Niewystarczający materiał do dania mata u obu stron");
    }

    displayFinishSwal(text)
    {
        swal(text, {
            buttons: {
                end: {
                    text: "Zakończ",
                    value: 'end'
                },

                restart: {
                    text: "Jeszcze raz",
                    value: 'restart'
                }
            }
        }).then((value) => {
            if(value !== 'restart')
                value = 'end';
            if(value === 'restart')
                this.restartGame();
            else
                this.endGame();
        });
    }

    checkIfJustKingsLeft()
    {
        if(this.pieces.length === 2)
            return true;
        return false;
    }

    checkIfJustKingsAndBishopLeft()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Bishop)
                return true;
        }

        return false;
    }

    checkIfJustKingsAndKnightLeft()
    {
        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Knight)
                return true;
        }

        return false;
    }

    checkIfJustKingsAndSameSquareColorBishopsLeft()
    {
        let previousBishop = undefined;

        for(let i = 0; i < this.pieces.length; ++i)
        {
            if(this.pieces[i] instanceof Bishop)
            {
                if(previousBishop === undefined)
                {
                    previousBishop = this.pieces[i];
                }

                else
                {
                    if(previousBishop.color !== this.pieces[i].color
                      && previousBishop.square.colorDefault === this.pieces[i].square.colorDefault)
                      return true;
                    else
                      return false;
                }
            }
        }

        return false;
    }

    restartGame()
    {
        this.game.moveControl.boardRotateHandle.removeEventListener('click', this.game.moveControl.rotateBoardReference);
        this.game = new Game(this.game.boardContainer);
        this.game.initializeSquares();
        this.game.initializePieces();
        this.game.initializeDependenciesToInject();
        this.game.initializeSquareInput();
        this.game.initializeValidatorAndInject();
    }

    endGame()
    {
        this.game.end();
    }
}
