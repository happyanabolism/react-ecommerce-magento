import type { CustomerAddressFieldsFragment } from '@shared/api/gql/graphql';
import type { CustomerAddress } from '../model/types';

export const fromCustomerAddress = (
  customerAddress: CustomerAddressFieldsFragment
): CustomerAddress => {
  return {
    id: customerAddress.id,
    firstname: customerAddress.firstname,
    lastname: customerAddress.lastname,
    company: customerAddress.company,
    postcode: customerAddress.postcode,
    city: customerAddress.city,
    telephone: customerAddress.telephone,
    street: customerAddress.street
      ? customerAddress.street.filter((street) => street !== null)
      : [],
    countryCode: customerAddress.country_code,
    region: customerAddress.region?.region ?? null,
    isDefaultShippingAddress: customerAddress.default_shipping ?? false,
    isDefaultBillingAddress: customerAddress.default_billing ?? false,
  };
};
