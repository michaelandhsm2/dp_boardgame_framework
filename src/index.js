import Framework from './framework/framework';

// import SimpleTicTacToeBoard from './SimpleTicTacToe/board';
// import SimpleTicTacToeGame from './SimpleTicTacToe/game';
// const TicTacToe_SimpleBoard = {
//   board: SimpleTicTacToeBoard,
//   game: SimpleTicTacToeGame,
// };
// Framework(TicTacToe_SimpleBoard);

// import TicTacToeBoard from './TicTacToe/board';
// import TicTacToeGame from './TicTacToe/game';
// const TicTacToe_SingleBoard = {
//   board: TicTacToeBoard,
//   game: TicTacToeGame,
//   boardSize: 4,
//   // multiplayer: true,
// };
// Framework(TicTacToe_SingleBoard);

// import TicTacToeBoard from './TicTacToe/board';
// import TicTacToeGame from './TicTacToe/game';
// const TicTacToe_MultiBoard = {
//   board: TicTacToeBoard,
//   game: TicTacToeGame,
//   boardSize: 2,
//   multiplayer:{
//     remote: true,
//     gameId: 0,
//     playerId: 1,
//   },
// }
// Framework(TicTacToe_MultiBoard);

import DrawingBoard from './Drawing/board';
import DrawingGame from './Drawing/game';
const Drawing = {
  board: DrawingBoard,
  game: DrawingGame,
  boardSize: 400,
  multiplayer:{
    remote: true,
    gameId: 0,
    playerId: 0,
  },
}
Framework(Drawing);
