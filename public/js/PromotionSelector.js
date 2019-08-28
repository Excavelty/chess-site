import swal from 'sweetalert';
import {Queen} from './Queen.js';
import {Bishop} from './Bishop.js';
import {Rook} from './Rook.js';
import {Knight} from './Knight.js';

export class PromotionSelector
{
    static triggerModal(pieces, index, moveControl, checkmateControl, kingSquare)
    {
        swal({
            buttons: {
                queen: {
                  text: "Hetman",
                  value: "queen"
                },

                rook: {
                  text: "Wieża",
                  value: "rook"
                },

                bishop: {
                  text: "Goniec",
                  value: "bishop"
                },

                knight: {
                  text: "Skoczek",
                  value: "knight"
                }
            }
        }).then(value => {
            PromotionSelector.preparePiece(value, pieces, index, moveControl, checkmateControl, kingSquare);
        });
    }

    static preparePiece(value, pieces, index, moveControl, checkmateControl, kingSquare)
    {
        let validator = pieces[index].validator;
        let piece = pieces[index];
        let newPiece = undefined;

        switch(value)
        {
            case "knight": newPiece = new Knight(pieces[index].square, pieces[index].color); break;
            case "rook": newPiece = new Rook(pieces[index].square, pieces[index].color); break;
            case "bishop": newPiece = new Bishop(pieces[index].square, pieces[index].color); break;
            default: newPiece = new Queen(pieces[index].square, pieces[index].color);
        }

        newPiece.setValidator(validator);
        pieces[index] = newPiece;
        moveControl.rotatePieceAfterMoveIfNecessary(index);
        const color = newPiece.color === 'white'? 'black' : 'white';
        checkmateControl.seeIfCheck(color, kingSquare);
    }
}
