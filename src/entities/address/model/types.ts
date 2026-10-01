export interface Address {
  id: number | null;
  firstname: string | null;
  lastname: string | null;
  company: string | null;
  street: string[];
  postcode: string | null;
  city: string | null;
  region: string | null;
  countryCode: string | null;
  telephone: string | null;
}

export interface CustomerAddress extends Address {
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
}
