import React, { useState, useEffect } from 'react';
import * as request from 'superagent';
import { Card } from '../../helpers/types';
import { Link, useLocation } from 'react-router-dom';

const rarityList = ['煌', '極', '稀', '珍', '並', '宝', '誉'];

const CardList: React.FC = () => {
  const location = useLocation<{ page: number; rarity: string }>();
  const [page, setPage] = useState(location.state ? location.state.page : 0);
  const [totalPage, setTotalPage] = useState(0);
  const [rarity, setRarity] = useState(location.state ? location.state.rarity : '');
  const [cards, setCards] = useState<Card[]>([]);

  const getCards = async () => {
    const endpoint = rarity === '' ? '?' : `/search/findCardsByRarity?rarity=${rarity}&`;
    const response = await request.get(`${ROOT_API}/api/rest/cards${endpoint}page=${page}&size=50&sort=number,asc`);
    setCards(response.body._embedded.cards);
    setTotalPage(response.body.page.totalPages);
  };

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rarity]);

  const pageElement = () => {
    const pages = [];
    for (let i = 0; i < totalPage; i++) {
      if (i === page) {
        pages.push(<span key={i}>{i}</span>);
      } else {
        pages.push(
          <span key={i} className="clickable" onClick={() => setPage(i)}>
            {i}
          </span>
        );
      }
    }
    return <div className="pages">{pages}</div>;
  };

  const handleRarityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRarity(event.target.value);
  };

  return (
    <div className="card-list">
      <select value={rarity} onChange={handleRarityChange}>
        <option value="">All</option>
        {rarityList.map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      {pageElement()}
      <div className="row">
        <span style={{ width: '40px' }}>No.</span>
        <span style={{ width: '30px' }}>img</span>
        <span style={{ width: '100px' }}>name</span>
        <span style={{ width: '40px' }}>rarity</span>
        <span style={{ width: '70px' }}>property</span>
        <span style={{ width: '40px' }}>cost</span>
        <span style={{ width: '70px' }}>military</span>
        <span style={{ width: '40px' }}>job</span>
      </div>
      {cards.map(card => (
        <div className="row" key={card.id}>
          <span style={{ width: '40px' }}>{card.number}</span>
          <span style={{ width: '30px' }}>
            <img src={card.faceUrl} alt="" />
          </span>
          <span style={{ width: '100px' }}>{card.realName}</span>
          <span style={{ width: '40px' }}>
            {card.rarity}
            {getStar(card.star)}
          </span>
          <span style={{ width: '70px' }}>{card.property}</span>
          <span style={{ width: '40px' }}>{card.cost}</span>
          <span style={{ width: '70px' }}>{card.military}</span>
          <span style={{ width: '40px' }}>{card.job}</span>
          <span>
            <Link to={{ pathname: `/cards/${card.id}`, state: { page, rarity } }}>Edit</Link>
          </span>
        </div>
      ))}
    </div>
  );
};

const getStar = (star: number) => {
  if (star === 1) {
    return '\u2606';
  } else if (star === 2) {
    return '\u2606\u2606';
  } else {
    return '';
  }
};

export default CardList;
