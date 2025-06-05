const express = require('express');
const routers = express.Router();
const router = express.Router();
const    {signupValidation,
    loginValidation,
    logoutValidation} 
 = require('../middlewares/AuthUserMiddleware');

const {
        signup,
        login,
        logout
} = require('../controllers/AuthUserController');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserModel = require('../models/User');

routers.use(express.json());
// Define your routes here
routers.get('/', (req, res) => {
    res.send('Hello from AuthUserRouter');
});
routers.post('/signup', signupValidation, signup);
routers.post('/signin', loginValidation,login);
routers.post('/logout', logoutValidation,logout);


// Example route for user registration

router.post('/signup', async (req, res) => {
    const { name,role ,email, password } = req.body;
    try {
        const newUser = new UserModel({ name, role, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});
router.post('/signin', async (req, res) => {
    const { role,email, password } = req.body;
    try {
        const user = await UserModel.findOne({ role,email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ role,success,message: 'Login successful',jwtToken, user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

);
router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { role,name, email, password } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { role,name, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.find();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Here you would typically send a password reset email
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending password reset email' });
    }
}
);
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await UserModel.find();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
}
);
router.post('/logout', async (req, res) => {
    try {
        // Here you would typically invalidate the user's session or token
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out' });
    }
}
);






module.exports = routers;

