import {Framework} from './framework/reducer';

import TicTacToeBoard from './TicTacToe/board';
import TicTacToeGame from './TicTacToe/game';

Framework({
  board: TicTacToeBoard,
  game: TicTacToeGame,
  numPlayers: 2,
});
