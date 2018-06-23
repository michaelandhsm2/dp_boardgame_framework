import Game from '../framework/game';

let winCondition;
const NULL = false;

var _Game = Game({
  setup: ({...args}) => {
    return {
      guesses: {
        min: false,
        max: false,
      },
      num: false,
    };
  },

  moves: {
    'setNumber': (G, ctx, num) => {
      return {...G, num, guesses: {
        min: false, max: false,
      }};
    },
    'guessNumber': (G, ctx, num) => {
      let guesses = {...G.guesses}; // don't mutate original state.
      if(G.num !== false){
        if(num === G.num){
          guesses.min = num;
          guesses.max = num;
        }else if(guesses.min === false || (num < G.num && num > guesses.min)){
          guesses.min = num;
        }else if(guesses.max === false || (num > G.num && num < guesses.max)){
          guesses.max = num;
        }
      }
      return {...G, guesses};
    },
  },
  flow:{
    endGameIf(G, ctx){
      if(G.guesses.max === G.guesses.min && G.guesses.max !== false){
        return true;
      }
    },
  }
})

export default _Game;
