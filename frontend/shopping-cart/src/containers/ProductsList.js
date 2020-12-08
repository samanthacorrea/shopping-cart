import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import * as queries from '../graphql/queries'

function ProductsList() {

    const query = useQuery(queries.PRODUCTS)
    useEffect(() => 
        console.log(query)
    ,[query])


    return <h1>Products List</h1>
}


export default ProductsList;