import {Reducer} from '../src/framework/reducer';
import Board from '../src/framework/board';
import Game from '../src/framework/game';

describe('Framework', () => {

  let reducer, game, board, result;

  beforeAll(() => {
    reducer = Object.create(Reducer);

    board = Board({
      onSetup: function(){
      },
      onUpdate: function(){
      },
      onDraw: function(){
      },
      test: function(){
        this.ctx.moves.count.call(this);
      },
      switch: function(){
        this.ctx.events.endTurn.call(this);
      },
    });

    game = Game({
      setup: (numPlayers) => {
        const G = {
          num: 0
        };
        return G;
      },

      moves: {
        count: (G, ctx) => {
          let num = G.num + 1
          return{...G, num}
        }
      },
    });

    result = reducer.start({
      game, board, numPlayers: 3
    });
  });

  test('Basic Setup', () => {
    expect(result.ctx.numPlayers).toEqual(3);
    expect(result.ctx.moves.count.length).toEqual(game.moves.count.length - 2);
  });

  test('Basic Moves', () => {
    const spyOnUpdate = jest.spyOn(board, 'onUpdate');
    const spyOnDraw = jest.spyOn(board, 'onDraw');

    expect(result.G.num).toEqual(0);
    expect(spyOnDraw.mock.calls.length).toEqual(0);
    expect(spyOnUpdate.mock.calls.length).toEqual(0);

    reducer._board.test.call(reducer);
    expect(result.G.num).toEqual(1);
    expect(spyOnDraw.mock.calls.length).toEqual(1);
    expect(spyOnUpdate.mock.calls.length).toEqual(1);
  });

  test('Basic Turns', () => {
    expect(result.ctx.currentPlayer).toEqual(0);
    reducer._board.switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(1);
    reducer._board.switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(2);
    reducer._board.switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(0);
  });

});
