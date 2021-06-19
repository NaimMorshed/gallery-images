import React from 'react';
import './Card.css';

const Card = ({key}) => {
    return (
        <img style={{
            width: '120px',
            height: '100px',
        }} src={key} alt="img" />
    );
};

export default Card;