import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const BookingModal = ({ date, treatment, setTreatment ,refetch }) => {
  const { _id, name, slots ,price } = treatment;
  const [user] = useAuthState(auth);
  const formattedDate = format(date, 'PP');

  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    //const email = event.target.email.value;
    //console.log(_id, name, slot, email);

    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot,
      price,
      patient: user.email,
      patientName: user.displayName,
      phone: event.target.phone.value
    };
     
    fetch('http://localhost:5000/booking', {
    // fetch("https://doctors-portal-server-2023.onrender.com/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        if (data.success) {
          toast(`Appointment is set , ${formattedDate} at ${slot}`);
        } else {
          toast.error(
            `Already have an Appointment on, ${data.booking?.date} at ${data.booking?.slot}`
          );
        }
        //sob kaj ses e null kore dela moda theke data sob sore jabe,  autometic off hoye jabe modal
        refetch();
        setTreatment(null);
      });


   
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">
            Booking for : {name}
          </h3>
          {/* form start */}
          {/* form banabo akta modalbox er vitore jate input text box gulo rakhte pari */}
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 justify-items-center"
          >
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs mt-2"
            />
            {/* dropdown menu start */}
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {
                slots.map((slot, index) => <option
                  key={index}
                  value={slot}>{slot}</option> )
              }
            </select>
            {/* dropdown menu end */}
            <input
              type="text"
               name="name"
              // placeholder="Your Name"
              disabled
              value={user?.displayName || ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              // placeholder="Your Email Address"
              disabled
              value={user?.email || ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="submit"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
          {/* form end */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
