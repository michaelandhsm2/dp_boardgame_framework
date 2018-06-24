
import Board from '../src/framework/board';
import Game from '../src/framework/game';
import Flow from '../src/framework/flow';
import Reducer from '../src/framework/reducer';
import GuessingGame from '../src/Guessing/game';

describe('Fundemental Drawing Game', () => {

  let flow, guesses;

  beforeAll(() => {
    guesses = {
      min: false,
      max: false,
    };

    Reducer.setup({
      game: GuessingGame,
      numPlayers: 2,
    })
    flow = Flow(GuessingGame, {
      runCommand: Reducer.runCommand,
      getState: Reducer.getState,
    });
  });

  test('Basic Setup', () => {
    expect(flow.getState().G.num).toEqual(false);
    expect(flow.getState().G.guesses).toEqual(guesses);
  });

  test('Basic Moves', () => {
    flow.setNumber(33);
    expect(flow.getState().G.num).toEqual(33);

    flow.guessNumber(0);
    guesses.min = 0;
    expect(flow.getState().G.guesses).toEqual(guesses);

    flow.guessNumber(34);
    guesses.max = 34;
    expect(flow.getState().G.guesses).toEqual(guesses);
    expect(flow.getState().ctx.gameover).toEqual(undefined);

    flow.guessNumber(33);
    guesses.max = 33;
    guesses.min = 33;
    expect(flow.getState().G.guesses).toEqual(guesses);
    expect(flow.getState().ctx.gameover).toEqual(true);
  });
});
