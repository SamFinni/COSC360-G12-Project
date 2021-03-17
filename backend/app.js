// import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// config
const cfg = require('./config');
const ip = cfg.BACKEND_IP;
const port = cfg.BACKEND_PORT;

// define the Express app
const app = express();

// to enable CORS
app.use(cors());

// to enhance security
app.use(helmet());

// to parse JSON into JS objects
app.use(bodyParser.json());

// to log HTTP requests
app.use(morgan('combined'));

// endpoints //
const testRouter = require('./routes/test');
app.use('/test', testRouter);

const commentRouter = require('./routes/comment');
app.use('/comment', commentRouter);

//const abcRouter = require('./routes/abc');
//app.use('/abc', abcRouter);

// start the server
app.listen(port, () => {
  console.log('Node.js - running on http://' + ip + ':' + port);
});