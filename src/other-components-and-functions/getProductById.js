import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_PRODUCT } from '../components/graphql/getProduct';

export default function getProductsByCategory(props) {
    const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
    });  
    
    async function fetchData() {
       
      let result = await client.query({ query: GET_PRODUCT, variables: {  productId: props.id} }).then((result) => {
          console.log(result)      
          return result;
            }).catch((error) => {
                console.log("Something went wrong in response");
            });
            
        return result.data.product; 
        
    }
 const response = fetchData();
    return response;
}