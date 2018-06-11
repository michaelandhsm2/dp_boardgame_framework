function Game({setup, moves, flow}){
  if(!setup) setup = () => ({});
  if(!moves) moves = {};
  if(!flow) flow = {};

  return {
    setup,
    moves,
    flow,
  };
}

export default Game;
