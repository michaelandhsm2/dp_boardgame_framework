var Reducer = {
  start:function({board, game, numPlayers}){
    this._board = board;
    this._board.onSetup.call(this);

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

        this._board.onUpdate.call(this);
        this._board.onDraw.call(this);
      }
    }

    this._board.onUpdate.call(this);
    this._board.onDraw.call(this);
    return(this);
  },
}

function Framework(obj){
  var reducer = Object.create(Reducer);
  reducer.start(obj);
}

export {Framework, Reducer};
