import Board from '../src/framework/board';
import Game from '../src/framework/game';
import Flow from '../src/framework/flow';
import Reducer from '../src/framework/reducer';
import TicTacToeGame from '../src/TicTacToe/game';

const NULL = false;

describe('Fundemental Tic Tac Toe Game', () => {

  let flow, cells;

  beforeAll(() => {
    cells = Array(9).fill(NULL);

    Reducer.setup({
      game: TicTacToeGame,
      numPlayers: 2,
    })
    flow = Flow(TicTacToeGame, {
      runCommand: Reducer.runCommand,
      getState: Reducer.getState,
    });
  });

  test('Basic Setup', () => {
    expect(flow.getState().G.cells).toEqual(cells);
    expect(flow.getState().ctx.currentPlayer).toEqual(0);
  });

  test('Basic Moves', () => {
    cells[0] = 0;
    flow.select(0);
    expect(flow.getState().G.cells).toEqual(cells);
    flow.endTurn();

    cells[1] = 1;
    flow.select(1);

    expect(flow.getState().G.cells).toEqual(cells);
    flow.endTurn();

    cells[4] = 0;
    flow.select(4);
    expect(flow.getState().G.cells).toEqual(cells);
    flow.endTurn();
  });

  test('Basic Victory', () => {
    cells[2] = 1;
    flow.select(2);
    flow.endTurn();
    expect(flow.getState().ctx.gameover).toEqual(undefined);

    cells[8] = 0;
    flow.select(8);
    flow.endTurn();
    expect(flow.getState().G.cells).toEqual(cells);
    expect(flow.getState().ctx.gameover).toEqual({winner: 0, tiles:[0, 4, 8]});
  });
});

describe('Advanced Tic Tac Toe Game', () => {

  let flow;

  beforeAll(() => {
    flow = Flow(TicTacToeGame, {
      runCommand: Reducer.runCommand,
      getState: Reducer.getState,
    });
  });

  test('Basic Draw', () => {
    Reducer.setup({
      game: TicTacToeGame,
      numPlayers: 2,
    })

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

    expect(flow.getState().ctx.gameover).toEqual({draw:true});
  });

  test('Diffrent Size Board', () => {
    Reducer.setup({
      game: TicTacToeGame,
      numPlayers: 2,
      boardSize: 4,
    })

    expect(flow.getState().G.cells).toEqual(Array(16).fill(NULL));
  });

  test('Diffrent Size Board Draw', () => {
    Reducer.setup({
      game: TicTacToeGame,
      numPlayers: 2,
      boardSize: 4,
    })

    expect(flow.getState().G.cells).toEqual(Array(16).fill(NULL));

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
    expect(flow.getState().ctx.gameover).toEqual({draw: true});
  });

  test('Diffrent Size Board Victory', () => {
    Reducer.setup({
      game: TicTacToeGame,
      numPlayers: 2,
      boardSize: 2,
    })

    expect(flow.getState().G.cells).toEqual(Array(4).fill(NULL));
    flow.select(0);
    flow.select(1);
    expect(flow.getState().ctx.gameover).toEqual({winner:0, tiles:[0,1]});
  });

});
