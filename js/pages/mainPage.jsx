import React from 'react';
import PhotoComponent from '../components/photoComponent';

export default class MainPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            foodList: [],
            currentFoodIndex: 0,
            errorMessage: undefined,
            likes: [],
            dislikes: []
        };
    }
    handlePhotoAction (action) {
        const { likes, dislikes, foodList, currentFoodIndex } = this.state;

        if (action === "like") {
            likes.push(foodList[currentFoodIndex]);
        } else {
            dislikes.push(foodList[currentFoodIndex]);
        }

        this.setState({ likes, dislikes, currentFoodIndex: currentFoodIndex + 1 });
    }
    componentDidMount () {
        fetch("http:localhost:1234/")
            .then((response) => response.json())
            .then((foodList) => this.setState({ foodList }))
            .catch((error) => this.setState({ errorMessage: error }));
    }
    render () {
        const { errorMessage, foodList, currentFoodIndex } = this.state;

        return (
            foodList.length === 0 ? <div>{errorMessage}</div> : <PhotoComponent onClickAction={this.handlePhotoAction.bind(this)} food={foodList[currentFoodIndex]} /> 
        );
    }
};