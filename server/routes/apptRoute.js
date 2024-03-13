const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');

// Get appointments for a specific patient
router.get('/', async (req, res) => {
  try {
    const { patientId } = req.query;
    const appointments = await Appointment.find({ patient: patientId }).populate('doctor').populate('patient');
    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

module.exports = router;
