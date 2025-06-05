// models/Doctor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    name: { type: String, required: true },
    age:{type:Number,required:true},
    specialty: { type: String, required: true },
    hospital:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    education:{
        type:String,
        required:true
    },
    experience:{type:Number,required:true},
    fees:{type:Number,required:true}
    // Add more fields as needed
});
const Doctor =
    mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;