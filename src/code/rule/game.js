import { Game } from 'boardgame.io/core';

let playerSetup = {
  money: 1500,
  properties: null,
  position: 0
};

const _Game = Game({

  setup: (ctx) => ({
    players: Array(ctx.numPlayers).fill(playerSetup)
  }),
  moves: {},
  flow: {},
});

export default _Game;
