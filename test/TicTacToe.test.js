import {Reducer} from '../src/framework/reducer';
import Board from '../src/framework/board';
import TicTacToeGame from '../src/TicTacToe/game';

describe('Tic Tac Toe Game', () => {

  let reducer, board, result, cells;

  beforeAll(() => {
    cells = Array(9).fill(null);

    reducer = Object.create(Reducer);

    board = Board({
      onSetup: function(){
      },
      onUpdate: function(){
      },
      onDraw: function(){
      },
    });

    result = reducer.start({
      game: TicTacToeGame,
      board,
      numPlayers: 2,
    });
  });

  test('Basic Setup', () => {
    expect(reducer.G.cells).toEqual(cells);
  });

  test('Basic Moves', () => {
    cells[0] = 0;
    reducer.ctx.moves.select.call(reducer, 0);
    expect(reducer.G.cells).toEqual(cells);
    reducer.ctx.events.endTurn.call(reducer);

    cells[1] = 1;
    reducer.ctx.moves.select.call(reducer, 1);
    expect(reducer.G.cells).toEqual(cells);
    reducer.ctx.events.endTurn.call(reducer);

    cells[4] = 0;
    reducer.ctx.moves.select.call(reducer, 4);
    expect(reducer.G.cells).toEqual(cells);
    reducer.ctx.events.endTurn.call(reducer);
  });

  test('Basic Victory', () => {
    cells[2] = 1;
    reducer.ctx.moves.select.call(reducer, 2);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.ctx.gameover).toEqual(undefined);

    cells[8] = 0;
    reducer.ctx.moves.select.call(reducer, 8);
    reducer.ctx.events.endTurn.call(reducer);
    expect(reducer.G.cells).toEqual(cells);
    expect(reducer.ctx.gameover).toEqual({winner: 0});
  });

});
