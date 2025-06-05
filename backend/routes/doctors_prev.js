const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new doctor
router.route('/add').post((req, res) => {
    const { image,name,age, specialty,hospital,description,education,experience,fees } = req.body;
    const newDoctor = new Doctor({ image,name,age, specialty,hospital,description,education,experience,fees });

    newDoctor.save()
        .then(savedDoctor => res.json(savedDoctor))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update doctor data
router.route('/update/:id').post((req, res) => {
    Doctor.findById(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json('Doctor not found');
            }
            doctor.image=req.body.image;
            doctor.name = req.body.name;
            doctor.age = req.body.age;
            doctor.specialty = req.body.specialty;
            doctor.hospital = req.body.hospital;
            doctor.description = req.body.description;
            doctor.education = req.body.education;
            doctor.experience = req.body.experience;
            doctor.fees = req.body.fees;

            // ---------------------------------
            //  image,name,age, specialty,hospital,description,education,experience,fees 
            //-----------------------------------

            doctor.save()
                .then(() => res.json('Doctor updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete doctor by ID
router.route('/delete/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json('Doctor not found');
            }
            res.json('Doctor deleted!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
