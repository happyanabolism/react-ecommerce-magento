import { graphql } from '@shared/api';

const ADD_TO_CART_FORM_FEAGMENT = graphql(`
  fragment AddToCartProduct on ProductInterface {
    sku
    min_sale_qty
    max_sale_qty
  }
`);
