var Canvas = {
  clear: function(ctx, canvas){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  rotateToPlace: function(ctx, onDraw){
    ctx.save();

    if(this.rotate%180 === 0){
      ctx.translate(this.x + this.width/2, this.y + this.height/2);
    }else{
      ctx.translate(this.x + this.height/2, this.y + this.width/2);
    }
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.translate(- this.width/2, - this.height/2);

    onDraw();

    ctx.restore();
  },
}

export default Canvas;
