import Board from './ui/board';
import Canvas from './ui/canvas';

var canvas = document.createElement('canvas');
canvas.id = "canvas";
canvas.width = 1000;
canvas.height = 1000;

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

var board = Object.create(Board);
board.init();

requestAnimationFrame(onDraw);

function onDraw() {
  console.log(this)
  const ctx = canvas.getContext('2d');
  Canvas.clear(ctx, canvas);
  board.onDraw(ctx);
  requestAnimationFrame(this.onDraw);
}
