import Board from '../src/framework/board';
import Game from '../src/framework/game';
import Flow from '../src/framework/flow';
import CreateGameReducer from '../src/framework/reducer';
import TicTacToeGame from '../src/TicTacToe/game';

const NULL = false;

describe('Fundemental Tic Tac Toe Game', () => {

  let flow, cells;

  beforeAll(() => {
    cells = Array(9).fill(NULL);

    flow = Flow.init({
      game: TicTacToeGame,
    });
  });

  test('Basic Setup', () => {
    expect(flow.state.G.cells).toEqual(cells);
    expect(flow.state.ctx.currentPlayer).toEqual(0);
  });

  test('Basic Moves', () => {
    cells[0] = 0;
    flow.select(0);
    expect(flow.state.G.cells).toEqual(cells);
    flow.endTurn();

    cells[1] = 1;
    flow.select(1);
    expect(flow.state.G.cells).toEqual(cells);
    flow.endTurn();

    cells[4] = 0;
    flow.select(4);
    expect(flow.state.G.cells).toEqual(cells);
    flow.endTurn();
  });

  test('Basic Victory', () => {
    cells[2] = 1;
    flow.select(2);
    flow.endTurn();
    expect(flow.state.ctx.gameover).toEqual(undefined);

    cells[8] = 0;
    flow.select(8);
    flow.endTurn();
    expect(flow.state.G.cells).toEqual(cells);
    expect(flow.state.ctx.gameover).toEqual({winner: 0, tiles:[0, 4, 8]});
  });
});

describe('Advanced Tic Tac Toe Game', () => {

  test('Basic Draw', () => {
    let flow = Flow.init({
      game: TicTacToeGame,
    });

    flow.select(4);
    flow.select(0);
    flow.select(2);
    flow.select(3);
    flow.select(7);
    flow.endTurn();
    flow.select(1);
    flow.select(8);
    flow.select(6);
    flow.select(5);
    flow.endTurn();

    expect(flow.state.ctx.gameover).toEqual({draw:true});
  });

  test('Diffrent Size Board', () => {
    let flow = Flow.init({
      game: TicTacToeGame,
      boardSize: 4,
    });

    expect(flow.state.G.cells).toEqual(Array(16).fill(NULL));
  });

  test('Diffrent Size Board Draw', () => {
    let flow = Flow.init({
      game: TicTacToeGame,
      boardSize: 4,
    });

    expect(flow.state.G.cells).toEqual(Array(16).fill(NULL));

    flow.select(0);
    flow.select(1);
    flow.select(2);
    flow.select(4);
    flow.select(10);
    flow.select(11);
    flow.select(12);
    flow.select(14);
    flow.endTurn();
    flow.select(3);
    flow.select(5);
    flow.select(6);
    flow.select(7);
    flow.select(8);
    flow.select(9);
    flow.select(13);
    flow.select(15);
    flow.endTurn();
    expect(flow.state.ctx.gameover).toEqual({draw: true});
  });

  test('Diffrent Size Board Victory', () => {
    let flow = Flow.init({
      game: TicTacToeGame,
      boardSize: 2,
    });

    expect(flow.state.G.cells).toEqual(Array(4).fill(NULL));
    flow.select(0);
    flow.select(1);
    expect(flow.state.ctx.gameover).toEqual({winner:0, tiles:[0,1]});
  });

});
