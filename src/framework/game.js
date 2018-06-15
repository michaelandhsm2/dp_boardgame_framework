function Game({init, setup, moves, flow, ...args}){
  if(!init) init = (input) => (input);
  if(!setup) setup = () => ({});
  if(!moves) moves = {};
  if(!flow) flow = {};

  flow['endTurn'] = function endTurn(state){
    let currentIndex = state.ctx.playerOrder.indexOf(state.ctx.currentPlayer);
    if(currentIndex + 1 === state.ctx.numPlayers){
      currentIndex = 0;
    }else{
      currentIndex += 1;
    }

    return {...state,
      ctx: {
        ...state.ctx,
        currentPlayer: state.ctx.playerOrder[currentIndex],
      }
    };
  }

  return {
    init,
    setup,
    moves,
    flow,
    processMoves: (action, state, ...args) => {
      let _state = state;
      _state.G = moves[action](state.G, state.ctx, ...args);
      return _state;
    },
    processEvents: (action, state, ...args) => {
      let _state = state;
      _state = flow[action](state, ...args);
      return _state;
    },
    ...args
  };
}

export default Game;
