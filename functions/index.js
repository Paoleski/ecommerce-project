// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load()
// }

const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const stripeSecretKey = 'sk_test_51Hsjo8CiY9aT1d2SDwN3XBeQVaT2eYTkovxLQdAfy546rJRJBNBGyxHTnPhhcYdjh1tR4aYgvCVsMlvvJ0RGJQXQ009ZlRmqRI'
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey);


//API

//App Config
const app = express()

//Middlewares
app.use(cors({ origin:true }))
app.use(express.json())

//API Routes
app.get('/', (request, response) => {
    response.status(200).send('hello world')
})

app.post('/payments/create', async (request, response) => {
    try {
        const total = request.query.total
        console.log('payment request received, for this amount:', total)
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:'usd',
        })

        response.status(201).send({
            clientSecret:paymentIntent.client_secret })
    } catch (err) {
        console.log('am i something?')
        response.status(500).json({statusCode:500, message:err})
    } 
})

//Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/ecommerce-project-f0c3b/us-central1/api