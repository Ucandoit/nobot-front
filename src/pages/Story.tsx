import React, { useCallback, useEffect, useState } from 'react';

const Story = () => {
  const [login, setLogin] = useState<string>('xzdykerik_04');
  const [ticket, setTicket] = useState<string>('0');
  const [status, setStatus] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('medium');
  const [seconds, setSeconds] = useState<string>('150');

  const checkStatus = useCallback(async () => {
    const response = await fetch(`${ROOT_API}/api/story/status/${login}`);
    setStatus(((await response.json()) as any).status);
  }, [login]);

  const toggleStart = async () => {
    await fetch(
      `${ROOT_API}/api/story/${status ? 'stop' : 'start'}/${login}?ticket=${ticket}&mode=${mode}&seconds=${seconds}`
    );
    await checkStatus();
  };

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <input value={login} onChange={e => setLogin(e.target.value)} />
        <input value={ticket} onChange={e => setTicket(e.target.value)} />
        <input value={mode} onChange={e => setMode(e.target.value)} />
        <input value={seconds} onChange={e => setSeconds(e.target.value)} />
      </div>
      <div>
        <span style={{ marginRight: '10px' }}>Status: {status ? 'On' : 'Off'}</span>
        <button onClick={() => checkStatus()}>Check</button>
      </div>
      <button onClick={() => toggleStart()}>{status ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Story;
