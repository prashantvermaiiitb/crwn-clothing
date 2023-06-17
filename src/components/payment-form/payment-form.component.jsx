import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItemTotal } from "../../store/cart/cart.selector";
import { currentUserSelector } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe(); // to make the request in format that stripes needs it to be
    const elements = useElements(); // ??? 
    const amount = useSelector(selectCartItemTotal);// get the total amount
    const currentUser = useSelector(currentUserSelector);// get the current user 
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); // for showing loader while payment in progress
    /**
     * This function will be used to send in card information to stripe
     * This will not be a regular form submission.
     * @param {*} e 
     */
    const paymentHandler = async (e) => {
        e.preventDefault();

        // To work with Stripe we need to import hooks from stripe.
        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        // request to Payment intent and make that to a API endpoint in Netlify.
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }) // stripe accepts in cents we are stroing in dollars
        }).then(res => res.json());
        console.log("🚀 ~ file: payment-form.component.jsx:29 ~ paymentHandler ~ response:", response)

        const { paymentIntent: { client_secret } } = response;
        console.log("🚀 ~ file: payment-form.component.jsx:32 ~ paymentHandler ~ client_secret:", client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // ! displayname is not set everytime so using email
                    // name: currentUser ? currentUser.displayName : 'Guest' 
                    name: currentUser ? currentUser.email : 'Guest'
                    // you can add more information if you want.
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            console.log("🚀 ~ file: payment-form.component.jsx:56 ~ paymentHandler ~ paymentResult.error:", paymentResult.error)
            alert(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment successfull');
            }
        }
    };


    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment information</h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> pay now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;