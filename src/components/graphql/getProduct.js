import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
        query ProductQuery($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      items {
        id
        value
        displayValue
      }
      type
      name
      id
    }
    prices {
      amount
      currency {
        label
        symbol
      }
    }
    brand
  }
} `;
   