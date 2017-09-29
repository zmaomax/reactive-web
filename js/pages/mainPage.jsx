import React from 'react';
import PhotoComponent from '../components/photoComponent';
import BarChartComponent from '../components/barChartComponent';
import { Link } from 'react-router-dom';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
      currentFoodIndex: 0,
      errorMessage: undefined,
      likes: [],
      dislikes: [],
      dislikesPercentage: 0,
      likesPercentage: 0
    };
  }
  handlePhotoAction(action) {
    let { currentFoodIndex, dislikesPercentage, likesPercentage } = this.state;
    const { likes, dislikes, foodList } = this.state;

    if (action === 'like') {
      likes.push(foodList[currentFoodIndex]);
    } else {
      dislikes.push(foodList[currentFoodIndex]);
    }

    currentFoodIndex += 1;

    if (currentFoodIndex === foodList.length - 1) {
      this.getFoodList().then(newFoodList => {
        this.setState({ foodList: foodList.concat(newFoodList), currentFoodIndex });
      });
    }

    const totalAmount = likes.length + dislikes.length;
    dislikesPercentage = dislikes.length * 100 / totalAmount;
    likesPercentage = likes.length * 100 / totalAmount;

    this.setState({ likes, dislikes, currentFoodIndex, dislikesPercentage, likesPercentage });
  }
  getFoodList() {
    return fetch("/food")
    .then((response) => response.json());
  }
  componentDidMount() {
    const cache = sessionStorage.getItem('mainPageState') || null;

    if (cache) {
      return this.setState(JSON.parse(cache));
    }

    this.getFoodList()
      .then(foodList => this.setState({ foodList }))
      .catch(error => this.setState({ errorMessage: error }));
  }
  handleListClick (type) {
    return () => {
      sessionStorage.setItem(type, JSON.stringify(this.state[`${type}s`]));
    };
  }
  componentWillUnmount () {
    sessionStorage.setItem('mainPageState', JSON.stringify(this.state));
  }
  render() {
    const {
      errorMessage,
      foodList,
      currentFoodIndex,
      likes,
      dislikes,
      dislikesPercentage,
      likesPercentage
    } = this.state;

    if (foodList.length === 0 || errorMessage) {
      return <div>{errorMessage}</div>;
    }

    return (
      <div>
        <PhotoComponent onClickAction={this.handlePhotoAction.bind(this)} food={foodList[currentFoodIndex]} />
        <div className="bar-wrapper">
          <p className="sub-title text-white text-center">My recipes</p>
            <BarChartComponent
              src="assets/img/icn_sad.svg"
              value={dislikesPercentage}
              color="#1640D3"
              amount={dislikes.length}
            />
            <BarChartComponent
              src="assets/img/icn_happy.svg"
              value={likesPercentage}
              color="#FC4553"
              amount={likes.length}
            />
        </div>
      </div>
    );
  }
}
