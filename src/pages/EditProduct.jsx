import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsService from '../services/ProductsService'
import "../pages/EditProduct.css";
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";



function EditProduct() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [isPassed, setPassed] = useState('')
    const [isApproved, setApproved] = useState('')
    const [imageProduct, setImageProduct] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
         axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
             console.log("response is: ", response.data.fileUrl);
            // response carries "fileUrl" which we can use to update the state
            setImageProduct(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };


    function deleteProduct() {
        axios.delete(`http://localhost:5005/api/products/${id}`)
            .then(response => {
                navigate('/products')
            })
            .catch((err) => {

                console.log(err)
            })
    }

    useEffect(() => {
        productsService.getProduct(id)
            .then(response => {

                setTitle(response.data.title)
                setDescription(response.data.description)
                setPassed(response.data.isPassed)
                setApproved(response.data.isApproved)
                setStock(response.data.stock)
                setPrice(response.data.price)
                setImageProduct(response.data.imageProduct)
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        productsService.updateProduct(id, { title, description, isPassed, isApproved, stock, price, imageProduct })
            // axios.put(`http://localhost:5005/api/products/${id}`,{title,description})
            .then(() => {
                console.log('Product updated successfully'); 
                setSuccessMessage('Product updated successfully.');
                setTimeout(() => {
                  navigate('/products');
                }, 5000);
              })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </label>

                <label>
                    Description
                    <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </label>

                <label>
                    Stock
                    <input type="number" value={stock} onChange={(e) => { setStock(e.target.value) }} />
                </label>

                <label>
                    Price
                    <input type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                </label>

                <label>
                    Image Product
                    <input type="file"onChange={(e)=>{handleFileUpload(e)}}/>
                </label>
                <div>
     
    
    </div>
    {successMessage && <div className="success-message">{successMessage}</div>}
                <button>Submit</button>
                <button onClick={deleteProduct}>Delete</button>
            </form>
        </div>
    )
}

export default EditProduct