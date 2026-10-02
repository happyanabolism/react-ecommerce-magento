export const selectJwt = (state: RootState) => state.customer.jwt;
export const selectAuthLoading = (state: RootState) => state.customer.loading;
export const selectAuthError = (state: RootState) => state.customer.error;
