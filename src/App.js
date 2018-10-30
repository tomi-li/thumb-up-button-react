import React, { Component } from 'react';
import './App.css';

class App extends Component {

  mounted() {
    console.log(this);
  }

  render() {
    return (
      <canvas></canvas>
    );
  }
}

export default App;
