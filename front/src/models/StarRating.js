import React from "react";

const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key = {i} className="fas fa-heart text-warning"></i>);
    }
    // else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
    //     stars.push(<i key = {i} className="fa-solid fa-heart-half-stroke text-warning"></i>)
    // } 
    else {
      stars.push(<i key = {i} className="fa-regular fa-heart text-warning"></i>);
    }
  }

  return (<>{stars}</>);
};

export default StarRating;
