import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
    query Query($title: String!) {
  category(input: { title: $title })  {
    name 
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      brand
    }
  }
}
 `;
