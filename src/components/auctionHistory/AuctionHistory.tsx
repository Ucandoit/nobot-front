import React from 'react';
import * as request from 'superagent';

const AuctionHistory: React.FC = props => {
  const [histories, setHistories] = React.useState([]);
  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/auctionHistories?sort=snipeTime,desc&projection=withAccount`).then(res => {
      setHistories(res.body._embedded.auctionHistories);
    });
  }, []);

  return (
    <div>
      <h1>Auction History</h1>
      {histories.map((history: any) => (
        <div key={history.id}>
          <span style={{ marginRight: '10px' }}>{history.rarity}</span>
          <span style={{ marginRight: '10px' }}>{history.name}</span>
          <span style={{ marginRight: '10px' }}>{history.price}</span>
          <span style={{ marginRight: '10px' }}>{history.snipeTime}</span>
          <span>{history.login}</span>
        </div>
      ))}
    </div>
  );
};

export default AuctionHistory;
