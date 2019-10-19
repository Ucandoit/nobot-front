import React from 'react';
import * as request from 'superagent';

const AuctionHistory: React.FC = props => {
  const [histories, setHistories] = React.useState([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/auctionHistories?sort=snipeTime,desc`).then(res => {
      setHistories(res.body._embedded.auctionHistories);
    });
  }, []);

  return (
    <div>
      <h1>Auction History</h1>
      {histories.map((history: any, index: number) => (
        <div key={index}>
          <span style={{ marginRight: '10px' }}>{history.rarity}</span>
          <span style={{ marginRight: '10px' }}>{history.name}</span>
          <span style={{ marginRight: '10px' }}>{history.price}</span>
          <span>{history.snipeTime}</span>
        </div>
      ))}
    </div>
  );
};

export default AuctionHistory;
