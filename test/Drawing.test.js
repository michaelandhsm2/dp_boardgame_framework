
import Board from '../src/framework/board';
import Game from '../src/framework/game';
import Flow from '../src/framework/flow';
import Reducer from '../src/framework/reducer';
import DrawingGame from '../src/Drawing/game';

describe('Fundemental Drawing Game', () => {

  let flow, canvas;

  beforeAll(() => {
    canvas = [];

    Reducer.setup({
      game: DrawingGame,
      numPlayers: 2,
    })
    flow = Flow(DrawingGame, Reducer);
  });

  test('Basic Setup', () => {
    expect(flow.getState().G.canvas).toEqual(canvas);
    expect(flow.getState().G.currentType).toEqual('rect');
    expect(flow.getState().ctx.boardSize).toEqual(400);
  });

  test('Basic Moves', () => {
    canvas.push({
      type: 'rect',
      x: 10,
      y: 10,
      h: 10,
      w: 10,
    });
    flow.draw(10,10,10,10);
    expect(flow.getState().G.canvas).toEqual(canvas);

    flow.changeShape('circle');
    canvas.push({
      type: 'circle',
      x: 20,
      y: 20,
      h: 20,
      w: 20,
    });
    flow.draw(20,20,20,20);
    expect(flow.getState().G.canvas).toEqual(canvas);
  });

  test('Clear Moves', () => {
    canvas = [];
    flow.clear();
    expect(flow.getState().G.canvas).toEqual(canvas);
  });

  test('Setup BoardSize', () => {
    Reducer.setup({
      game: DrawingGame,
      boardSize: 100,
    });
    expect(flow.getState().ctx.boardSize).toEqual(100);
  });
});
