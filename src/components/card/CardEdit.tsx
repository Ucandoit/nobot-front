import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Card } from '../../helpers/types';
import * as request from 'superagent';

const CardEdit: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [card, setCard] = useState<Card>();

  const getCard = useCallback(async () => {
    const response = await request.get(`${ROOT_API}/api/rest/cards/${id}`);
    setCard(response.body);
  }, [id]);

  useEffect(() => {
    getCard();
  }, [getCard]);

  const changeCardProp = useCallback((prop: keyof Card, value: number | string | boolean) => {
    setCard(prevCard => {
      return {
        ...prevCard,
        [prop]: value
      } as Card;
    });
  }, []);

  const updateCard = async () => {
    await request
      .put(`${ROOT_API}/api/rest/cards/${id}`)
      .set('Content-Type', 'application/json')
      .send(card);
    history.push('/cards', location.state);
  };

  return (
    <>
      {card ? (
        <div className="card-edit">
          <div>
            <label>Number: </label>
            <input value={card.number} onChange={e => changeCardProp('number', e.target.value)} />
          </div>
          <div>
            <label>Name: </label>
            <input value={card.name} onChange={e => changeCardProp('name', e.target.value)} />
          </div>
          <div>
            <label>Real name: </label>
            <input value={card.realName} onChange={e => changeCardProp('realName', e.target.value)} />
          </div>
          <div>
            <label>Rarity: </label>
            <input value={card.rarity} onChange={e => changeCardProp('rarity', e.target.value)} />
          </div>
          <div>
            <label>Star: </label>
            <input value={card.star} onChange={e => changeCardProp('star', e.target.value)} />
          </div>
          <div>
            <label>Property: </label>
            <input value={card.property} onChange={e => changeCardProp('property', e.target.value)} />
          </div>
          <div>
            <label>Cost: </label>
            <input value={card.cost} onChange={e => changeCardProp('cost', e.target.value)} />
          </div>
          <div>
            <label>Military: </label>
            <input value={card.military} onChange={e => changeCardProp('military', e.target.value)} />
          </div>
          <div>
            <label>Job: </label>
            <input value={card.job} onChange={e => changeCardProp('job', e.target.value)} />
          </div>
          <div className="long">
            <label>Face url: </label>
            <input value={card.faceUrl} onChange={e => changeCardProp('faceUrl', e.target.value)} />
          </div>
          <div className="long">
            <label>Illust url: </label>
            <input value={card.illustUrl} onChange={e => changeCardProp('illustUrl', e.target.value)} />
          </div>
          <div className="abilities">
            <label>Initial abilities: </label>
            <input value={card.initialAtk} onChange={e => changeCardProp('initialAtk', e.target.value)} />
            <input value={card.initialDef} onChange={e => changeCardProp('initialDef', e.target.value)} />
            <input value={card.initialSpd} onChange={e => changeCardProp('initialSpd', e.target.value)} />
            <input value={card.initialVir} onChange={e => changeCardProp('initialVir', e.target.value)} />
            <input value={card.initialStg} onChange={e => changeCardProp('initialStg', e.target.value)} />
          </div>
          <div className="abilities">
            <label>Final abilities: </label>
            <input value={card.finalAtk} onChange={e => changeCardProp('finalAtk', e.target.value)} />
            <input value={card.finalDef} onChange={e => changeCardProp('finalDef', e.target.value)} />
            <input value={card.finalSpd} onChange={e => changeCardProp('finalSpd', e.target.value)} />
            <input value={card.finalVir} onChange={e => changeCardProp('finalVir', e.target.value)} />
            <input value={card.finalStg} onChange={e => changeCardProp('finalStg', e.target.value)} />
          </div>
          <div className="long">
            <label>Personality: </label>
            <input value={card.personality} onChange={e => changeCardProp('personality', e.target.value)} />
          </div>
          <div>
            <label>Slogan: </label>
            <input value={card.slogan} onChange={e => changeCardProp('slogan', e.target.value)} />
          </div>
          <div className="long">
            <label>History: </label>
            <textarea value={card.history} onChange={e => changeCardProp('history', e.target.value)} rows={4} />
          </div>
          <div className="long">
            <label>Train skills: </label>
            <input value={card.trainSkills} onChange={e => changeCardProp('trainSkills', e.target.value)} />
          </div>
          <button onClick={updateCard}>Update</button>
        </div>
      ) : null}
    </>
  );
};

export default CardEdit;
