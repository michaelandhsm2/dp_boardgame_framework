import Game from '../framework/game';

let winCondition;
const NULL = false;

var _Game = Game({

  init: ({boardSize, ...args}) => {
    if(boardSize === undefined) boardSize = 400;
    return {
      boardSize, ...args
    }
  },

  setup: ({...args}) => {
    return {
      canvas: [],
      currentType: 'rect',
    };
  },

  moves: {
    'draw': (G, ctx, x, y, w, h) => {
      let canvas; // don't mutate original state.
      if(G.canvas === undefined) canvas = [];
      else canvas  = [...G.canvas];
      canvas.push({
        type: G.currentType,
        x, y, w, h,
      });
      return {...G, canvas};
    },
    'clear': (G, ctx, x, y, w, h) => {
      let canvas = [...G.canvas]; // don't mutate original state.
      canvas = [];
      return {...G, canvas};
    },
    'changeShape': (G, ctx, type) => {
      return {...G, currentType: type};
    },
  },
})

export default _Game;
