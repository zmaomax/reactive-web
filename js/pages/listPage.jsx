import React from 'react';
import PhotoComponent from '../components/photoComponent';
import BarChartComponent from '../components/barChartComponent';
import { Link } from 'react-router-dom';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
      const { type } = this.props.match.params;
      const list = JSON.parse(sessionStorage.getItem(type));

      this.setState({ list });
  }
  render() {
      const { list } = this.state;
      const { type } = this.props.match.params;
      const logo = type === 'like' ? '/assets/img/icn_like.svg' : '/assets/img/icn_delete.svg';
      return (
          <div>
              <h1>My recipes</h1>
              <div>
                  <span><img src={logo}/></span><span>{list.length}</span>
              </div>
              <ul>
                  {list.map((food) => <li><Link to={{ pathname: `detail/${food.id}` }}><img src={food.img} /></Link></li>)}
              </ul>
          </div>
      );
  }
}
