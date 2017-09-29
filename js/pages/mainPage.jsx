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
        let { currentFoodIndex } = this.state;
        const { likes, dislikes, foodList } = this.state;

        if (action === "like") {
            likes.push(foodList[currentFoodIndex]);
        } else {
            dislikes.push(foodList[currentFoodIndex]);
        }

        currentFoodIndex += 1; 

        if (currentFoodIndex === foodList.length - 1) {
            this.getFoodList()
                .then((newFoodList) => {
                    this.setState({ foodList: foodList.concat(newFoodList), currentFoodIndex });
                });
        }

        this.setState({ likes, dislikes, currentFoodIndex });
    }
    getFoodList () {
        return fetch("/food")
            .then((response) => response.json());
    }
    componentDidMount () {
        this.getFoodList()
            .then((foodList) => this.setState({ foodList }))
            .catch((error) => this.setState({ errorMessage: error }));
    }
    render () {
        const { errorMessage, foodList, currentFoodIndex, likes, dislikes } = this.state;
        
        if (foodList.length === 0 || errorMessage) {
            return <div>{errorMessage}</div>;
        }  

        return (
            <div className="main-page">
                <div>likes {likes.length}</div>
                <div>dislikes {dislikes.length}</div>
                <PhotoComponent onClickAction={this.handlePhotoAction.bind(this)} food={foodList[currentFoodIndex]} /> 
            </div>
        );
    }
};