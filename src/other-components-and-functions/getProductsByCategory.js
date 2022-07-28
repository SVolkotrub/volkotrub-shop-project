import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export default function getProductsByCategory(props) {
    const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
        });
        const GET_CATEGORY = gql`
        query Query {
  category(input: { title: "${props}" }) {
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
  
} `;
   
  async function fetchData() {
      try{
        let result = await client.query({ query: GET_CATEGORY }).then((result) => {
          console.log(result.data.category.products);
              return result;
          }).catch((error) => {
              console.log("Something went wrong in response");
          });          
        return result.data.category.products; 
      } catch {}
  }  
 const response = fetchData();
 return response;
}