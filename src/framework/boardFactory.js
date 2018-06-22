var BoardFactory = (function(){

  let _board = [];

  return {
    setup: function({board, numPlayers, multiplayer, flow}){
      if(multiplayer && !multiplayer.remote){
        for(let i = 0; i < numPlayers; i++){
          _board.push(Object.create(board, board.onSetup(flow, i)));
        }
      }else if(multiplayer && multiplayer.remote){
        _board.push(Object.create(board, board.onSetup(flow, multiplayer.playerId)));
      }else{
        _board.push(Object.create(board, board.onSetup(flow, null)));
      }
    },
    update: function(state){
      for(let i = 0; i < _board.length; i++){
        _board[i].onUpdate(state.G, state.ctx);
        _board[i].onDraw(state.G, state.ctx);
      }
    },
  }
})();

export default BoardFactory;
