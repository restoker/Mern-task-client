import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEN_URL
});

export default clienteAxios;
