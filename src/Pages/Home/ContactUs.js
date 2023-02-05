import React from 'react';
import appointment from '../../assets/images/appointment.png'

const ContactUs = () => {
    return (
            <div>
            <div className="hero" style={{
            background:`url(${appointment})`
        }}  >
  <div className="hero-content flex-col">

    <div className="text-center lg:text-left mt-10">
      <h1 className="text-2xl text-center text-primary">Contact Us</h1>
      <p className="text-5xl text-white">Stay connected with us</p>
    </div>

    <div className="card  w-full max-w-sm ">
      <div className="card-body">
        <div className="form-control">
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control mt-5">
          <input type="text" placeholder="password" className="input input-bordered" />
        </div>
        <div>
            <textarea className='p-2 mt-5' placeholder="Your message" id="" cols="39" rows="4"></textarea>
        </div>
      </div>
    </div>
    <div className="form-control">
          <button className="btn btn-primary">Submit</button>
        </div>
  </div>
</div>
            </div>
    );
};

export default ContactUs;