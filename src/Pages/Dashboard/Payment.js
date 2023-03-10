import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MZcN0LSVU875oFpR9ysD9tbPDXa4zAun4cOtkz9P3hgbUkqTZQQ50Mrk6xM5RJFZdbK4ZJqinPuKFiwx16y3qYv003NS2JLVO"
);

const Payment = () => {
  const { id } = useParams();
  const url = `https://doctors-portal-server-2023.onrender.com/booking/${id}`;
  const { data: appointment, isLoading } = useQuery(["booking ", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {/* no img card start */}
      <div class="card  max-w-md bg-base-100 shadow-xl my-12">
        <div class="card-body">
          <p className="text-success font-bold">
            Hello, {appointment.patientName}
          </p>
          <h2 class="card-title">Please Pay for {appointment.treatment}</h2>
          <p>
            Your Appointment :
            <span className="text-orange-700"> {appointment.date}</span>at
            {appointment.slot}
          </p>
          <p>Please Pay : ${appointment.price}</p>
        </div>
      </div>
      {/* no img card end */}
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointment={appointment} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
