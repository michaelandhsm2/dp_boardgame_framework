import Game from './game'
import Board from './board'
import BoardFactory from './boardFactory'
import Flow from './flow'
import Reducer from './reducer'

function Framework({board, game, numPlayers, multiplayer, ...args}){
  if (game === undefined) game = Game({});
  if (board === undefined) board = Board({});
  if (!numPlayers) numPlayers = 2;

  let update = BoardFactory.update;
  let getState = Reducer.getState;
  let runCommand = Reducer.runCommand;

  Reducer.setup({ game, numPlayers, multiplayer, update, ...args });

  let flow = Flow(game, getState, runCommand, update);
  BoardFactory.setup({board, numPlayers, multiplayer, flow});

  update(getState());
}

export default Framework;
