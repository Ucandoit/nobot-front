import React from 'react';

interface CardProps {
  name: string;
  imgUrl: string;
  tradable: boolean;
}

const Card: React.FC<CardProps> = ({ name, imgUrl, tradable }) => {
  return (
    <span className="card">
      <img src={imgUrl} alt="" />
      <span className="card-name">{name}</span>
    </span>
  );
};

export default Card;
