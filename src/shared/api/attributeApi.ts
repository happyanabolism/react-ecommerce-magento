import { graphql } from '@shared/api/gql';

export const CUSTOM_ATTRIBUTE_FIELDS = graphql(`
  fragment CustomAttributeFields on AttributeValueInterface {
    code
    ... on AttributeValue {
      value
    }
    ... on AttributeSelectedOptions {
      selected_options {
        label
        value
      }
    }
  }
`);
