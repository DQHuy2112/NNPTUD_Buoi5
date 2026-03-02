const Role = require('../models/Role');

const roleController = {
  getAll: async (req, res) => {
    try {
      const roles = await Role.find();
      res.json({ success: true, data: roles });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }
      res.json({ success: true, data: role });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const role = new Role(req.body);
      await role.save();
      res.status(201).json({ success: true, data: role });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const role = await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }
      res.json({ success: true, data: role });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }
      res.json({ success: true, message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = roleController;
