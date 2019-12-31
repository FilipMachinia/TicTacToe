import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  board: string[][];
  currentPlayer = 'X';
  isGameOver: boolean;
  statusMessage;

  ngOnInit(): void {
    this.newGame();
  }

  private newGame() {
    this.board = [];

    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = '';
      }
    }
    this.isGameOver = false;
    this.statusMessage = 'Player ' + this.currentPlayer;
  }

  move(row: number, col: number) {
    if (!this.isGameOver && this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) {
        this.statusMessage = 'Its a draw.';
        this.isGameOver = true;
      } else if (this.isWin()) {
        this.statusMessage = 'Player ' + this.currentPlayer + ' has won!';
        this.isGameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusMessage = 'Player ' + this.currentPlayer;
      }
    }
  }

  private isDraw() {
    for (const columns of this.board) {
      for (const col of columns) {
        if (col === '') {
          return false;
        }
      }
    }
    return true;
  }

  private isWin() {
    for (const columns of this.board) {
      if (columns[0] === columns[1] && columns[0] === columns[2] && columns[0] !== '') {
        return true;
      }
    }

    for (let col = 0; col < this.board[0].length; col++) {
      if (this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col] &&
        this.board[0][col] !== '') {
        return true;
      }
    }

    if (this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== '') {
      return true;
    }

    if (this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][2] &&
      this.board[0][2] !== '') {
      return true;
    }
  }
}
