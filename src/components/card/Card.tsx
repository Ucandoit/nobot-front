import classNames from 'classnames';
import React from 'react';
import { CardInfo } from '../../helpers/types';

interface CardProps {
  card: CardInfo;
  handleCardClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  card: { id, name, faceUrl, untradable, inAction, trading, protect },
  handleCardClick
}) => (
  <span className={classNames('card', { untradable, inAction, trading, protect })} onClick={() => handleCardClick(id)}>
    <img src={faceUrl} alt="" />
    {trading ? (
      <img src={process.env.PUBLIC_URL + '/trading.png'} className="trading" alt="" />
    ) : inAction ? (
      <img src={process.env.PUBLIC_URL + '/action.png'} className="action" alt="" />
    ) : null}
    {untradable ? <img src={process.env.PUBLIC_URL + '/untradable.png'} className="untradable" alt="" /> : null}
    {protect ? <img src={process.env.PUBLIC_URL + '/protect.png'} className="protected" alt="" /> : null}
    <span className="card-name">{name}</span>
    <div className="card-status">
      <span className={classNames({ untradable })} />
      <span className={classNames({ inAction })} />
      <span className={classNames({ trading })} />
      <span className={classNames({ protect })} />
    </div>
  </span>
);

export default Card;
