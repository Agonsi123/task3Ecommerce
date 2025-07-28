import React from 'react';
import './notFound.scss';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='notfoundContainer'>
        <p className="roadMap">Home / 404 Error</p>
        <div className='notfoundCont'>
            <div className="notfoundContent">
                <h1>404 Not Found</h1>
                <p>Your visited page not found. You may go to home page.</p>
            </div>
            <Button onClick={() => navigate('/')}>
                Back to home page
            </Button>
        </div>
    </div>
  )
}

export default NotFound