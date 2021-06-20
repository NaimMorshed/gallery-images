import React, { useContext } from 'react';
import { UserContext } from '../../App';

const FullView = ({props}) => {
    // eslint-disable-next-line no-unused-vars
    const [contextData, setContextData] = useContext(UserContext);
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <img src={contextData} alt="img" />
        </div>
    );
};

export default FullView;