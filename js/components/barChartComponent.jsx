import React from 'react';
import { render } from 'react-dom';

export default class barChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { src: imageUrl, value, color, amount } = this.props;
    const barStyle = {
      background: color,
      height: `${value}px`
    };

    return (
      <div className="bar-chart-container">
        <img className="" src={imageUrl} />
        <div className="bar-container">
          <div className="bar" style={barStyle} />
          <span className="amount text-center text-white">{amount}</span>
        </div>
      </div>
    );
  }
}
