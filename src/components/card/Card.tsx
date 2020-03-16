import React from 'react';
import { CardInfo } from '../../helpers/types';

interface CardProps {
  card: CardInfo;
  handleCardClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card: { id, name, imgUrl, tradable }, handleCardClick }) => {
  return (
    <span className={`card ${!tradable ? 'lock' : ''}`} onClick={() => handleCardClick(id)}>
      <img src={imgUrl} alt="" />
      <span className="card-name">{name}</span>
    </span>
  );
};

export default Card;
