import Game from './game'
import Board from './board'
import Flow from './flow'
import Reducer from './reducer'

function Framework({board, game, numPlayers, multiplayer, ...args}){
  if (game === undefined) game = Game({});
  if (board === undefined) board = Board({});
  if (!numPlayers) numPlayers = 2;

  Reducer.setup({ game, numPlayers, multiplayer, update, ...args });

  let flow = Flow(game, Reducer, update);
  let _board = [];

  if(multiplayer && !multiplayer.remote){
    for(let i = 0; i < numPlayers; i++){
      _board.push(Object.create(board, board.onSetup(flow, i)));
    }
  }else if(multiplayer && multiplayer.remote){
    _board.push(Object.create(board, board.onSetup(flow, multiplayer.playerId)));
  }else{
    _board.push(Object.create(board, board.onSetup(flow, null)));
  }

  function update(state){
    for(let i = 0; i < _board.length; i++){
      _board[i].onUpdate(state.G, state.ctx);
      _board[i].onDraw(state.G, state.ctx);
    }
  }

  update(Reducer.getState());

  return _board;
}

export default Framework;
