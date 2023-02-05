import React from 'react';
import quote from '../../assets/icons/quote.svg'
import pep1 from '../../assets/images/people1.png'
import pep2 from '../../assets/images/people2.png'
import pep3 from '../../assets/images/people3.png'
import Review from './Review';

const Testimonials = () => {
    const reviews=[
        {
            _id:1,
            name:'Windsom Herry',
            review:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content' ,
            img: pep1 ,
            location:'Californiya'
        },
        {
            _id:2,
            name:'Windsom Herry',
            review:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content' ,
            img: pep2,
            location:'Sun fransisco'
        },
        {
            _id:3,
            name:'Windsom Herry',
            review:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content' ,
            img: pep3,
            location:'Seattle'
        } 
    ]
    return (
        <section className='my-28'>
            {/* div1 */}
           <div className='flex justify-between'>

              <div>
                 <h4 className='text-xl text-primary font-bold'>Testimonial</h4>
                 <h2 className='text-3xl'>What our Patients say</h2>
              </div>

            <div>
                <img className='w-24 lg:w-48' src={quote} alt="" />
            </div>

           </div>

            {/* div2 */}
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' >
                  {
                      reviews.map(review =><Review
                      key={review._id}
                      review={review}
                      ></Review>)
                  }
           </div>
        </section>
    );
};

export default Testimonials;