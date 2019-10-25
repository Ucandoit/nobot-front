import React from 'react';
import { useParams } from 'react-router';
import * as request from 'superagent';

const Account: React.FC = props => {
  const { login } = useParams();

  const [warField, setWarField] = React.useState('賤ヶ岳');
  const [location, setLocation] = React.useState('');

  React.useEffect(() => {
    request.get(`${ROOT_API}/api/rest/account/location/${login}`).then((res: any) => {
      setLocation(res.body.location);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWarFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWarField(event.target.value);
  };

  const goToWarField = () => {
    request
      .post(`${ROOT_API}/api/rest/war/field`)
      .send(`login=${login}&warField=${warField}`)
      .then(res => {});
  };

  // Go to war
  // Join war
  // Npc or pc
  // status
  return (
    <div>
      <div>
        {login} : {location}
      </div>
      <select value={warField} onChange={handleWarFieldChange}>
        <option value="賤ヶ岳">賤ヶ岳</option>
        <option value="今山">今山</option>
      </select>
      <button onClick={goToWarField}>Go</button>
    </div>
  );
};

export default Account;
