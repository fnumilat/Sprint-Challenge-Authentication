const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookies = require("cookie-parser")
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();
server.use(cookies())

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);

module.exports = server;
