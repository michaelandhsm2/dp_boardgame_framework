const BASIC_WIDTH = 60
const BASIC_HEIGHT = 110

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
  },
  onDraw: function(ctx){
    ctx.strokeRect(0, 0, this.width, this.height);
    this.onDrawSpecifics(ctx);
  },
}

var StreetBlock = Object.assign({
  onDrawSpecifics: function(ctx){
    ctx.fillRect(0, 0, this.width, this.height/5);
  }
}, Block);

var DefaultBlock = Object.assign({onDrawSpecifics: function(){}}, Block)
