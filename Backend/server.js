require('dotenv').config();
const http = require('http');
const app = require('./app');


// Set the port, default to 3000 if not specified in environment
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
