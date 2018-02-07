import { Injectable }     from '@angular/core';
import { Piece, Pawn }	  from './piece';
import { Space }          from './space';
import { CheckerBoard }	  from './checkerBoard';
import { Coord }          from './coord';

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

    // Highlights the spaces a pawn could move to
    highlightMoveableSpaces(p: Pawn) {
        console.log(this.findMoveableSpaces(p));
    }

    // This method will find moveable spaces for a pawn piece
    findMoveableSpaces(p: Pawn): Object {
        let coordRight = p.getRightMove();
        let coordLeft = p.getLeftMove();

        return {
            right: this.checkBoardSpace(coordRight.row, coordRight.col) ? this.board[coordRight.row][coordRight.col] : null,
            left: this.checkBoardSpace(coordLeft.row, coordLeft.col) ? this.board[coordLeft.row][coordLeft.col] : null
        }

    }

    // Checks to see if a space is empty, on the board, and playable
    checkBoardSpace(row: number, col: number): boolean {
        let space: Space;

        if (row < 8 && row > -1 && col < 8 && col > -1) {
            space = this.board[row][col];
        } else {
            return false;
        }

        if (space.piece == null && space.playable) {
            return true;
        } else {
            return false;
        }
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
