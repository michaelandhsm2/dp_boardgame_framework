import Game from '../framework/game';

var TicTacToeGame = Game({

  setup: (numPlayers) => {
    return {
      cells: Array(9).fill(null)
    };
  },

  moves: {
    'select': (G, ctx, id) => {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = ctx.currentPlayer;
      return {...G, cells};
    },
  },

  flow: {
    endGameIf: (G, ctx) => { },
  },

})

export default TicTacToeGame;
