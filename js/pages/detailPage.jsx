import React from 'react';
import { Link } from 'react-router-dom';
import PhotoComponent from '../components/photoComponent';

export default class MainPage extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            food: null
        };
    }
    getFoodItem () {
        const { id } = this.props.match.params;
        return fetch(`/food/${id}`)
            .then((response) => response.json());
    }
    componentDidMount () {
        this.getFoodItem()
            .then((food) => this.setState({ food }))
            .catch((error) => this.setState({ errorMessage: error }));
    }
    render () {
        if (!this.state.food) {
            return <div>Loading...</div>
        }

        const { name, category, area, instructions, img: url, source, ingredients} = this.state.food;

        return (
            <section className="food-detail">
                <nav>
                    <Link to={{ pathname: "/" }} className="back nav-item"> Back </Link>
                </nav>
                <heading className="title text-center">
                    <span>{name}</span>
                </heading>
                <img className="recipe-img" src={url} />
                <article>
                    <p>{instructions}</p>
                </article>
                <article>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((i) => <li>{i.measure} {i.ingredient}</li>)}
                    </ul>
                </article>
            </section>
        );
    }
};