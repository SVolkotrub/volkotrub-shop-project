import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export default function getProductsByCategory(props) {
    const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
    });
  const GET_PRODUCT = gql`
        query Query {
  product(id: "${props.params.id}") {
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
   
    async function fetchData() {
        
      let result = await client.query({ query: GET_PRODUCT }).then((result) => {
        // console.log(result);
                return result;
            }).catch((error) => {
                console.log("Something went wrong in response");
            });
            
        return result.data.product; 
        
    }
    fetchData();

  
 const response = fetchData();
    return response;
}