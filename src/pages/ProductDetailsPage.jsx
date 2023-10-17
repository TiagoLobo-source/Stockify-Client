import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import productsService from '../services/ProductsService'

/* 
1. Fetching the data for 1 project
2. display the data for the user */

function ProductDetailsPage() {
    const [product,setProduct] = useState(null)
    const {id} = useParams()
   
    const navigate = useNavigate()

    /*function deleteProduct(){
        productsService.deleteProduct(id)
        .then(()=>{
            navigate('/products')
        }).
        catch(err=>{
            console.log(err)
        })
    }*/

    useEffect(()=>{
        productsService.getProduct(id)
        .then((response)=>{
            
            setProduct(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[id])

  return (
    <div className='ProductDetails'>
        {/* Before we set the state to the 1 product */}
        {product === null && <h2>Loading</h2>}


        {/* After we set the state to the 1 product */}
        {product && (
            <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            </>
        )}

   
        <Link to={"/products"}>
            <button>Go back to Product</button>
        </Link>


        <Link to={`/editproduct/${id}/edit`}>
        <button>Edit Product</button>
        </Link>

     
    </div>
  )
}

export default ProductDetailsPage