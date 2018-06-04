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

  fillText: function(ctx, text, x, y, maxWidth) {
    ctx.font = '12px serif';
    ctx.textAlign = 'center';
    var words = text.split(' ')
    var lineHeight = ctx.measureText("M").width * 1.2;
    var line = words[0];
    var testLine = '';

    for (var i = 1; i < words.length; ++i) {
      testLine = line + ' ' + words[i];
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        ctx.fillText(line, x, y);
        line = words[i];
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
  }
}


export default Canvas;
