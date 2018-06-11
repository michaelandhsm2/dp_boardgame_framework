import {Reducer} from '../src/framework/reducer';
import Board from '../src/framework/board';
import TicTacToeGame from '../src/TicTacToe/game';

describe('Tic Tac Toe Game', () => {

  let reducer, cells;

  beforeAll(() => {
    cells = Array(9).fill(null);

    reducer = Object.create(Reducer);

    reducer.start({
      game: TicTacToeGame,
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
    expect(reducer.ctx.gameover).toEqual({winner: 0, tiles:[0, 4, 8]});
  });

  test('Basic Victory', () => {

    reducer.start({
      game: TicTacToeGame,
      numPlayers: 2,
    });

    reducer.ctx.moves.select.call(reducer, 4);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 1);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 0);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 8);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 2);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 6);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 3);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 5);
    reducer.ctx.events.endTurn.call(reducer);
    reducer.ctx.moves.select.call(reducer, 7);
    reducer.ctx.events.endTurn.call(reducer);

    expect(reducer.ctx.gameover).toEqual({draw:true});
  });

});
