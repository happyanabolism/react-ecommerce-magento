import { graphql } from '@shared/api/gql';

export const CUSTOMER_ADDRESSES = graphql(`
  query customerAddresses {
    customer {
      addresses {
        ...CustomerAddressFields
      }
    }
  }
`);

export const CUSTOMER_ADDRESS = graphql(`
  fragment CustomerAddressFields on CustomerAddress {
    id
    firstname
    lastname
    company
    street
    postcode
    city
    region {
      region
    }
    country_code
    telephone
    default_billing
    default_shipping
  }
`);
