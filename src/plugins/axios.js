// axiosInstance.js
import axios from 'axios';
//import router from '@/router' // Import your router
import { useAuthStore } from "@/stores/auth"
const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT_URL || 'https://data-insider-dev.market-interface.asia',
  
})

axiosIns.interceptors.request.use(
  config => {
    config.headers.applicationKey = import.meta.env.VITE_APPLICATION_KEY || '';
    config.headers.Authorization =  `${JSON.parse(localStorage.getItem('token')) || ''}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
