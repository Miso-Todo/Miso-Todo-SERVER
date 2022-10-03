const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Connection test
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Server start
const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();