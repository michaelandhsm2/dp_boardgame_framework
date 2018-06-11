import Game from './game'
import Board from './board'

var Reducer = {
  start:function({board, game, numPlayers, multiplayer,}){

    if(board === undefined) board = Board({});
    if(game === undefined) game = Game({});
    if(numPlayers === undefined) numPlayers = 2;

    this._board = [];
    if(!multiplayer){
      this._board.push(Object.create(board, board.onSetup(this, null)));
    }else{
      for(let i = 0; i < numPlayers; i++){
        this._board.push(Object.create(board, board.onSetup(this, i)));
      }
    }

    this._game = game;
    this.G = this._game.setup();
    this.ctx = {
      numPlayers,
      moves: {},
      events: {
        endTurn: function(){
          this.ctx.currentPlayer += 1;
          if(this.ctx.currentPlayer >= numPlayers){
            this.ctx.currentPlayer -= numPlayers;
          }
        },
      },
      currentPlayer: 0,
    };

    for(let i in this._game.moves){
      this.ctx.moves[this._game.moves[i].name] = function(...args){
        this.G = this._game.moves[i](this.G, this.ctx, ...args);

        let gameover = this._game.flow.endGameIf(this.G, this.ctx);
        if(gameover !== undefined){
          this.ctx.gameover = gameover;
        }

        this.update();
      }
    }

    this.update();
    return(this);
  },
  update: function(){
    for(let i = 0; i < this._board.length; i++){
      this._board[i].onUpdate(this.G, this.ctx);
      this._board[i].onDraw(this.G, this.ctx);
    }
  },
  createBoard: function(){
    this._board = [];

  }
}

function Framework(obj){
  var reducer = Object.create(Reducer);
  reducer.start(obj);
}

export {Framework, Reducer};
