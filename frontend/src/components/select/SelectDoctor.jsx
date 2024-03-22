import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import '../../pages/appointments/appointments.css';

const SelectDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      {doctors.map((doctor) => (
        <option key={doctor._id} value={doctor._id}>
          {doctor.firstName} {doctor.lastName}
        </option>
      ))}
    </>
  );
};

export default SelectDoctor;