import Game from './game'
import Board from './board'
import Flow from './flow'

function Framework({board, game, numPlayers, multiplayer, ...args}){
  if (game === undefined) game = Game({});
  if (board === undefined) board = Board({});
  if (!numPlayers) numPlayers = 2;

  var BoardReducer = Object.create(Flow);
  BoardReducer.init({game, numPlayers, multiplayer, ...args});
  BoardReducer._board = [];

  if(multiplayer && !multiplayer.remote){
    for(let i = 0; i < numPlayers; i++){
      BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, i)));
    }
  }else if(multiplayer && multiplayer.remote){
    BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, multiplayer.playerId)));
  }else{
    BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, null)));
  }

  BoardReducer.update = function(state){
    for(let i = 0; i < this._board.length; i++){
      this._board[i].onUpdate(state.G, state.ctx);
      this._board[i].onDraw(state.G, state.ctx);
    }
  }

  BoardReducer.update(BoardReducer.getState());

  return BoardReducer._board;
}

export default Framework;
