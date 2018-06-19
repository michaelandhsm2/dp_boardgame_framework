import Framework from '../src/framework/framework'
import CreateGameReducer from '../src/framework/reducer'
import Board from '../src/framework/board'
import Game from '../src/framework/game'
import Flow from '../src/framework/flow'

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
    let reducer = CreateGameReducer({
      game, numPlayers: 3
    });
    let state = reducer.getState();
    expect(state.ctx.numPlayers).toEqual(3);
  });

  test('Basic Moves', () => {
    let reducer = CreateGameReducer({
      game, numPlayers: 3
    });
    let state = reducer.getState();
    expect(state.G.num).toEqual(0);

    // Reducer w/out Given State
    state = reducer.runCommand('count');
    expect(state.G.num).toEqual(1);

    // Reducer w/ Given State
    state = reducer.runCommand('count', {...state, G: { num: 3}});
    expect(state.G.num).toEqual(4);
  });

  test('Basic Moves w/ Board', () => {
    let flow = Flow.init({
      game,
    });
    expect(flow.getState().G.num).toEqual(0);

    flow.count();
    expect(flow.getState().G.num).toEqual(1);
    flow.count();
    expect(flow.getState().G.num).toEqual(2);
  });

  test('Basic Turns', () => {
    let flow = Flow.init({
      game,
      numPlayers: 3,
    });
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
    let flow = Flow.init({
      game,
    });

    flow.count();
    expect(flow.getState().G.num).toEqual(1);
    expect(flow.getState().ctx.gameover).toEqual(undefined);

    flow.count();
    flow.count();
    expect(flow.getState().G.num).toEqual(3);
    expect(flow.getState().ctx.gameover).toEqual({gameover: true});
  });

  test('Setup with Options', () => {
    let flow = Flow.init({
      game,
      num: 2,
    });

    expect(flow.getState().ctx.num).toEqual(2);
    expect(flow.getState().G.num).toEqual(2);
  });

  test('Pass Action', () => {
    let flow = Flow.init({
      game,
      numPlayers: 3,
    });
    expect(flow.getState().G.num).toEqual(0);
    expect(flow.getState().ctx.currentPlayer).toEqual(0);

    flow.action({
      action: 'count',
      state:{
        G: {num: 3},
        ctx: {
          currentPlayer: 2,
          playerOrder: [0,1,2],
        },
      },
      args:[]
    });
    expect(flow.getState().G.num).toEqual(4);
    expect(flow.getState().ctx.currentPlayer).toEqual(2);
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

});
