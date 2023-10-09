import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsService from '../services/ProductsService'


function EditProduct() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    
    function deleteProduct(){
        axios.delete(`http://localhost:5005/api/products/${id}`)
        .then(response=>{
            navigate('/products')
        })
        .catch((err)=>{
            
            console.log(err)
        })
    }

    useEffect(()=>{
        productsService.getProduct(id)
        .then(response=>{
            console.log(response.data)
            setTitle(response.data.title)
            setDescription(response.data.description)

        })
    },[])

    function handleSubmit(e){
        e.preventDefault()
        productsService.updateProduct(id,{title,description})
       // axios.put(`http://localhost:5005/api/products/${id}`,{title,description})
        .then((updatedProduct)=>{
            navigate(`/products/${id}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
                    Title
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </label>

                <label>
                    Description
                    <input type="text" value={description}  onChange={(e)=>{setDescription(e.target.value)}}/>
                </label>

                <button>Submit</button>
                <button onClick={deleteProduct}>Delete</button>
        </form>
    </div>
  )
}

export default EditProduct