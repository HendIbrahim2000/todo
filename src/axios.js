import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-13e9f-default-rtdb.firebaseio.com/'
});

export default instance;