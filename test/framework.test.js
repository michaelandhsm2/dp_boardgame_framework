import {Reducer} from '../src/framework/reducer';
import Board from '../src/framework/board';
import Game from '../src/framework/game';

describe('Basic Framework', () => {

  let reducer, game, board;

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

    reducer = reducer.start({
      game, board, numPlayers: 3
    });
  });

  test('Basic Setup', () => {
    expect(reducer.ctx.numPlayers).toEqual(3);
    expect(reducer.ctx.moves.count.length).toEqual(game.moves.count.length - 2);
  });

  test('Basic Moves', () => {
    const spyOnUpdate = jest.spyOn(board, 'onUpdate');
    const spyOnDraw = jest.spyOn(board, 'onDraw');

    expect(reducer.G.num).toEqual(0);
    expect(spyOnDraw.mock.calls.length).toEqual(0);
    expect(spyOnUpdate.mock.calls.length).toEqual(0);

    reducer._board[0].test.call(reducer);
    expect(reducer.G.num).toEqual(1);
    expect(spyOnDraw.mock.calls.length).toEqual(1);
    expect(spyOnUpdate.mock.calls.length).toEqual(1);
  });

  test('Basic Turns', () => {
    expect(reducer.ctx.currentPlayer).toEqual(0);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(1);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(2);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(0);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(1);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(2);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.currentPlayer).toEqual(0);
  });

  test('Basic Flow', ()=>{

    reducer._board[0].test.call(reducer);
    expect(reducer.G.num).toEqual(2);
    expect(reducer.ctx.gameover).toEqual(undefined);

    reducer._board[0].test.call(reducer);
    expect(reducer.G.num).toEqual(3);
    expect(reducer.ctx.gameover).toEqual({gameover: true});
  });

  test('Setup with Options', () => {
    reducer.start({
      game,
      num: 2,
    });

    expect(reducer.ctx.num).toEqual(2);
    expect(reducer.G.num).toEqual(2);
  });

  test('Storing States', () => {
    reducer.start({
      game,
    });

    let {moves, events, ...options} = reducer.ctx;
    reducer.ctx.moves.count.call(reducer);
    expect(reducer.G.num).toEqual(1);
    expect(reducer.stack.length).toEqual(1);
    expect(reducer.stack[0]).toEqual({
      type:'count',
      state:{
        G: { num: 0 },
        currentPlayer: 0,
      },
    });

    reducer.undo();
    expect(reducer.G.num).toEqual(0);
    expect(reducer.stack.length).toEqual(0);
  });

});

describe('Advanced Framework', () => {

  let reducer;

  beforeAll(() => {
    reducer = Object.create(Reducer);
  });

  test('Empty Setup', () => {
    reducer.start({});
    expect(reducer.ctx.numPlayers).toEqual(2);
  });

  test('Semi-empty Setup', () => {
    reducer.start({
      board: Board({test: () => {}}),
    });

    reducer._board[0].test.call(reducer);
    expect(reducer.ctx.numPlayers).toEqual(2);
  });

  test('Multiplayer Setup', () => {
    reducer.start({
      multiplayer: true,
    });

    expect(reducer._board.length).toEqual(2);
  });

});
