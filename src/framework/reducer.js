function CreateGameReducer({game, numPlayers, multiplayer, ...args}){

  let options = game.init({...args});

  const initial = {
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
    initial.ctx.playerOrder.push(i);
  }



  return (action, state = initial, ...args) => {
    if(game.moves.hasOwnProperty(action)){
      state = game.processMoves(action, state, ...args);
    }
    if(game.flow.hasOwnProperty(action)){
      state = game.processEvents(action, state, ...args);
    }
    return state;
  };

}

export default CreateGameReducer;
