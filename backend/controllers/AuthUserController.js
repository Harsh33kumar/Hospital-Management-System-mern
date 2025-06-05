const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

// Signup function
const signup = async (req, res) => {
    try {
        const { name, role,email, password } = req.body;

        const existingUser = await UserModel.findOne({ role,email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance with hashed password
        const newUser = new UserModel({
            role,
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Useful for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login function

const login = async (req, res) => {

    try {
        const { role,email, password } = req.body;
        console.log(email,password);

        const User = await UserModel.findOne({ role,email });
        if (!User) {
            return res.status(403).json({ error: 'Authentication failed (email or password)' });
        }

        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: 'Authentication failed (email or password)2' });
        }

        const jwtToken = jwt.sign(
            { email: User.email, _id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log({ "email": User.email, "id": User._id ,"name":User.name})
        console.log("jwttoken",jwtToken);
        res.status(200).json({
            role,
            success:true,
            message: 'Login successful',
            jwtToken,
            email,
            name: User.name,
        });

    } catch (error) {
        console.error(error); // Optional but helpful
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Logout function
const logout = async (req, res) => {
    try {
        // Perform logout logic here (e.g., invalidate User session)
        
        // For demonstration, we'll just return a success message
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signup,
    login,
    logout
}