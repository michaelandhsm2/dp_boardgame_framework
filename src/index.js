import Board from './ui/board';
import Canvas from './ui/canvas';
import Game from './rule/game';

var board, game;

(function onCreate(){

  const canvas = document.createElement('canvas');
  canvas.id = "canvas";
  canvas.width = 1000;
  canvas.height = 1000;
  document.getElementsByTagName("body")[0].appendChild(canvas);

  game = Object.create(Game);
  game.setup({
    numPlayers: 2
  });

  board = Object.create(Board);
  board.init(game);

  requestAnimationFrame(onDraw);
})();

function onDraw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  Canvas.clear(ctx, canvas);
  board.onDraw(ctx);
  requestAnimationFrame(onDraw);
}
