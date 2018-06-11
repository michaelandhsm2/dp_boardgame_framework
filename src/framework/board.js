function Board({onSetup, onUpdate, onDraw, ...G}){
  if(!onSetup) onSetup = () => ({});
  if(!onUpdate) onUpdate = () => {};
  if(!onDraw) onDraw = () => {};

  return {
    onSetup,
    onUpdate,
    onDraw,
    ...G,
  };
}

export default Board;
