import axios from 'axios'

const instance = axios.create({
    baseURL:'...' // the api url
    
})

export default instance