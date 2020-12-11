const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');



const stripe = require('stripe')(functions.config().stripe.secret);
const EASY_SHIP_TEST_TOKEN =
  'sand_tIQuKxpfLAXCREc2fGRySRtZlO6vKICGTQ2rK7X6skg=';
const easyship = require('easyship')(EASY_SHIP_TEST_TOKEN);

//API

//App Config
const app = express();
admin.initializeApp()

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

//functions
exports.addAdminRole = functions.https.onCall((data, context) => {
  console.log(data)
  // get user and add custom claim(admin)
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin:true
    })
  }).then(() => {
    return {
      message:`Success ${data.email} has been made admin`
    }
  }).catch(err => {
    return err
  })
})

//Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/ecommerce-project-f0c3b/us-central1/api
