import type {
  AttributeValueInput,
  AttributeValueInterface,
  FlatAttributes,
} from '@shared/types';

export interface Customer {
  email: string;
  firstname?: string;
  lastname?: string;
  gender?: number;
  custom_attributes?: AttributeValueInterface[];
}

export interface FlatCustomer extends Omit<Customer, 'custom_attributes'> {
  custom_attributes?: FlatAttributes;
}

export interface CustomerQuery {
  customer: Customer;
}

export interface CustomerCreateQuery {
  createCustomerV2: CustomerQuery;
}

export interface CustomerCreateInput {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  custom_attributes?: AttributeValueInput[];
}

export interface CustomerCreateVars {
  input: CustomerCreateInput;
}

export interface RegistrationFormData
  extends Omit<CustomerCreateInput, 'custom_attributes'> {
  passwordConfirm: string;
  custom_attributes: {
    phone_number: string;
  };
}

export interface AuthState {
  customer: AuthCusomerData | null;
  jwt: string | null;
  loading: boolean;
  error: string | null;
}

export type AuthCusomerData = Pick<
  Customer,
  'email' | 'firstname' | 'lastname'
>;
