import { graphql } from '@shared/api/gql';

export const CUSTOMER_FIELDS = graphql(`
  fragment CustomerFields on Customer {
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
      ...CustomerFields
    }
  }
`);
