import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

interface BattleProps {
  login: string;
}

const Battle: React.FC<BattleProps> = ({ login }) => {
  const [friendships, setFriendships] = useState<{ [key: string]: string }[]>([]);
  const [inBattle, setInBattle] = useState<boolean>(false);

  const getFriendships = async () => {
    const res = await superagent.get(`${ROOT_API}/api/rest/battle/friendships/${login}`);
    setFriendships(Object.keys(res.body).map(key => ({ country: key, level: res.body[key] })));
  };

  const getStatus = async () => {
    const res = await superagent.get(`${ROOT_API}/api/rest/battle/status/${login}`);
    setInBattle(res.body);
  };

  useEffect(() => {
    getFriendships();
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const battleOnce = async () => {
    await superagent.get(`${ROOT_API}/api/rest/battle/start/${login}?times=6`);
    setInBattle(true);
  };

  const startBattle = async () => {
    await superagent.get(`${ROOT_API}/api/rest/battle/start/${login}`);
    setInBattle(true);
  };

  const stopBattle = async () => {
    await superagent.get(`${ROOT_API}/api/rest/battle/stop/${login}`);
    setInBattle(false);
  };

  return (
    <>
      <div className="friendships">
        {friendships.map(friendship => (
          <div key={friendship.country}>
            {friendship.country} - {friendship.level}
          </div>
        ))}
      </div>
      <button disabled={inBattle} onClick={() => battleOnce()}>
        Once
      </button>
      <button disabled={inBattle} onClick={() => startBattle()}>
        Start
      </button>
      <button disabled={!inBattle} onClick={() => stopBattle()}>
        Stop
      </button>
    </>
  );
};

export default Battle;
