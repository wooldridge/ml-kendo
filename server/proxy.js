const config = require('../config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

const PORT = config.server.port;
const HOST = config.host;
const API_URL = "http://" + config.host + ":" + config.rest["rest-api"].port;


app.get('/v1/documents', createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    auth: config.user["user-name"] + ":" + config.user.password
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});