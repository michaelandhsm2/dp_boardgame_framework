import Board from '../framework/board';

const UNIT_WIDTH = 50;

var TicTacToeBoard = Board({
  onSetup: function(flow, id){
    let canvas = document.createElement("canvas");
    canvas.height = flow.state.ctx.boardSize * UNIT_WIDTH;
    canvas.width = flow.state.ctx.boardSize * UNIT_WIDTH;
    document.body.appendChild(canvas);

    let para = document.createElement("p");
    document.body.appendChild(para);

    function getPosition(e, isEmpty, callback){
      let rect = canvas.getBoundingClientRect();
      let pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      if(pos.x > 0 && pos.y > 0){
        for(let i = 0; i < flow.state.ctx.boardSize; i++){
          for(let j = 0; j < flow.state.ctx.boardSize; j++){
            if(pos.x > i * UNIT_WIDTH &&
              pos.x < (i+1) * UNIT_WIDTH &&
              pos.y > j * UNIT_WIDTH &&
              pos.y < (j+1) * UNIT_WIDTH &&
              (flow.state.G.cells[i + j * flow.state.ctx.boardSize] === null) === isEmpty &&
              (id === null || id === flow.state.ctx.currentPlayer) &&
              flow.state.ctx.gameover === undefined
            ){
              return callback(i, j);
            }
          }
        }
      }
    }

    canvas.addEventListener('click', (e) => {
      getPosition(e, true, (i, j) => {
        flow.select(i + j * flow.state.ctx.boardSize);
        flow.endTurn();
        return null;
      })
    });

    canvas.addEventListener('mousemove', (e) => {
      flow.update();
      let ctx = canvas.getContext('2d');
      ctx.save();
      getPosition(e, true, (i, j) => {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.35)';
        ctx.fillRect(i * UNIT_WIDTH, j * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        return null;
      })
      getPosition(e, false, (i, j) => {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
        ctx.fillRect(i * UNIT_WIDTH, j * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        return null;
      })
      ctx.restore();
    });

    return ({
      cvs:{
        value: canvas.getContext('2d'),
      },
      para:{
        value: para,
      },
      id:{
        value: id,
      }
    });
  },
  onUpdate: function(G, ctx){

  },
  onDraw: function(G, ctx){
    this.cvs.clearRect(0, 0, 500, 500)
    this.cvs.font = '56px serif';
    this.cvs.texAlign = 'center';
    for(let i = 0; i < ctx.boardSize; i++){
      for(let j = 0; j < ctx.boardSize; j++){
        this.cvs.strokeRect(i * UNIT_WIDTH, j * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        if(G.cells[i + j * ctx.boardSize] !== null){
          let text = 'O';
          if(G.cells[i + j * ctx.boardSize ] !== 0){
            text = 'X';
          }
          this.cvs.fillText(text, i * UNIT_WIDTH + 5, (j+1) * UNIT_WIDTH - 5, UNIT_WIDTH);
        }
      }
    }
    if(ctx.gameover){
      if(ctx.gameover.draw){
        this.para.innerHTML = "Draw!";
      }else{
        this.para.innerHTML = 'Winner: ' + ctx.gameover.winner;
        this.cvs.save();
        for(let i in ctx.gameover.tiles){
          let n = ctx.gameover.tiles[i];
          this.cvs.fillStyle = 'rgba(255, 255, 0, 0.35)';
          this.cvs.fillRect(n%ctx.boardSize * UNIT_WIDTH, Math.floor(n/ctx.boardSize) * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH);
        }
        this.cvs.restore();
      }
    }
  },
});

export default TicTacToeBoard;
