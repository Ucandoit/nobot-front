import { useCallback, useState } from 'react';
import { AccountSelectorProps } from './AccountSelector';

const useAccountSelector = (): AccountSelectorProps => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const changeAccount = useCallback((login: string) => {
    setSelectedAccount(login);
  }, []);
  return { selectedAccount, changeAccount };
};

export default useAccountSelector;
