import React from 'react';
import { render } from 'react-dom';

export default class PhotoComponent extends React.Component {
    generateCss () {
        
    }
    render () {
        console.log(this.props.food);
        const { img: url, name } = this.props.food;
        return (
            <div className="photo-component">
                <div>
                    <img src={url}/>
                    <h3>{name}</h3>
                </div>
                <div className="controls">
                    <span className="dislike"></span>
                    <span className="like"></span>
                </div>
            </div>
        )
    }
};