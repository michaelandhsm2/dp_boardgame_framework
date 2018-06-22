import Reducer from './reducer'

var Flow = {
  init: function({game, ...args}){

    Reducer.setup({
      game,
      ...args
    });

    for(let i in game.moves){
      this[game.moves[i].name] = function(...args){
        this.action(game.moves[i].name, ...args);
      }
    }
    for(let i in game.flow){
      this[game.flow[i].name] = function(...args){
        this.action(game.flow[i].name, ...args);
      }
    }
    return this;
  },
  action: function(action, ...args){
    let _state = Reducer.runCommand(action, ...args);
    this.update(_state);
  },
  getState: function(){
    return Reducer.getState();
  },
  update: function(_state){
  },
};

export default Flow;
