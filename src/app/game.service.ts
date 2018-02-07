import { Injectable }     from '@angular/core';
import { Piece, Pawn }	  from './piece';
import { Space }          from './space';
import { CheckerBoard }	  from './checkerBoard';

@Injectable()
export class GameService {
  	public board: any;

  	constructor() {
  		  this.resetGame();
  	}

    // Resets game back to beginning
    resetGame() {
        this.board = new CheckerBoard().board;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j].playable === true) {
                  this.board[i][j].addPiece(new Pawn('red', i, j));
                }
            }
        }
        for (let i = 5; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j].playable === true) {
                  this.board[i][j].addPiece(new Pawn('black', i, j));
                }
            }
        }
    }

    logger(sp: Space) {
        console.log(sp);
    }

    // Finds a piece on the board and returns the space it is on
    findPiece(p: Piece): Space {
        let sp: Space = null;
        this.board.forEach(row => row.forEach(space => {
            if (space.piece === p) {
                sp = space;
            }
        }));
        return sp;
    }

    // Place piece on board according to coordinates on the piece
    placePiece(p: Piece) {
        let row = p.row;
        let col = p.col;
        let oldSpace = this.findPiece(p);

        // First clear the piece off the old space
        oldSpace.clearPiece();

        // Then add the piece to the new space on the board
        this.board[row][col].addPiece(p);
    }

  	// Clicking a piece on the board causes (only) that piece to be selected
  	selectAPiece(p: Piece) {
    		this.clearSelectedPiece();
    		if (p != null ) {
      			p.selected = true;
            this.findPiece(p).highlight = true;
    		}
        
  	}

    // Clear the selected flag from the board so no piece is selected
    clearSelectedPiece() {
        this.board.forEach(row => 
            row.forEach(space => { 
                    if (space.piece !== null) {
                        space.piece.selected = false;
                        space.highlight = false;
                    } 
                } 
            )
        );
    }
}
