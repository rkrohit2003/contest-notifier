const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { sendNotificationEmail } = require("../contestNotification/scheduleContestNotifications");

router.get('/api/users', async (req, res) => {

  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/api/user/:userName', async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await User.find({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/api/user', async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  try {
    const userCount = await User.count({ userName: userName, password: password });
    res.json(userCount);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/api/users', async (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = new User({ userName, email, password });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
router.put('/api/user/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating User:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/api/user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/api/email', sendNotificationEmail);

module.exports = router;