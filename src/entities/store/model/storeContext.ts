import { createContext } from 'react';
import type { StoreConfig } from './types';

const defaultStoreConfig: StoreConfig = {
  root_category_uid: 'Mg==',
};

export const StoreContext = createContext<StoreConfig>(defaultStoreConfig);
