/**
 * File for instantiating our stripe instance.
 */
import { loadStripe } from "@stripe/stripe-js";
// loadStripe will define that this is our stripe instance.

/**
 * this method will be needing value of the public key
 * this will be placed in .env file for our code have access to it.
 * this will be added in gitignore as well.
 * By default create react app allows us to use .env file we will not be pushing this file in git
 * React will merge this variable 
 */
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);