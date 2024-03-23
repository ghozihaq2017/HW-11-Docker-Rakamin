const { Todo } = require('../models');
class TodoController {
  // List All Todo
  static findAll = async (req, res, next) => {
    try {
      const todos = await Todo.findAll();
      res.status(200).json({ data: todos });
    } catch (err) {
      next(err);
    }
  };

  // List Todo by id
  static findOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const filterOptions = {
        where: {
          id,
        },
      };

      const todo = await Todo.findOne(filterOptions);

      if (!todo) throw { name: 'ErrorNotFound', message: 'Todo Not Found' };

      res.status(200).json({ data: todo });
    } catch (err) {
      next(err);
    }
  };

  // Add New Todo
  static create = async (req, res, next) => {
    try {
      const { task, description, completed } = req.body;
      const todo = await Todo.create(
        { task, description, completed },
        {
          returning: true,
        },
      );

      res.status(201).json({
        message: 'Todo added successfully',
        data: todo,
      });
    } catch (err) {
      next(err);
    }
  };

  // Update Todo
  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const [rowsUpdated] = await Todo.update(body, { where: { id } });

      if (rowsUpdated === 0) {
        throw { name: 'ErrorNotFound', message: 'Todo not found' };
      }

      res.status(200).json({ message: 'Todo updated successfully' });
    } catch (err) {
      next(err);
    }
  };

  // Delete Movie
  static destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const rowsDeleted = await Todo.destroy({ where: { id } });

      if (rowsDeleted === 0) {
        throw { name: 'ErrorNotFound', message: 'Todo not found' };
      }

      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoController;
