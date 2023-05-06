const express = require('express');
const router = express.Router();
const userService = require('../../services/user');
const { authenticate, authorize } = require('../../middlewares/auth');

// Get all users
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// Get a user by ID
router.get('/:id', authenticate, authorize(['admin', 'user']), async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// Update a user
router.put('/:id', authenticate, authorize(['admin', 'user']), async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// Delete a user
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
