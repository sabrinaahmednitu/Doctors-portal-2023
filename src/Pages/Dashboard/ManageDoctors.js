import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
  const [deletingDoctor , setDeletingDoctor ]=useState(null)
    const { data: doctors, isLoading , refetch } = useQuery("doctors", ()=>fetch("https://doctors-portal-server-2023.onrender.com/doctor", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res =>res.json())
    );

    if(isLoading) {
        return <Loading></Loading>;
    }

    return (
      <div>
        <h2>manage doctorsthrtghrftgh : {doctors.length} </h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>avatar</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 start--> */}
              {doctors.map((doctor, index) => (
                <DoctorRow
                  key={doctor._key}
                  doctor={doctor}
                  index={index}
                  refetch={refetch}
                  setDeletingDoctor={setDeletingDoctor}
                ></DoctorRow>
              ))}
              {/* <!-- row 1 end --> */}
            </tbody>
          </table>
        </div>
        {deletingDoctor && <DeleteConfirmModal
        deletingDoctor={deletingDoctor}
        refetch={refetch}
        setDeletingDoctor={setDeletingDoctor}
        ></DeleteConfirmModal>}
      </div>
    );
};

export default ManageDoctors;