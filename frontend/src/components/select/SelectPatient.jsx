import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import '../../pages/appointments/appointments.css';

const SelectPatient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/all`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPatients(response.data.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      {patients.map((patient) => (
        <option key={patient._id} value={patient._id}>
          {patient.username}
        </option>
      ))}
    </>
  );
};

export default SelectPatient;