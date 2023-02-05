import React from 'react';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';
import Service from './Service';


const Services = () => {
    const servicesmenu=[
        {
            _id:1,
            name:'Fluoride Treatment',
            img:fluoride,
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',

        },
        {
            _id:2,
            name:'Cavity Filling',
            img:cavity,
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',

        },
        {
            _id:3,
            name:'Teeth Whitening',
            img:whitening,
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',

        },
    ]
    return (
        <div className='my-28'>
            <div className="text-center mb-16">
                <h3 className='text-primary text-xl font-bold upercase'>Our Services</h3>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            {/* card */}
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
               {
                   servicesmenu.map(service => <Service
                   key={service._id}
                   service={service}
                   ></Service>)
               }
            </div>
        </div>
    );
};

export default Services;