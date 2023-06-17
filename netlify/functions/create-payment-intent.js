/**
 * These are server less lambda functions that will run for the payment.
 */
require('dotenv').config();

console.log("🚀 ~ file: create-payment-intent.js:7 ~ process.env.STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * This is the main exported function that will run on Netlify.
 * @param {*} event 
 */
exports.handler = async (event) => {
    try {
        /**
         * When you send me this event I am going to make a payment intent to stripe.
         * using this stripe library. 
         * amount currency payment method
         */
        const { amount } = JSON.parse(event.body); // in cents

        // Now making call to the stripe end point for the payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // amount paid
            currency: 'usd', // currency in which paid
            payment_method_types: ['card'] // type of payment options 
        });

        // if all ook then return back an object with status code and other informatino
        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }

    } catch (error) {
        console.log({ error });
        return {
            status: 400,
            body: JSON.stringify({ error })
        }
    }
}