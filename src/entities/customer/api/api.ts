import { graphql } from '@shared/api';

const CUSTOMER_FIELDS = graphql(`
  fragment Customer on Customer {
    email
    firstname
    lastname
    gender
    custom_attributes {
      ...CustomAttributeFields
    }
  }
`);

export const CUSTOMER = graphql(`
  query customer {
    customer {
      ...Customer
    }
  }
`);
