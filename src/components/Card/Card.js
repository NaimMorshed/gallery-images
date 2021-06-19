import React from 'react';
import './Card.css';

const Card = ({props}) => {
    return (
        <img className="image" src={props} alt="img" />
    );
};

export default Card;