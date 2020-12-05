const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
// const easyPost_TEST_KEY =
//   'EZTK91a57e7de2d7431cb8c07c6f6e57515dczz50Wb0q60HOVPv7qENJQ';
// const EasyPost = require('@easypost/api');
const stripe = require('stripe')(functions.config().stripe.secret);
// const easyPostApi = new EasyPost(easyPost_TEST_KEY);
const EASY_SHIP_TEST_TOKEN =
  'sand_tIQuKxpfLAXCREc2fGRySRtZlO6vKICGTQ2rK7X6skg=';
const easyship = require('easyship')(EASY_SHIP_TEST_TOKEN);

//API

//App Config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get('/', (request, response) => {
  response.status(200).send('hello world');
});

app.post('/getrate', async (request, response) => {
  try {
    const object = request.body
    const rates = await easyship.rate.create(object)
    response.status(201).send(rates)
  } catch (err) {
    console.log(err);
    response.status(err.statusCode).json(err.detail)
  }

})



app.post('/payments/create', async (request, response) => {
  try {
    const { amount } = request.body;
    console.log(
      'IHAAAAAAAAAAAAAAAAAAAAA payment request received, for this amount: ',
      amount
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log('am i something?');
    response.status(500).json({ statusCode: 500, message: err.message });
  }
});

//Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/ecommerce-project-f0c3b/us-central1/api
