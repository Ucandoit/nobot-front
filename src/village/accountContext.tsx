import React, { createContext, PropsWithChildren, useState } from 'react';

interface AccountContext {
  account: string;
  setAccount: (account: string) => void;
}

const accountContext = createContext<AccountContext>({
  account: '',
  setAccount: () => {}
});

export const AccountContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [account, setAccount] = useState('');
  return <accountContext.Provider value={{ account, setAccount }}>{children}</accountContext.Provider>;
};

export default accountContext;
