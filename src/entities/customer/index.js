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
export { useCustomerUpdate } from './model/useCustomerUpdate';
export { useCustomerEmailUpdate } from './model/useCustomerEmailUpdate';
export { useCustomerPasswordUpdate } from './model/useCustomerPasswordUpdate';
export { logout, clearError, customerReducer } from './model/authSlice';
export {
  selectAuthCustomer,
  selectJwt,
  selectAuthLoading,
  selectAuthError,
} from './model/selectors';
export { login, register } from './model/authThunk';
export { normalizeCustomer } from './model/normalizeCustomer';
