import Game from '../framework/game';

let winCondition;

var TicTacToeGame = Game({

  setup: () => {
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
    endGameIf: (G, ctx) => {
      if(isVictory(G)){
        return({winner: ctx.currentPlayer, tiles:isVictory(G)});
      }
      if(isDraw(G)){
        return({draw: true});
      }
    },
  },

})

function isVictory(G){
  let winCondition = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  for(let i in winCondition){
    let cond = winCondition[i];
    if(G.cells[cond[0]] !== null &&
      G.cells[cond[0]] === G.cells[cond[1]] &&
      G.cells[cond[1]] === G.cells[cond[2]])
      return cond;
  }

  return false;
}

function isDraw(G){
  for(let i = 0; i < 9; i++){
    if(G.cells[i] === null)
      return false;
  }
  return true;
}

export default TicTacToeGame;
