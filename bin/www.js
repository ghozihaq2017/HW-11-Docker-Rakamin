const app = require('../app');
const port = process.env.PORT_LOCALE ||  process.env.PORT ;

app.listen(port, () => {
  console.log('TEST');
  console.log(`Todo App listening on port ${port}`);
});
