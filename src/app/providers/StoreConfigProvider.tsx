import type { ReactNode } from 'react';
import {
  StoreContext,
  useStoreConfig,
  type StoreConfig,
} from '@entities/store';

export const StoreConfigProvider = ({ children }: { children: ReactNode }) => {
  const { storeConfig } = useStoreConfig();

  return (
    <StoreContext.Provider value={storeConfig as StoreConfig}>
      {children}
    </StoreContext.Provider>
  );
};
