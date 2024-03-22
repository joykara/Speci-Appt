const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const { sendNotification } = require("../utils/Notification");
const verifyToken = require("../middlewares/verifyToken");

// Route to schedule an appointment
router.post("/set-up", async (req, res) => {
  try {
    const { doctor, patient, date, time, reason } = req.body;

    // Check if the doctor and patient exist
    const doctorExists = await Doctor.findById(doctor);
    const patientExists = await User.findById(patient);
    if (!doctorExists || !patientExists) {
      return res.status(400).json({ message: "Doctor or patient not found" });
    }

    // Check for overlapping appointments
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment time is not available" });
    }

    // Create the new appointment
    const appointment = new Appointment({
      doctor,
      patient,
      date,
      time,
      reason,
    });
    await appointment.save();

    // Send notification to the admin and patient
    // sendNotification(doctorExists.email, 'New appointment scheduled');
    // sendNotification(patientExists.email, 'Your appointment has been scheduled');

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get users appointments based on their id
router.get("/user-appointment", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User id not found" });
    }

    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const appointments = await Appointment.find({ patient: user._id })
      .populate('doctor', 'firstName lastName')
      .sort([
        ["date", "ascending"],
      ])
      .skip(startIndex)
      .limit(limit);

    const totalAppointments = await Appointment.countDocuments();
    const totalPages = Math.ceil(totalAppointments / limit);

    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalAppointments: totalAppointments,
    };

    console.log(user);
    res.status(200).json({ appointments, pagination: pagination });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all appointments for admin by date range
router.get("/admin-appts", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctor', 'firstName lastName')
      .populate('patient', 'username')
      .sort({ date: 'asc' });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
