import Canvas from './canvas'
import BlockBuilder from './blockBuilder'

const standard = require('./standard.json')

var Board = {
  x: 3,
  y: 3,
  init: function(){
    this.itemOnCanvas = []
    for(let i in standard.blocks){
      let block = BlockBuilder.build.call(this, standard.blocks[i]);
      block.init();
      this.itemOnCanvas.push(block);
    }
  },
  onDraw: function(ctx){
    for(let i in this.itemOnCanvas){
      Canvas.rotateToPlace.call(this.itemOnCanvas[i], ctx, () => {
        this.itemOnCanvas[i].onDraw(ctx);
      });
    }
  },
}

export default Board;
