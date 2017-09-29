import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default class PhotoComponent extends React.Component {
  handleAction(action) {
    return () => this.props.onClickAction(action);
  }

  render() {
    const { img: url, name, id } = this.props.food;
    return (
      <div className="photo-component">
        <div className="food">
          <div className="title text-center">
            <span>{name}</span>
          </div>
          <Link to={{ pathname: `detail/${id}` }}>
            <img className="image" src={url}/>
          </Link>
          <div className="controls">
            <img className="button dislike" onClick={this.handleAction('dislike')} src="assets/img/icn_delete.svg" />
            <img className="button like" onClick={this.handleAction('like')} src="assets/img/icn_like.svg" />
          </div>
        </div>
      </div>
    );
  }
}

