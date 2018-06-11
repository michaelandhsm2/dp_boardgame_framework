import {Framework} from './framework/reducer';

import SimpleTicTacToeBoard from './SimpleTicTacToe/board';
import SimpleTicTacToeGame from './SimpleTicTacToe/game';
import TicTacToeBoard from './TicTacToe/board';
import TicTacToeGame from './TicTacToe/game';

const TicTacToe_SingleBoard = {
  board: SimpleTicTacToeBoard,
  game: TicTacToeGame,
};

const TicTacToe_MultiBoard = {
  board: TicTacToeBoard,
  game: TicTacToeGame,
  multiplayer: true,
  boardSize: 2,
}

Framework(TicTacToe_MultiBoard);
