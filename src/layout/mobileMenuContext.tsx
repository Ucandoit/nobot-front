import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';

interface MobileMenuContext {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const mobileMenuContext = createContext<MobileMenuContext>({
  mobileMenuOpen: false,
  toggleMobileMenu: () => {}
});

export const MobileMenuContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);
  return (
    <mobileMenuContext.Provider value={{ mobileMenuOpen, toggleMobileMenu }}>{children}</mobileMenuContext.Provider>
  );
};

export default mobileMenuContext;
