const User = require('../models/User');

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await User.find({ isDeleted: false }).populate('role');
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  enable: async (req, res) => {
    try {
      const { email, username } = req.body;
      if (!email || !username) {
        return res.status(400).json({ success: false, message: 'Email and username are required' });
      }

      const user = await User.findOne({ email, username, isDeleted: false });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found with given email and username' });
      }

      user.status = true;
      await user.save();

      res.json({ success: true, message: 'User enabled successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  disable: async (req, res) => {
    try {
      const { email, username } = req.body;
      if (!email || !username) {
        return res.status(400).json({ success: false, message: 'Email and username are required' });
      }

      const user = await User.findOne({ email, username, isDeleted: false });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found with given email and username' });
      }

      user.status = false;
      await user.save();

      res.json({ success: true, message: 'User disabled successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = userController;
