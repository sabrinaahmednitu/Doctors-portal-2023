import React from 'react';
import Banner from './Banner';
import ContactUs from './ContactUs';
import Footer from '../Shared/Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Terms from './Terms';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
           <Services></Services>
           <Terms></Terms>
           <MakeAppointment></MakeAppointment>
           <Testimonials></Testimonials>
           <ContactUs></ContactUs>
           <Footer></Footer>
        </div>
    );
};

export default Home;