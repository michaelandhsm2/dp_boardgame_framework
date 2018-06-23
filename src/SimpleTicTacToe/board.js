import Board from '../framework/board';

const UNIT_WIDTH = 50;
const NULL = false;

var TicTacToeBoard = Board({
  onSetup: function(flow, id){

    let canvas = document.createElement("canvas");
    canvas.height = 150;
    canvas.width = 150;
    document.body.appendChild(canvas);

    let para = document.createElement("p");
    document.body.appendChild(para);

    canvas.addEventListener('click', (e) => {
      let rect = canvas.getBoundingClientRect();
      let pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      if(pos.x > 0 && pos.y > 0){
        let state = flow.getState();
        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 3; j++){
            if(pos.x > i * UNIT_WIDTH &&
              pos.x < (i+1) * UNIT_WIDTH &&
              pos.y > j * UNIT_WIDTH &&
              pos.y < (j+1) * UNIT_WIDTH &&
              state.G.cells[i + j * 3] === NULL &&
              state.ctx.gameover === undefined
            ){
              flow.select(i + j * 3);
              flow.endTurn();
              return null;
            }
          }
        }
      }
    });

    return ({
      cvs:{
        value: canvas.getContext('2d'),
      },
      para:{
        value: para,
      }
    });
  },
  onUpdate: function(G, ctx){

  },
  onDraw: function(G, ctx){
    this.cvs.clearRect(0, 0, 500, 500)
    this.cvs.font = '56px serif';
    this.cvs.texAlign = 'center';
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        this.cvs.strokeRect(i * UNIT_WIDTH, j * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        if(G.cells[i + j * 3] !== NULL){
          let text = 'O';
          if(G.cells[i + j * 3 ] !== 0) text = 'X';
          this.cvs.fillText(text, i * UNIT_WIDTH + 5, (j+1) * UNIT_WIDTH - 5, UNIT_WIDTH);
        }
      }
    }
    if(ctx.gameover){
      if(ctx.gameover.draw){
        this.para.innerHTML = "Draw!";
      }else{
        this.para.innerHTML = 'Winner: ' + ctx.gameover.winner;
      }
    }
  },
});

export default TicTacToeBoard;
