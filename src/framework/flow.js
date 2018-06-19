import CreateGameReducer from './reducer'
import Client from './client'

var Flow = {
  init: function({game, board, numPlayers, multiplayer, ...args}){
    if (multiplayer === undefined) multiplayer = {};
    this.remote = multiplayer.remote;

    this._reducer = CreateGameReducer({
      game,
      numPlayers,
      ...args
    });

    this._gameEvents = game.flow;

    for(let i in game.moves){
      this[game.moves[i].name] = function(...args){
        this.triggerAction(game.moves[i].name, ...args);
      }
    }
    for(let i in game.flow){
      this[game.flow[i].name] = function(...args){
        this.triggerAction(game.flow[i].name, ...args);
      }
    }

    if(multiplayer && multiplayer.remote){
      this._ref = Client.start(this, multiplayer.gameId);
    }

    return this;
  },
  triggerAction: function(action, ...args){
    if(this.remote){
      this._ref.set({
        action,
        state: this._reducer.getState(),
        args:[...args],
      });
    }else{
      this.action({action, args:[...args]});
    }
  },
  action: function({action, state, args}){
    if(args === undefined) args = [];
    let _state = this._reducer.runCommand(action, state, ...args);

    if(this._gameEvents.endGameIf(_state.G, _state.ctx)){
      _state.ctx.gameover = this._gameEvents.endGameIf(_state.G, _state.ctx);
      this._reducer.setState(_state);
      this.endTurn = (_state) => (_state)
    }
    this.update(_state);
  },
  getState: function(){
    return this._reducer.getState();
  },
  update: function(_state){
  },
};

export default Flow;
