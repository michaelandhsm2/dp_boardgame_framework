import React from 'react';
import Board from './board';
import Canvas from './canvas';

class ReactUI extends React.Component {
  constructor(props){
    super(props);

    this.board = Object.create(Board);
    this.board.init();
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    Canvas.clear(ctx, canvas);
    this.board.onDraw(ctx);
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    Canvas.clear(ctx, canvas);
    this.board.onDraw(ctx);
  }

  render() {
    return <canvas ref="canvas" width="1000" height="1000"> </canvas>;
  }
}


export default ReactUI;
