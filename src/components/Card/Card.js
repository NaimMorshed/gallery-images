import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Card.css';

const Card = ({props}) => {
    // eslint-disable-next-line no-unused-vars
    const [contextData, setContextData] = useContext(UserContext);
    const history = useHistory();

    const clickHandle = () => {
        setContextData(props);
        history.push('/fullView');
    }

    return (
        <img onClick={() => clickHandle()} className="image" src={props} alt="img" />
    );
};

export default Card;