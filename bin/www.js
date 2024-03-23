const app = require('../app');
const port = process.env.PORT || 3001;
// const port = 3000;

app.listen(port, () => {
  console.log('TEST');
  console.log(`Todo App listening on port ${port}`);
});
