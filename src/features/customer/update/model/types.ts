import type {
  CustomerQuery,
  FlatCustomerAttributes,
} from '@entities/customer/model/types';
import type { AttributeValueInput } from '@shared/types';

export interface CustomerUpdateInput {
  firstname?: string;
  lastname?: string;
  custom_attributes?: AttributeValueInput[];
}

export interface CustomerUpdateEmailInput {
  email: string;
  password: string;
}

export interface CustomerUpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface CustomerUpdateQuery {
  updateCustomerV2: CustomerQuery;
}

export interface CustomerUpdateQueryVars {
  input: CustomerUpdateInput;
}

export interface CustomerUpdateFormData
  extends Omit<CustomerUpdateInput, 'custom_attributes'> {
  custom_attributes: FlatCustomerAttributes;
}

export interface CustomerUpdateEmailQuery {
  updateCustomerEmail: CustomerQuery;
}

export interface CustomerUpdatePasswordQuery {
  changeCustomerPassword: CustomerQuery;
}

export interface CustomerUpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
