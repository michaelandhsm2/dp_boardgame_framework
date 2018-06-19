function CreateGameReducer({game, numPlayers, multiplayer, ...args}){

  let options = game.init({...args});

  let _state = {
    // User managed state.
    G: game.setup(options),

    // Framework managed state.
    ctx: {
      numPlayers,
      currentPlayer: 0,
      playerOrder: [],
      ...options,
    },
  };

  for(let i = 0; i < numPlayers; i++){
    _state.ctx.playerOrder.push(i);
  }
  
  var _reducer = {
    runCommand: (action, state = _state, ...args) => {
      _state = game.process(action, state, ...args);
      return _state;
    },
    getState: () => (_state),
    setState: (state) => (_state = state),
  };

  return _reducer;
}

export default CreateGameReducer;
