import Board from '../framework/board';

const UNIT_WIDTH = 50;

var TicTacToeBoard = Board({
  onSetup: function(){
    var canvas = document.createElement("canvas");
    canvas.height = 170;
    canvas.width = 170;
    document.body.appendChild(canvas);

    this.para = document.createElement("p");
    document.body.appendChild(this.para);

    canvas.addEventListener('click', (e) => {
      if(e.clientX > 10 && e.clientY > 10){
        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 3; j++){
            if(e.clientX > 10 + i * UNIT_WIDTH &&
              e.clientX < 10 + (i+1) * UNIT_WIDTH &&
              e.clientY > 10 + j * UNIT_WIDTH &&
              e.clientY < 10 + (j+1) * UNIT_WIDTH &&
              this.G.cells[i + j * 3] === null &&
              this.ctx.gameover === undefined
            ){

              this.ctx.moves.select.call(this, i + j * 3);
              this.ctx.events.endTurn.call(this);
              console.log(this.G.cells)
              return null;
            }
          }
        }
      }
    });

    this.cvs = canvas.getContext('2d');
  },
  onUpdate: function(){

  },
  onDraw: function(){
    this.cvs.clearRect(10, 10, 500, 500)
    this.cvs.font = '56px serif';
    this.cvs.texAlign = 'center';
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        this.cvs.strokeRect(10 + i * UNIT_WIDTH, 10 + j * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        if(this.G.cells[i + j * 3] !== null){
          this.cvs.fillText(this.G.cells[i + j * 3 ], 10 + i * UNIT_WIDTH + 10, 10 + (j+1) * UNIT_WIDTH - 5, UNIT_WIDTH);
        }
      }
    }
    if(this.ctx.gameover){
      console.log("Winner: " + this.ctx.gameover.winner);
      this.para.innerHTML = "Winner: " + this.ctx.gameover.winner;
    }
  },
});

export default TicTacToeBoard;
