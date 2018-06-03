import Game from '../../code/rule/game';

var G;
describe('Initial Game Setup', () => {

  let playerSetup;

  beforeAll(() => {
    playerSetup = {
      money: 1500,
      properties: null,
      position: 0
    }
  });

  test('for 2 player', () => {
    G = Game.setup({ numPlayers: 2 });
    let gameState = {
      players:[playerSetup, playerSetup]
    }
    expect(G).toEqual(gameState);
  });

  test('for 4 player', () => {
    G = Game.setup({ numPlayers: 4 });
    let gameState = {
      players:[playerSetup, playerSetup, playerSetup, playerSetup]
    }
    expect(G).toEqual(gameState);
  });
});

// beforeAll(() => {
//   // console.log(Game)
// });
