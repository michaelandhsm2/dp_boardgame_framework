import Game from '../framework/game';

let winCondition;

var TicTacToeGame = Game({

  init: ({boardSize, ...args}) => {
    if(!boardSize) boardSize = 3;
    return {
      boardSize, ...args
    };
  },

  setup: ({boardSize}) => {

    winCondition = [];

    let diagnal_R = [];
    let diagnal_L = [];
    for(let i = 0; i < boardSize; i++){
      let horizontal = [];
      let vertical = [];
      for(let j = 0; j < boardSize; j++){
        horizontal.push(i * boardSize + j);
        vertical.push(i + j * boardSize);
      }
      winCondition.push(horizontal);
      winCondition.push(vertical);
      diagnal_L.push(i + i * boardSize);
      diagnal_R.push((boardSize-i-1) + i * boardSize);
    }
    winCondition.push(diagnal_L);
    winCondition.push(diagnal_R);

    return {
      cells: Array(Math.pow(boardSize,2)).fill(null)
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

  for(let i in winCondition){
    let cond = winCondition[i];

    for(let j = 1; cond && j < cond.length; j++){
      if(G.cells[cond[j]] === null || G.cells[cond[j-1]] !== G.cells[cond[j]]){
        cond = null;
      }
    }
    if(cond !== null)
      return cond;
  }

  return false;
}

function isDraw(G){
  for(let i = 0; i < G.cells.length; i++){
    if(G.cells[i] === null)
      return false;
  }
  return true;
}

export default TicTacToeGame;
