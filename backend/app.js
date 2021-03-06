// import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uest = require('uest');

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
app.use(bodyParser.json({limit: '10mb'}));

// to log HTTP requests
app.use(morgan('combined'));

// to call endpoints within another endpoint
app.use(uest());

// endpoints //
const testRouter = require('./routes/test');
app.use('/test', testRouter);

const commentRouter = require('./routes/comment');
app.use('/comment', commentRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const postreportRouter = require('./routes/postreport');
app.use('/postreport', postreportRouter);

const friendRouter = require('./routes/friend');
app.use('/friend', friendRouter);

const messageRouter = require('./routes/message');
app.use('/message', messageRouter);

const postRouter = require('./routes/post');
app.use('/post', postRouter);

const postscoreRouter = require('./routes/postscore');
app.use('/postscore', postscoreRouter);

const notificationRouter = require('./routes/notification');
app.use('/notification', notificationRouter);

const resetkeyRouter = require('./routes/resetkey');
app.use('/resetkey', resetkeyRouter);

//const abcRouter = require('./routes/abc');
//app.use('/abc', abcRouter);

// start the server
app.listen(port, () => {
  console.log('Node.js - running on http://' + ip + ':' + port);
});