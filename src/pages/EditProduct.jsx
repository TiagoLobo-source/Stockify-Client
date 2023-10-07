import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsService from '../services/ProductsService'

//2 steps

//1. get the initial data to be updated by the user
//2. when the user submits we send a put request to change the data



//1. create states for each input fiels
//2. in our useEffect get the project that has the id in our params
//3. set each state to the data we got from the axios call
//4. in our handleSubmit send a put request with the states in the body

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