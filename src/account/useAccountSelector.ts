import { useCallback, useState } from 'react';

const useAccountSelector = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const changeAccount = useCallback((login: string) => {
    setSelectedAccount(login);
  }, []);
  return { selectedAccount, changeAccount };
};

export default useAccountSelector;
