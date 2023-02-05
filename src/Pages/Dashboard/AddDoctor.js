import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
     const {register,formState: { errors },handleSubmit,reset} = useForm();

    const { data :services ,isLoading } = useQuery("services", () =>
      fetch("http://localhost:5000/service").then((res) => res.json())
    );

    const imageStorageKey='1bf0668d642a9c74d82ff4d8bc9ca13f' 

    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body :formData
        })
        .then(res => res.json())
            .then(result => {
            if(result.success){
                const img = result.data.url;
                const doctor = {
                  name: data.name,
                  email: data.email,
                  Specialty: data.Specialty,
                  img: img
                }
                //send to your database
              fetch("http://localhost:5000/doctor", {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body : JSON.stringify(doctor)
              })
                .then(res => res.json())
                .then(inserted => {
                  if (inserted.insertedId) {
                    toast.success('Doctor added successfully');
                    reset();
                  }
                  else {
                    toast.error('Failed to add the doctor');
                  }
              }) 
            }
            //console.log( 'imgbb' , result);
        })
    }; 


    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
      <div>
        <h2>this is add doctor page</h2>
        {/* //hook form start*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*name text-input start*/}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your Name"
              className="input input-bordered w-full max-w-xs"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-500">
                  {errors.name.message}
                </p>
              )}   
            </label>
          </div>
          {/*name text-input end */}

          {/*email text-input start*/}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your Email"
              className="input input-bordered w-full max-w-xs"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid Email",
                },
              })}
            />
            <label className="label">
              {errors.email?.type === "required" && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </label>
          </div>
          {/*email text-input end */}

          {/*Specialty text-input start*/}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Specialty</span>
            </label>

            <select {...register("Specialty")} class="select input-bordered  w-full max-w-xs">
              {/* speciality dropdown options */}
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          {/*Specialty text-input end */}

          {/*url text-input start*/}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full max-w-xs"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-500">
                  {errors.name.message}
                </p>
              )}
            </label>
          </div>
          {/*url text-input end */}

          <input
            className="btn  w-full max-w-xs text-white"
            type="submit"
            value="Add"
          />
        </form>
        {/* //hook form end*/}
      </div>
    );
};

export default AddDoctor;