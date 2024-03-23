const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

// GET ALL TODO
router.get('/', todoController.findAll);

// GET TODO DETAIL
router.get('/:id', todoController.findOne);

// ADD NEW TODO
router.post('/', todoController.create);

// UPDATE MOVIE BY ID
router.put('/:id', todoController.update);

// DELETE MOVIE BY ID
router.delete('/:id', todoController.destroy);

module.exports = router;
