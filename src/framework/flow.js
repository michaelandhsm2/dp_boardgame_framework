function Flow (game, reducer, boardUpdate) {
  if(boardUpdate === undefined) boardUpdate = () => {};

  var _flow = {
    update: boardUpdate,
    getState: reducer.getState,
  }

  function action(action, ...args){
    let state = reducer.runCommand(action, ...args);
    boardUpdate(state);
  }

  for(let i in game.moves){
    _flow[game.moves[i].name] = function(...args){
      action(game.moves[i].name, ...args);
    }
  }
  for(let i in game.flow){
    _flow[game.flow[i].name] = function(...args){
      action(game.flow[i].name, ...args);
    }
  }

  return _flow;
};

export default Flow;
