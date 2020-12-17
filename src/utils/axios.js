import axios from 'axios'

const instance = axios.create({
    baseURL:'https://us-central1-ecommerce-project-f0c3b.cloudfunctions.net/api' 
})


export default instance

// https://us-central1-ecommerce-project-f0c3b.cloudfunctions.net/api
// http://localhost:5001/ecommerce-project-f0c3b/us-central1/api
