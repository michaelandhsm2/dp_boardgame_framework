import Board from '../src/ui/board';
import BlockBuilder from '../src/ui/blockBuilder'
import GameBuilder from '../src/ui/gameBuilder'

describe('Basic UI Setup', () => {

  let board, playerSetup;

  beforeAll(() => {
    board = {
      x: 0,
      y: 0
    };
    playerSetup = {
      money: 1500,
      properties: null,
      position: 0
    };
  });

  test('StreetBlock', () => {
    let block = BlockBuilder.build.call( board, {
      "pos_x": 0,
      "pos_y": 0,
      "type": "Street"
    })
    expect(block.x).toEqual(0);
    block.init();
    expect(block.width).toEqual(60);
    expect(block.height).toEqual(110);
  });

  test('CornerBlock', () => {
    let block = BlockBuilder.build.call( board, {
      "pos_x": 0,
      "pos_y": 0,
      "type": "Corner"
    })
    expect(block.x).toEqual(0);
    block.init();
    expect(block.width).toEqual(110);
    expect(block.height).toEqual(110);
  });

  test('Player', () => {
    let gameBoard = GameBuilder.onUpdate.call( board, {
      numPlayers: 2
    }, {
      players: Array(2).fill(playerSetup)
    });
    expect(gameBoard.player.count).toEqual(2);
    expect(gameBoard.player[0].position).toEqual(0);
    expect(gameBoard.player[0].x).toEqual(0);
  });

});

describe('Animation', () => {

  let playerSetup;

  beforeAll(() => {

  });

  test('StreetBlock', () => {
  });

});

// beforeAll(() => {
//   // console.log(Game)
// });
