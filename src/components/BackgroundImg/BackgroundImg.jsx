import React from 'react';

export default function BackgroundImg(props) {
  return (
    <div className="background-img__overlay">
      <img src={props.src} alt="Background image" className="background-img" />
    </div>
  );
}
