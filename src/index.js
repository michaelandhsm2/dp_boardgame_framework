import {Framework} from './framework/index';
import Board from './framework/board';
import Game from './framework/game';

var TicTacToeBoard = Board({
  onSetup: () => {},
  onUpdate: () => {},
  onDraw: () => {},
});

var TicTacToeGame = Game({

  name: 'tic-tac-toe',

  setup: (numPlayers) => {
    const G = {};
    return G;
  },

  moves: {
    'moveWithoutArgs': (G, ctx) => {
      return Object.assign({}, G);
    },
    'moveWithArgs': (G, ctx, arg0, arg1) => {
      return Object.assign({}, G);
    }
  },

  flow: {
    endGameIf: (G, ctx) => { },
    endTurnIf: (G, ctx) => { },
  },

})


Framework({
  board: TicTacToeBoard,
  game: TicTacToeGame
});
