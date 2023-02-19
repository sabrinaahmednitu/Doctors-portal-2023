import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';

const CheckoutForm = ({ appointment }) => {
  //step - 1
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { price ,patient ,patientName ,_id } = appointment;


   useEffect(() =>{
     fetch(
       "https://doctors-portal-server-2023.onrender.com/create-payment-intent",
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify({ price }),
       }
     )
       .then((res) => res.json())
       .then((data) => {
         if (data?.clientSecret) {
           setClientSecret(data.clientSecret);
         }
       });
   }, [price])
  
  

  //step - 2
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    //step - 3
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    //step - 4
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    //step - 5
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess('');
    setProcessing(true);


    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email:patient
          },
        },
      });
    
    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    }
    else {
      setCardError('');
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess(' Congratulation! Your payment is completed');

      //store payment on database
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      }

      fetch(`https://doctors-portal-server-2023.onrender.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }

  };

  return (
    <>
      {/* step - 6 form*/}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success} </p>
          <p>
            Your Transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;

