import CreateGameReducer from './reducer'
import Game from './game'
import Board from './board'

var Flow = {
  init: function({game, board, numPlayers, multiplayer, ...args}){

    if (!numPlayers) numPlayers = 2;
    if (game === undefined) game = Game({});

    let _reducer = CreateGameReducer({
      game,
      numPlayers,
      ...args
    });

    this.state = _reducer();

    for(let i in game.moves){
      this[game.moves[i].name] = function(...args){
        this.state = _reducer(game.moves[i].name, this.state, ...args);
        if(game.flow.endGameIf && game.flow.endGameIf(this.state.G, this.state.ctx)){
          this.state.ctx.gameover = game.flow.endGameIf(this.state.G, this.state.ctx);
        }
        this.update();
      }
    }

    for(let i in game.flow){
      this[game.flow[i].name] = function(...args){
        this.state = _reducer(game.flow[i].name, this.state, ...args);
      }
      this.update();
    }

    return this;
  },
  update: function(){
  }
};

export default Flow;
