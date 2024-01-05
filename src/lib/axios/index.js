
import axios from 'axios'
import MyRequest from './base'
const BASE_URL = '/api'
// const BASE_URL = 'http://192.168.3.108:3000'

const myReq = new MyRequest({
    baseURL: BASE_URL,
    timeout: 10000,
});

export { myReq };
