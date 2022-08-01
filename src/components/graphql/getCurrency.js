import { gql } from '@apollo/client'; 

export const GET_CURRENCY = gql`
             query Query {
                currencies {
                    label
                    symbol
                }
            }`;
