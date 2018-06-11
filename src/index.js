import {Framework} from './framework/reducer';

import TicTacToeBoard from './TicTacToe/board';
import TicTacToeGame from './TicTacToe/game';

const TicTacToe_SingleBoard = {
  board: TicTacToeBoard,
  game: TicTacToeGame,
};

const TicTacToe_MultiBoard = {
  board: TicTacToeBoard,
  game: TicTacToeGame,
  multiplayer: true,
}

Framework(TicTacToe_MultiBoard);
