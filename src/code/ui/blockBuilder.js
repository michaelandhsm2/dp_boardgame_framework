import Canvas from './canvas'
import trainImage from "../../resource/train.png"
import chanceImage from "../../resource/question-mark.png"
import taxImage from "../../resource/money-bag.png"
import utilityImage from "../../resource/tools.png"
import chestImage from "../../resource/treasure.png"

const BASIC_WIDTH = 60
const BASIC_HEIGHT = 110
const standard = require('./standard.json')

var BlockBuilder = {
  build: function(block){

    let _block = Object.create(block)
    let _blockModel

    if(block.pos_x > 0)
      _block.x = this.x + BASIC_HEIGHT +  (block.pos_x - 1) * BASIC_WIDTH
    else
      _block.x = this.x

    if(block.pos_y > 0)
      _block.y = this.y + BASIC_HEIGHT +  (block.pos_y - 1) * BASIC_WIDTH
    else
      _block.y = this.y

    switch(block.type){
      case 'Corner':
        _blockModel = CornerBlock;
        break;
      case 'Street':
        _blockModel = StreetBlock;
        break;
      default:
        _blockModel = DefaultBlock;
        break;
    }

    return Object.assign( _block, _blockModel );
  }
}

export default BlockBuilder;

var CornerBlock = {
  init: function(){
    this.height = BASIC_HEIGHT;
    this.width = BASIC_HEIGHT;
  },
  onDraw: function(ctx){
    ctx.strokeRect(0, 0, this.width, this.height);
  },
}

var Block = {
  init: function(){
    this.height = BASIC_HEIGHT;
    this.width = BASIC_WIDTH;
    if(this.initSpecifics)
      this.initSpecifics()
  },
  onDraw: function(ctx){
    ctx.strokeRect(0, 0, this.width, this.height);
    this.onDrawSpecifics(ctx);
  },
}

var StreetBlock = Object.assign({
  onDrawSpecifics: function(ctx){
    ctx.save();
    ctx.fillStyle = standard.colors[this.zone];
    ctx.fillRect(0, 0, this.width, this.height/5);
    ctx.restore();
    ctx.strokeRect(0, 0, this.width, this.height/5);
    Canvas.fillText(ctx, this.name, this.width/2.0, this.height * 1/3, this.width);
  }
}, Block);

var DefaultBlock = Object.assign({
  initSpecifics: function(){
    this.img = new Image();
    switch(this.type){
      case 'Railroad':
        this.img.src = trainImage;
        break;
      case 'Chance':
        this.img.src = chanceImage;
        break;
      case 'Tax':
        this.img.src = taxImage;
        break;
      case 'Utilities':
        this.img.src = utilityImage;
        break;
      case 'Chest':
        this.img.src = chestImage;
        break;
      default:
        this.img.src = trainImage;
    }
  },
  onDrawSpecifics: function(ctx){
    let textHeight = Canvas.fillText(ctx, this.name, this.width/2.0, this.height * 1/6, this.width);
    ctx.drawImage(this.img, this.width/10, textHeight, this.width*4/5, (this.height * 8/9 - textHeight));
  }
}, Block)
