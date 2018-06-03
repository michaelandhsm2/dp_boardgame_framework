let playerSetup = {
  money: 1500,
  properties: null,
  position: 0
};

const Game = {
  setup: (ctx) => ({
    players: Array(ctx.numPlayers).fill(playerSetup)
  }),
  moves: {},
  flow: {},
};

export default Game;
