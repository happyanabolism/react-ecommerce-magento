export {
  generateAuthToken,
  fetchCustomer,
  createCustomer,
} from './api/authApi';
export {
  CUSTOMER,
  UPDATE_PERSONAL_INFO,
  UPDATE_CUSTOMER_EMAIL,
  CHANGE_CUSTOMER_PASSWORD,
} from './api/customerApi';
export { useCustomer } from './model/useCustomer';
export { logout, clearError, customerReducer } from './model/authSlice';
export {
  selectAuthCustomer,
  selectJwt,
  selectAuthLoading,
  selectAuthError,
} from './model/selectors';
export type { Customer } from './model/types';
export { login, register } from './model/authThunk';
