import axios from 'axios';
 
class ProductsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });
 
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
 
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  }
 
  // POST /api/products
  createProduct = requestBody => {
    return this.api.post('/api/products', requestBody);
  };
 
  // GET /api/products
  getAllProducts = () => {
    return this.api.get('/api/products');
  };
 
  // GET /api/products/:id
  getProduct(id){
    return this.api.get(`/api/products/${id}`);
  };
 
  // PUT /api/products/:id
  updateProduct = (id, requestBody) => {
    return this.api.put(`/api/products/${id}`, requestBody);
  };

    // PUT /api/products/:id
    approveProduct = (id, isApproved, isPassed) => {
      return this.api.put(`/api/productsapproval/${id}`, isApproved, isPassed);
    };

    // PUT /api/products/:id
    refuseProduct = (id, isApproved, isPassed, reasonForRefusal) => {
      return this.api.put(`/api/productsrefusal/${id}`, isApproved, isPassed, reasonForRefusal);
    };
 
  // DELETE /api/products/:id
  deleteProduct = id => {
    return this.api.delete(`/api/products/${id}`);
  };
}
 
// Create one instance object
const productsService = new ProductsService();
 
export default productsService;