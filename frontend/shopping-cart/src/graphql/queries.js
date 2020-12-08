import { gql } from 'apollo-boost'

const PRODUCTS = gql`
    query Products {
        products {
            id
        }
    }

`

export {
    PRODUCTS,
}