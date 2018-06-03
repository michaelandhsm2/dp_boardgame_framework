import React from 'react';
import Board from './ui/board';
import Canvas from './ui/canvas';

class App extends React.Component {
  constructor(props){
    super(props);

    this.board = Object.create(Board);
    this.board.init();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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


export default App;
