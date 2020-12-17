import axios from 'axios'
const baseUrl = 'https://us-central1-ecommerce-project-f0c3b.cloudfunctions.net/api'


let token = `bearer ${process.env.REACT_APP_EASYSHIP_TEST_KEY}`

const getRate = async (shipmentObject) => {
    const config = {
      headers: { Authorization : token },
    }
    console.log('im here>>>', baseUrl)
    const response = await axios.post(`${baseUrl}/getrate`, shipmentObject, config)
    return response.data
}

export { getRate }