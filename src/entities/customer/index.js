export {
  generateAuthToken,
  fetchCustomer,
  createCustomer,
} from './api/authApi';
export { CUSTOMER } from './api/customerApi';
export { useCustomer } from './model/useCustomer';
export { logout, clearError, customerReducer } from './model/authSlice';
export {
  selectAuthCustomer,
  selectJwt,
  selectAuthLoading,
  selectAuthError,
} from './model/selectors';
export { login, register } from './model/authThunk';
