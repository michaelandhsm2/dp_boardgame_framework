import CreateGameReducer from './reducer'
import Game from './game'
import Board from './board'

var Flow = {
  init: function({game, board, numPlayers, multiplayer, ...args}){

    if (!numPlayers) numPlayers = 2;
    if (game === undefined) game = Game({});
    if (multiplayer === undefined) multiplayer = {};
    this.remote = multiplayer.remote;

    this._reducer = CreateGameReducer({
      game,
      numPlayers,
      ...args
    });

    this.state = this._reducer();
    this._gameEvents = game.flow;

    for(let i in game.moves){
      this[game.moves[i].name] = function(...args){
        this.triggerAction(game.moves[i].name, this.state, ...args);
      }
    }
    for(let i in game.flow){
      this[game.flow[i].name] = function(...args){
        this.triggerAction(game.flow[i].name, this.state, ...args);
      }
    }

    return this;
  },
  setDB: function(ref){
    this._ref = ref;
  },
  triggerAction: function(action, state, ...args){
    if(this.remote){
      this._ref.set({
        action,
        state,
        args:[...args],
      });
    }else{
      this.action({action, state, args:[...args]});
    }
  },
  action: function({action, state, args}){
    if(args === undefined) args = [];
    this.state = this._reducer(action, state, ...args);

    if(this._gameEvents.endGameIf && this._gameEvents.endGameIf(this.state.G, this.state.ctx)){
      this.state.ctx.gameover = this._gameEvents.endGameIf(this.state.G, this.state.ctx);
      this.endTurn = (state) => (state)
    }
    this.update();
  },
  update: function(){
    
  },
};

export default Flow;
