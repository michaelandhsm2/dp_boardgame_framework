import {Reducer} from '../src/framework/reducer';
import Board from '../src/framework/board';
import Game from '../src/framework/game';

describe('Basic Framework', () => {

  let reducer, game, board, result;

  beforeAll(() => {
    reducer = Object.create(Reducer);

    board = Board({
      test: function(){
        this.ctx.moves.count.call(this);
      },
      switch: function(){
        this.ctx.events.endTurn.call(this);
      },
    });

    game = Game({
      setup: ({num}) => {
        if(num === undefined) num = 0;
        return {num};
      },

      moves: {
        count: (G, ctx) => {
          let num = G.num + 1
          return{...G, num}
        }
      },

      flow: {
        endGameIf: (G, ctx) => {
          if(G.num > 2){
            return {gameover: true};
          }
        },
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

    reducer._board[0].test.call(reducer);
    expect(result.G.num).toEqual(1);
    expect(spyOnDraw.mock.calls.length).toEqual(1);
    expect(spyOnUpdate.mock.calls.length).toEqual(1);
  });

  test('Basic Turns', () => {
    expect(result.ctx.currentPlayer).toEqual(0);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(1);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(2);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(0);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(1);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(2);
    reducer._board[0].switch.call(reducer);
    expect(result.ctx.currentPlayer).toEqual(0);
  });

  test('Basic Flow', ()=>{

    reducer._board[0].test.call(reducer);
    expect(result.G.num).toEqual(2);
    expect(result.ctx.gameover).toEqual(undefined);

    reducer._board[0].test.call(reducer);
    expect(result.G.num).toEqual(3);
    expect(result.ctx.gameover).toEqual({gameover: true});
  });

  test('Setup with Options', () => {
    let result = reducer.start({
      game,
      num: 2,
    });

    expect(result.ctx.num).toEqual(2);
    expect(result.G.num).toEqual(2);
  });

});

describe('Advanced Framework', () => {

  let reducer;

  beforeAll(() => {
    reducer = Object.create(Reducer);
  });

  test('Empty Setup', () => {
    let result = reducer.start({});
    expect(result.ctx.numPlayers).toEqual(2);
  });

  test('Semi-empty Setup', () => {
    let result = reducer.start({
      board: Board({test: () => {}}),
    });

    reducer._board[0].test.call(reducer);
    expect(result.ctx.numPlayers).toEqual(2);
  });

  test('Multiplayer Setup', () => {
    let result = reducer.start({
      multiplayer: true,
    });

    expect(result._board.length).toEqual(2);
  });

});
