import Game from './game'
import Board from './board'
import Flow from './flow'
import Client from './client'

function Framework({board, ...args}){
  if (board === undefined) board = Board({});

  var BoardReducer = Object.create(Flow);
  BoardReducer.init({...args});
  BoardReducer._board = [];

  if(args.multiplayer && !args.multiplayer.remote){
    for(let i = 0; i < BoardReducer.state.ctx.numPlayers; i++){
      BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, i)));
    }
  }else if(args.multiplayer && args.multiplayer.remote){
    var db = Client.start(BoardReducer, args.multiplayer.gameId);
    BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, args.multiplayer.playerId)));
  }else{
    BoardReducer._board.push(Object.create(board, board.onSetup(BoardReducer, null)));
  }

  BoardReducer.update = function(){
    for(let i = 0; i < this._board.length; i++){
      this._board[i].onUpdate(this.state.G, this.state.ctx);
      this._board[i].onDraw(this.state.G, this.state.ctx);
    }
  }

  BoardReducer.update();

  return BoardReducer._board;
}

export default Framework;
