import Game from './game'
import Board from './board'
import BoardFactory from './boardFactory'
import Flow from './flow'
import Reducer from './reducer'

function Framework({board, game, numPlayers, multiplayer, ...args}){
  if (game === undefined) game = Game({});
  if (board === undefined) board = Board({});
  if (!numPlayers) numPlayers = 2;

  Reducer.setup({ game, numPlayers, multiplayer, update: BoardFactory.update, ...args });

  let flow = Flow(game, Reducer, BoardFactory.update);
  BoardFactory.setup({board, numPlayers, multiplayer, flow});
  BoardFactory.update(Reducer.getState());
}

export default Framework;
