import {  ApolloClient, InMemoryCache } from '@apollo/client';
import {GET_CATEGORY} from "../components/graphql/getByCategory";

export default function getProductsByCategory(props) {
    const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
        });

  async function fetchData() {
    try {
     
        let resultByCategory = await client.query({ query: GET_CATEGORY, variables: { title: props }  }).then((resultByCategory) => {
          console.log("getProductsByCategory", resultByCategory.data.category.products);
              return resultByCategory;
          }).catch((error) => {
              console.log("Something went wrong in response");
          });          
        return resultByCategory.data.category.products; 
      } catch {}
  }  
 const response = fetchData();
 return response;
}