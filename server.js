const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./middleware/passport');
const indexRouter = require('./routers/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const { sequelize } = require('./models');
sequelize.sync({ force: false })
.then(() => {
  console.log('Data Source has been initialized!');
})
.catch((err) => {
  console.error('Error during Data Source initialization', err);
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
passportConfig();

// Connection test
app.get('/ping', (req, res) => {
  res.status(200).json({'message' : 'pong'});
});

// Server start
const start = async () => {
  try {
    app.get('/', (req, res) => res.send('Welcome Swagger handler'));
    indexRouter(app);
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err); 
  };
};

start();