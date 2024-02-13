import axios from "axios";


const apiClient = axios.create({
  baseURL: 'https://backenddabirkhane.mohammadrasoulollah.com/api/v1/', 
});
 
export default apiClient;