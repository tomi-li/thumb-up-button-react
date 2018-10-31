import React, { Component } from 'react';
import { _ } from './modules/utils';
import ReactDom from 'react-dom';
import Partical from './modules/Partical';

export default class Button extends Component {

  componentDidMount() {
    const
      canvas = ReactDom.findDOMNode(this),
      width = document.body.clientWidth,
      height = document.body.clientHeight,
      ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    this.deminsions = { width, height };
    this.ctx = ctx;
    this.particals = [];
    this.animating = false;
    this.emitPoint = {
      x: width / 2,
      y: height / 2,
    }
  }

  drawPartical = (p) => {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.beginPath();
    ctx.font = '46px serif';
    ctx.fillText(p.content, 0, 0);
    ctx.fill();
    ctx.restore();
  };

  update = () => {
    const { height } = this.deminsions;
    this.ctx.clearRect(0, 0, this.deminsions.width, this.deminsions.height);
    this.particals.forEach(each => {
      if (each.x <= 0) {
        each.vx = -each.vx;
      }
      if (each.y <= 0) {
        each.vy = -each.vy;
      }
      each.update();
      this.drawPartical(each);
    });

    const validPartical = this.particals.filter(each => !(each.y > height));

    if (this.particals.length !== validPartical.length) {
      this.particals = validPartical;

      if (_.isEmpty(validPartical)) {
        this.animating = false;
        return;
      }
    }
    requestAnimationFrame(this.update);
  };

  add = () => {
    const icons = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘"];
    this.particals.push(new Partical({
      x: this.emitPoint.x,
      y: this.emitPoint.y,
      vx: _.random(-6, 6, true),
      vy: _.random(-10, 0, true),
      gravity: 0.15,
      content: icons[_.random(0, icons.length - 1)]
    }));
    if (!this.animating) {
      this.update();
      this.animating = true;
    }
  };

  start = () => {
    if (this.adding) {
      this.add();
      requestAnimationFrame(this.start);
    }
  };

  onMouseDown = e => {
    this.adding = true;
    this.emitPoint = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    this.start();
  };

  onMouseUp = () => {
    this.adding = false;
  };

  onMouseMove = (e) => {
    this.emitPoint = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
  };

  render() {
    return (
      <canvas className='thumb-up-button'
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
              onMouseUp={this.onMouseUp}/>
    );
  }
}