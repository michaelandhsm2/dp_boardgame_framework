import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

import UI from './ui/reactUI';

const _Game = Game({
  setup: () => ({}),
});

const App = Client({
  game: _Game,
  board: UI,
});

export default App;
