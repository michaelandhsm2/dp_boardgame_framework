function Game({init, setup, moves, flow, ...args}){
  if(!init) init = (input) => (input);
  if(!setup) setup = () => ({});
  if(!moves) moves = {};
  if(!flow) flow = {};

  return {
    init,
    setup,
    moves,
    flow,
    ...args
  };
}

export default Game;
