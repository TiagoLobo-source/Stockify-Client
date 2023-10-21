import axios from 'axios';
 
class DetailsService {
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
 
  // POST /api/details
  createDetails = requestBody => {
    return this.api.put('/api/details', requestBody);
  };
 
  // GET /api/details
  getAllDetails = () => {
    return this.api.get('/api/details');
  };
 
  }
 
// Create one instance object
const detailsService = new DetailsService();
 
export default detailsService;