require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? './src/enves/prod.env'
      : './src/enves/dev.env',
});

const app = require('./src/app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
