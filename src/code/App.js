import { Client } from 'boardgame.io/react';

import UI from './ui/reactUI';
import Game from './rule/game';

const App = Client({
  game: Game,
  board: UI,
  numPlayers: 1,
});

export default App;
