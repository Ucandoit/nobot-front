import classNames from 'classnames';
import React from 'react';
import { CardInfo } from '../../helpers/types';

interface CardProps {
  card: CardInfo;
  handleCardClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  card: { id, name, imgUrl, tradable, inAction, trading, protect },
  handleCardClick
}) => (
  <span className={classNames('card', { tradable, inAction, trading, protect })} onClick={() => handleCardClick(id)}>
    <img src={imgUrl} alt="" />
    <span className="card-name">{name}</span>
    <div className="card-status">
      <span className={classNames({ untradable: !tradable })} />
      <span className={classNames({ inAction })} />
      <span className={classNames({ trading })} />
      <span className={classNames({ protect })} />
    </div>
  </span>
);

export default Card;
