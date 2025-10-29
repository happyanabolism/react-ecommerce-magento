import { StoreContext, useStoreConfig } from '@entities/store'

export const StoreProvider = ({ children }) => {
  const { storeConfig } = useStoreConfig();

  return (
    <StoreContext.Provider value={storeConfig}>
      { children }
    </StoreContext.Provider>
  )
}
