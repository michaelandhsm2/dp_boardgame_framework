import Client from './client'

var Reducer = (function (){

  let _state, _game, _update;

  function setup({game, numPlayers, multiplayer, update, ...args}){

    if(update === undefined) update = () => {};

    let options = game.init({...args});

    _game = game;
    _update = update;
    _state = {
      G: game.setup(options),
      ctx: {
        numPlayers,
        currentPlayer: 0,
        playerOrder: [],
        ...options,
      },
    }

    for(let i = 0; i < numPlayers; i++){
      _state.ctx.playerOrder.push(i);
    }

    if(multiplayer && multiplayer.remote){
      Client.start(multiplayer.gameId, (state) => {
        _state = state;
        _update(state);
      });
    }
  }

  return {
    setup: setup,
    runCommand: (action, ...args) => {
      _state = _game.process(action, _state, ...args);
      Client.pushState(_state);
      _update(_state);
      return _state;
    },
    getState: () => (_state),
  };
})();

export default Reducer;
