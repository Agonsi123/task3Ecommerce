import React from 'react';
import './homepage.scss';
import Hero from '../../components/hero/Hero';
import Category from '../../components/landingPageComponents/category/Category';
import BsProducts from '../../components/landingPageComponents/bsProducts/BsProducts';
import Sales from '../../components/landingPageComponents/sales/Sales';
import ExploreProducts from '../../components/landingPageComponents/exploreProducts/ExploreProducts';
import MusicExperience from '../../components/landingPageComponents/mExperience/MusicExperience';
import NewArrival from '../../components/landingPageComponents/newArrival/NewArrival';
import Services from '../../components/landingPageComponents/services/Services';
import upArrow from '../../assets/images/upArrow.svg';
import { useNavigate } from 'react-router-dom';





const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">

      <Hero />
      <Sales />
      <Category />
      <BsProducts />
      <MusicExperience />
      <ExploreProducts />
      <NewArrival />
      <Services />

      <div className="arrowUp" onClick={() => window.scrollTo({ top: 0, behavior: "smooth"})}>
        <img src={upArrow} alt="Go to top" />
      </div>
    </div>
  );
}

export default Homepage