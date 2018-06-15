import Framework from '../src/framework/framework'
import CreateGameReducer from '../src/framework/reducer'
import Board from '../src/framework/board'
import Game from '../src/framework/game'
import Flow from '../src/framework/flow'

describe('Basic Framework', () => {

  let game, board;

  beforeAll(() => {
    // reducer = Object.create(Reducer);

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
  });

  test('Basic Setup', () => {
    let reducer = CreateGameReducer({
      game, numPlayers: 3
    });
    let state = reducer();
    expect(state.ctx.numPlayers).toEqual(3);
  });

  test('Basic Moves', () => {
    let reducer = CreateGameReducer({
      game, numPlayers: 3
    });
    let state = reducer();
    expect(state.G.num).toEqual(0);

    // Reducer w/out Given State
    state = reducer('count');
    expect(state.G.num).toEqual(1);

    // Reducer w/ Given State
    state = reducer('count', {...state, G: { num: 3}});
    expect(state.G.num).toEqual(4);
  });

  test('Basic Moves w/ Board', () => {
    let flow = Flow.init({
      game,
    });
    expect(flow.state.G.num).toEqual(0);

    flow.count();
    expect(flow.state.G.num).toEqual(1);
    flow.count();
    expect(flow.state.G.num).toEqual(2);
  });

  test('Basic Turns', () => {
    let flow = Flow.init({
      game,
      numPlayers: 3,
    });
    expect(flow.state.ctx.playerOrder).toEqual([0,1,2]);
    expect(flow.state.ctx.currentPlayer).toEqual(0);

    flow.endTurn();
    expect(flow.state.ctx.currentPlayer).toEqual(1);
    flow.endTurn();
    expect(flow.state.ctx.currentPlayer).toEqual(2);
    flow.endTurn();
    expect(flow.state.ctx.currentPlayer).toEqual(0);
  });

  test('Basic Flow', ()=>{
    let flow = Flow.init({
      game,
    });

    flow.count();
    expect(flow.state.G.num).toEqual(1);
    expect(flow.state.ctx.gameover).toEqual(undefined);

    flow.count();
    flow.count();
    expect(flow.state.G.num).toEqual(3);
    expect(flow.state.ctx.gameover).toEqual({gameover: true});
  });

  test('Setup with Options', () => {
    let flow = Flow.init({
      game,
      num: 2,
    });

    expect(flow.state.ctx.num).toEqual(2);
    expect(flow.state.G.num).toEqual(2);
  });
  //
  // test('Storing States', () => {
  //   reducer.start({
  //     game,
  //   });
  //
  //   let {moves, events, ...options} = reducer.ctx;
  //   reducer.ctx.moves.count.call(reducer);
  //   expect(reducer.G.num).toEqual(1);
  //   expect(reducer.stack.length).toEqual(1);
  //   expect(reducer.stack[0]).toEqual({
  //     type:'count',
  //     state:{
  //       G: { num: 0 },
  //       currentPlayer: 0,
  //     },
  //   });
  //
  //   reducer.undo();
  //   expect(reducer.G.num).toEqual(0);
  //   expect(reducer.stack.length).toEqual(0);
  // });

});

describe('Advanced Framework', () => {

  test('Empty Setup', () => {
    let flow = Flow.init({});
    expect(flow.state.ctx.numPlayers).toEqual(2);
  });

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
