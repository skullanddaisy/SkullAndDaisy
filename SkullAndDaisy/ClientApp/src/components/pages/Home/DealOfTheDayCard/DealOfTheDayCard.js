/* eslint-disable no-tabs */
import React from 'react';
import { Link } from 'react-router-dom';
import poisonPic from '../../../../img/knockemdead.png';
import potionPic from '../../../../img/healingTouch.png';
import herbPic from '../../../../img/naturalRemedy.png';
import crystalPic from '../../../../img/allThatGlitters.png';
import './DealOfTheDayCard.scss';

const picArray = [poisonPic, potionPic, herbPic, crystalPic];
let routeToPage = '';

const dealOfTheDay = (productPics) => {
  const productSelector = Math.floor(Math.random() * productPics.length);
  if (productPics[productSelector] === poisonPic) {
    routeToPage = '/productdetails/9';
  }
  if (productPics[productSelector] === potionPic) {
    routeToPage = '/productdetails/30';
  }
  if (productPics[productSelector] === herbPic) {
    routeToPage = '/productdetails/14';
  }
  if (productPics[productSelector] === crystalPic) {
    routeToPage = '/productdetails/17';
  }
  return <Link to={routeToPage}>
            <img className="dealImagePic" src={productPics[productSelector]} alt="deal of the day"></img>
          </Link>;
};

export default class DealOfTheDayCard extends React.Component {
  render() {
    return (
      <div className='deal-of-the-day-card'>
        <h2>Deal Of The Day</h2>
        {dealOfTheDay(picArray)}
      </div>
    );
  }
}
