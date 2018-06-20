import Board from '../framework/board';

var _Board = Board({
  onSetup: function(flow, id){
    let ctx = flow.getState().ctx;
    let canvas = document.createElement("canvas");
    canvas.height = ctx.boardSize;
    canvas.width = ctx.boardSize;
    document.body.appendChild(canvas);

    if(id === null || id === 0){
      createButton(document, "Clear", (e) => {
        flow.clear();
      })
      createButton(document, "Rectangle", (e) => {
        flow.changeShape('rect');
      })
      createButton(document, "Circle", (e) => {
        flow.changeShape('circle');
      })
      createButton(document, "Star", (e) => {
        flow.changeShape('star');
      })
    }


    var mouseDown = {};

    function getPosition(e, callback){
      let rect = canvas.getBoundingClientRect();
      let pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      return callback(pos);
    }

    canvas.addEventListener('mousedown', (e) => {
      getPosition(e, (pos) => {
        mouseDown = pos;
      })
    });

    canvas.addEventListener('mouseup', (e) => {
      if(mouseDown.x){
        getPosition(e, (pos) => {
          flow.draw(
            Math.min(pos.x, mouseDown.x),
            Math.min(pos.y, mouseDown.y),
            Math.abs(pos.x - mouseDown.x),
            Math.abs(pos.y - mouseDown.y));
          mouseDown = {};
        })
      }
    });

    canvas.addEventListener('mouseout', (e) => {
      mouseDown = {};
      flow.update(flow.getState());
    });

    canvas.addEventListener('mousemove', (e) => {
      let state = flow.getState();
      flow.update(state);
      let ctx = canvas.getContext('2d');
      ctx.save();
      ctx.setLineDash([3,3]);
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      getPosition(e, (pos) => {
        drawShape(ctx, true, state.G.currentType,
          Math.min(pos.x, mouseDown.x),
          Math.min(pos.y, mouseDown.y),
          Math.abs(pos.x - mouseDown.x),
          Math.abs(pos.y - mouseDown.y));
        return null;
      })
      ctx.restore();
    });

    return ({
      cvs:{
        value: canvas.getContext('2d'),
      },
    });
  },
  onUpdate: function(G, ctx){

  },
  onDraw: function(G, ctx){
    this.cvs.clearRect(0, 0, ctx.boardSize, ctx.boardSize);

    this.cvs.strokeRect(0, 0, ctx.boardSize, ctx.boardSize);

    this.cvs.save();
    let colors = ['rgba(255, 0, 0, 0.4)', 'rgba(0, 255, 0, 0.4)', 'rgba(0, 0, 255, 0.4)']
    for(let i in G.canvas){
      let shape = G.canvas[i];
      this.cvs.fillStyle = colors[i%3];
      drawShape(this.cvs, false, shape.type, shape.x, shape.y, shape.w, shape.h);
    }
    this.cvs.restore();
  },
});

function drawShape(ctx, isStroke, shape, x, y, w, h){
  switch(shape){
    case 'star':
      ctx.beginPath();
      ctx.moveTo(x + w/2.0, y);
      ctx.lineTo(x + w/6.0, y + h);
      ctx.lineTo(x + w, y + h/3.0);
      ctx.lineTo(x, y + h/3.0);
      ctx.lineTo(x + w*5/6.0, y + h);
      ctx.closePath();
      break;
    case 'circle':
      ctx.beginPath();
      ctx.ellipse(x + w/2.0, y + h/2.0, w/2.0, h/2.0, 0, 0, 2 * Math.PI);
      ctx.closePath();
      break;
    case 'rect':
    default:
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      break;
  }

  if(isStroke){
    ctx.stroke();
  }else{
    ctx.fill();
  }
}


function createButton(document, text, callback){
  let _button = document.createElement("BUTTON");
  let _textNode = document.createTextNode(text);
  _button.appendChild(_textNode);
  document.body.appendChild(_button);

  _button.addEventListener('click', callback);
}

export default _Board;
