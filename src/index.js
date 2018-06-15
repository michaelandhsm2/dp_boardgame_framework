import Framework from './framework/framework';

import SimpleTicTacToeBoard from './SimpleTicTacToe/board';
import SimpleTicTacToeGame from './SimpleTicTacToe/game';
import TicTacToeBoard from './TicTacToe/board';
import TicTacToeGame from './TicTacToe/game';

const TicTacToe_SingleBoard = {
  board: TicTacToeBoard,
  game: TicTacToeGame,
  boardSize: 6,
};

const TicTacToe_MultiBoard = {
  board: TicTacToeBoard,
  game: TicTacToeGame,
  multiplayer: true,
  boardSize: 2,
}

Framework(TicTacToe_SingleBoard);
