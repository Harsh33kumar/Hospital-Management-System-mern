const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ContactUs = require('./routes/ContactUs')
const Authrouter = require('./routes/AuthUserRouter');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointment'); // Fixed typo: "appoinmentsRouter" → "appointmentsRouter"
const Package = require('./routes/HealthPackageR');
const callbackRoutes = require("./routes/callbackRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const path = require('path');

// To serve image files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));



// Connect to MongoDB
mongoose.connect('mongodb+srv://harshkumar:jgPwnEM9qOw4QBdX@cluster0.yvdlu3p.mongodb.net/HFSD1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Route registration

app.use('/auth',Authrouter);
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/contactus',ContactUs);
app.use('/packages', Package);
app.use("/api/callbacks", callbackRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
