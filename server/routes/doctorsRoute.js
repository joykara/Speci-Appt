const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');

// Create a new doctor
router.post('/register', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).send('Server Error');
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Server Error');
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }
    res.send(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).send('Server Error');
  }
});

// Update doctor by ID
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }
    res.send(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).send('Server Error');
  }
});

// Delete doctor by ID
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }
    res.send(doctor);
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
