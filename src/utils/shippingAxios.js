import axios from 'axios'
const baseUrl = 'http://localhost:5001/ecommerce-project-f0c3b/us-central1/api'


let token = 'bearer sand_tIQuKxpfLAXCREc2fGRySRtZlO6vKICGTQ2rK7X6skg='

const getRate = async (shipmentObject) => {
    const config = {
      headers: { Authorization : token },
    }
    const response = await axios.post(`${baseUrl}/getrate`, shipmentObject, config)
    return response.data
}

export { getRate }