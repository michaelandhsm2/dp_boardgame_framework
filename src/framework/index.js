var Reducer = {
  start:function({board, game, numPlayers}){
    this._board = board;
    this._board.onSetup();

    this._game = game;
    this.G = this._game.setup();
    this.ctx = {
      numPlayers,
      moves:{}
    };

    for(let i in this._game.moves){
      this.ctx.moves[this._game.moves[i].name] = function(...args){
        this.G = this._game.moves[i](this.G, this.ctx, ...args);
        this._board.onUpdate();
        this._board.onDraw();
      }
    }
    return(this);
  },
  run: function(){
    this._board.test.bind(this)();
  }
}

function Framework(obj){
  var reducer = Object.create(Reducer);
  reducer.start(obj);
}

export {Framework, Reducer};
