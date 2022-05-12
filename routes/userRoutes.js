const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Signup
router.post('/auth/signup', async (req, res) => {
    const body = req.body;
    if (!(body.username && body.password)) {
        return res.status(400).send({ error: 'Data is missing' })
    }
    
    const user = new User(body);
    const salt = await bcrypt.genSalt(12);

    user.password = await bcrypt.hash(user.password, salt);
    user.save()
    .then((doc) => res.status(201).send(doc))
    .catch((err) => res.status(500).json({ error: err }));
});

// Login
router.post('/auth/login', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json({ message: 'Valid password' });
        } else {
            res.status(400).json({ error: 'Invalid password' });
        }
    } else {
        res.status(401).json({ error: 'User does not existed' })
    }
});

// Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);

        res.send(`Document with ID: ${data._id} has been deleted.`)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;