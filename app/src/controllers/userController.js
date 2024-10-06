const axios = require('axios');
const User = require('../models/User');

async function createUserInMongoAndVital(req, res) {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,  // hash before saving
        });

        await newUser.save();
        const clientUserId = newUser._id;

        const vitalResponse = await axios.post('https://api.tryvital.io/v2/user', {
            client_user_id: clientUserId.toString()
        }, {
            headers: {
                'x-vital-api-key': process.env.VITAL_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        newUser.vitalUserId = vitalResponse.data.user_id;
        await newUser.save();

        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

module.exports = { createUserInMongoAndVital };
