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

    cells[2] = 0;
    reducer.ctx.moves.select.call(reducer, 2);
    expect(reducer.G.cells).toEqual(cells);
  });

});
