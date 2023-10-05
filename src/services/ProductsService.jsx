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
  getProject(id){
    return this.api.get(`/api/products/${id}`);
  };
 
  // PUT /api/products/:id
  updateProject = (id, requestBody) => {
    return this.api.put(`/api/products/${id}`, requestBody);
  };
 
  // DELETE /api/products/:id
  deleteProject = id => {
    return this.api.delete(`/api/products/${id}`);
  };
}
 
// Create one instance object
const productsService = new ProductsService();
 
export default productsService;