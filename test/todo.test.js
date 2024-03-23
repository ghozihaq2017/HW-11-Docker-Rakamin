const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const BASE_URL = '/todos';

//bulk insert
const { queryInterface } = sequelize;

// dijalankan sebelum test
beforeAll(async () => {
  try {
    await queryInterface.bulkInsert('Todos', [
      {
        id: 1001,
        task: 'TASK-TEST-001',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        task: 'TASK-TEST-002',
        description: 'Praesent feugiat sem quis eros dictum, vel pharetra tellus ornare.',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        task: 'TASK-TEST-003',
        description: 'Maecenas aliquam posuere ipsum sit amet sollicitudin.',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1004,
        task: 'TASK-TEST-004',
        description: 'Proin finibus egestas convallis.',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1005,
        task: 'TASK-TEST-005',
        description: 'Proin finibus egestas convallis.',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (err) {
    console.log(err);
  }
});

// dijalankan setelah test
afterAll(async () => {
  try {
    await queryInterface.bulkDelete('Todos', null);
  } catch (err) {
    console.log(err);
  }
});

// Test Method Get
describe('List All Todos', () => {
  // Tes get semua todo
  it('GET /todos should return list of todos', (done) => {
    // supertest
    request(app)
      .get(`${BASE_URL}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { data } = response.body;
        expect(data.length).toEqual(5);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// Test Method Get dengan id
describe('Detail Todo', () => {
  // Tes get detail todo
  it('GET /todos/:id should return a single todo item', (done) => {
    request(app)
      .get(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { data } = response.body;
        const { id, task, description, completed } = data;
        expect(id).toEqual(1001);
        expect(task).toBe('TASK-TEST-001');
        expect(description).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        expect(completed).toEqual(false);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // Tes salah id pada get detail todo
  it('TEST todo not found', (done) => {
    request(app)
      .get(`${BASE_URL}/2345`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        const { name, message } = response.body;
        expect(name).toBe('ErrorNotFound');
        expect(message).toBe('Todo Not Found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// Test Method Post
describe('Create Todo', () => {
  // Tes membuat todo baru
  it('POST /todos should create a new todo item', (done) => {
    const newTodo = {
      task: 'TASK-TEST-POST01',
      description: 'Description of the new todo.',
      completed: false,
    };
    request(app)
      .post(`${BASE_URL}`)
      .send(newTodo)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const { message, data } = response.body;
        const { task, description, completed } = data;
        expect(task).toBe('TASK-TEST-POST01');
        expect(description).toBe('Description of the new todo.');
        expect(completed).toEqual(false);
        expect(message).toBe('Todo added successfully');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// Test Method Put
describe('Update Todo', () => {
  // Tes meng-update sebuah todo
  it('PUT /todos/:id should update an existing todo item', (done) => {
    const updatedTodo = {
      task: 'TASK-TEST-UPDATED',
      description: 'Updated description of the todo.',
      completed: true,
    };
    request(app)
      .put(`${BASE_URL}/1001`)
      .send(updatedTodo)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe('Todo updated successfully');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // Tes gagal menemukan id todo yg ingin di-update
  it('TEST todo not found', (done) => {
    const updatedTodo = {
      task: 'TASK-TEST-UPDATED-FAILED',
    };
    request(app)
      .put(`${BASE_URL}/9898`)
      .send(updatedTodo)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        const { name, message } = response.body;
        expect(name).toBe('ErrorNotFound');
        expect(message).toBe('Todo not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// Test Method Delete
describe('Delete Todo', () => {
  // Tes menghapus sebuah todo
  it('DELETE /todos/:id should delete an existing todo item', (done) => {
    request(app)
      .delete(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe('Todo deleted successfully');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // Tes gagal menemukan id todo yg ingin dihapus
  it('TEST delete todo not found', (done) => {
    request(app)
      .delete(`${BASE_URL}/9898`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        const { name, message } = response.body;
        expect(name).toBe('ErrorNotFound');
        expect(message).toBe('Todo not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
