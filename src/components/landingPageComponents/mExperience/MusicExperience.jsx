import React from 'react';
import './musicExperience.scss';
import sellTimer from "../../../assets/images/sellTimer.svg";
import heroImage2 from "../../../assets/images/heroImage2.svg";

const MusicExperience = () => {
  return (
    <div className="mExpContainer">
        <div className="mExpLeft">
            <p>Categories</p>
            <h6>Enhance Your <br /> Music Experience</h6>
            <div className='mSellTimer'>
                <img src={sellTimer} alt="image" />
            </div>
            <button>Buy Now!</button>
        </div>
        <div className="mExpRight">
            <img src={heroImage2} alt="image" />
        </div>
    </div>
  );
}

export default MusicExperience