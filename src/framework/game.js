function Game({init, setup, moves, flow, ...args}){
  if(!init) init = (input) => (input);
  if(!setup) setup = () => ({});
  if(!moves) moves = {};
  if(!flow) flow = {};

  if(!flow['endGameIf']) flow['endGameIf'] = (G, ctx) => (null)
  flow['endTurn'] = function endTurn(G, ctx){
    let currentIndex = ctx.playerOrder.indexOf(ctx.currentPlayer);
    if(currentIndex + 1 === ctx.numPlayers){
      currentIndex = 0;
    }else{
      currentIndex += 1;
    }

    return {G,
      ctx: {
        ...ctx,
        currentPlayer: ctx.playerOrder[currentIndex],
      }
    };
  }

  return {
    init,
    setup,
    moves,
    flow,
    process: (action, state, ...args) => {
      let _state = JSON.parse(JSON.stringify(state));
      if(moves.hasOwnProperty(action)){
        _state.G = moves[action](state.G, state.ctx, ...args);

        let gameOver = flow.endGameIf(_state.G, _state.ctx);
        if(gameOver){
          _state.ctx.gameover = gameOver;
        }
      }else if(flow.hasOwnProperty(action)){
        _state = flow[action](state.G, state.ctx, ...args);
      }
      return _state;
    },
    ...args
  };
}

export default Game;
