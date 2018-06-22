import Framework from '../src/framework/framework'
import Reducer from '../src/framework/reducer'
import Board from '../src/framework/board'
import Game from '../src/framework/game'
import Flow from '../src/framework/flow'
import Random from '../src/framework/random'

describe('Basic Framework', () => {

  let game;

  beforeAll(() => {
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
  });

  test('Basic Setup', () => {
    Reducer.setup({
      game, numPlayers: 3
    });
    let state = Reducer.getState();
    expect(state.ctx.numPlayers).toEqual(3);
  });

  test('Basic Moves', () => {
    Reducer.setup({
      game, numPlayers: 3
    });
    let state = Reducer.getState();
    expect(state.G.num).toEqual(0);

    // Reducer w/out Given State
    state = Reducer.runCommand('count');
    expect(state.G.num).toEqual(1);
  });

  test('Basic Moves w/ Board', () => {
    Reducer.setup({
      game,
    })
    let flow = Flow(game, Reducer);
    expect(flow.getState().G.num).toEqual(0);

    flow.count();
    expect(flow.getState().G.num).toEqual(1);
    flow.count();
    expect(flow.getState().G.num).toEqual(2);
  });

  test('Basic Turns', () => {
    Reducer.setup({
      game,
      numPlayers: 3,
    })
    let flow = Flow(game, Reducer);
    expect(flow.getState().ctx.playerOrder).toEqual([0,1,2]);
    expect(flow.getState().ctx.currentPlayer).toEqual(0);

    flow.endTurn();
    expect(flow.getState().ctx.currentPlayer).toEqual(1);
    flow.endTurn();
    expect(flow.getState().ctx.currentPlayer).toEqual(2);
    flow.endTurn();
    expect(flow.getState().ctx.currentPlayer).toEqual(0);
  });

  test('Basic Flow', ()=>{
    Reducer.setup({
      game,
    })
    let flow = Flow(game, Reducer);

    flow.count();
    expect(flow.getState().G.num).toEqual(1);
    expect(flow.getState().ctx.gameover).toEqual(undefined);

    flow.count();
    flow.count();
    expect(flow.getState().G.num).toEqual(3);
    expect(flow.getState().ctx.gameover).toEqual({gameover: true});
  });

  test('Setup with Options', () => {
    Reducer.setup({
      game,
      num: 2,
    })
    let flow = Flow(game, Reducer);

    expect(flow.getState().ctx.num).toEqual(2);
    expect(flow.getState().G.num).toEqual(2);
  });

});

describe('Advanced Framework', () => {
  test('Singleplayer Setup', () => {
    let board = Framework({});
    expect(board.length).toEqual(1);
  });

  test('Multiplayer Setup', () => {
    let board = Framework({
      multiplayer: true,
    });
    expect(board.length).toEqual(2);
  });

  test('Server Setup', () => {
    let board = Framework({
      multiplayer: {
        remote: true,
        playerId: 1,
      },
    });
    expect(board.length).toEqual(1);
  });

  test('Random Testing', () => {
    Reducer.setup({game:Game({})});
    let flow = Flow(Game({}), Reducer);

    let ctx = flow.getState().ctx;
    expect(Random(ctx)).toEqual(168070);
    expect(Random(ctx)).toEqual(677268843);
    expect(Random(ctx)).toEqual(1194115201);
    expect(Random(ctx)).toEqual(1259501992);
    expect(Random(ctx)).toEqual(703671065);

    Reducer.setup({
      game: Game({}),
      seed: 103820004,
    })
    ctx = flow.getState().ctx;
    expect(Random(ctx)).toEqual(1146085864);
    expect(Random(ctx)).toEqual(1484286305);
    expect(Random(ctx)).toEqual(1229884583);
    expect(Random(ctx)).toEqual(1140084106);

  });

});
