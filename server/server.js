const express = require('express');

const creaturesRouter = require('./routes/creatures.router.js');

const PORT = 5001;

const app = express();

app.use(express.json())
app.use(express.static('server/public'));
app.use('/creatures', creaturesRouter);

app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`)
});
