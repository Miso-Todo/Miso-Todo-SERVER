const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('./routers');
const dotenv = require('dotenv');
const { errControl } = require('./middleware/errorControl');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const { sequelize } = require('./models');
sequelize.sync({ force: false })
.then(() => {
  console.log("Data Source has been initialized!");
})
.catch((err) => {
  console.error("Error during Data Source initialization", err);
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routers);
app.use(errControl);

// Connection test
app.get('/ping', (req, res) => {
  res.status(200).json({'message' : 'pong'});
});

// Server start
const start = async () => {
  try {
      app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
      console.error(err); 
  }
}

start();