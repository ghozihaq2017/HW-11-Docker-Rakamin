'use strict';

const fs = require('fs');

let data = fs.readFileSync('./todos.json', 'utf-8');

data = JSON.parse(data).map((element) => {
  return {
    task: element.task,
    description: element.description,
    completed: element.completed,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
// console.log(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
