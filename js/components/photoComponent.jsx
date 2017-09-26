import React from 'react';
import { render } from 'react-dom';

export default class PhotoComponent extends React.Component {
    handleAction (action) {
        return () => this.props.onClickAction(action);
    }

    render () {
        const { img: url, name } = this.props.food;
        return (
            <div className="photo-component">
                <div className="food">
                    <div className="title">{name}</div>
                    <img className="image" src={url}/>
                    <div className="controls">
                        <img className="button dislike" onClick={this.handleAction("dislike")} src="assets/img/icn_delete.svg" />
                        <img className="button like" onClick={this.handleAction("like")} src="assets/img/icn_like.svg" />
                    </div>
                </div>
            </div>
        )
    }
};