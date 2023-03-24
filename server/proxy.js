const config = require('../config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');
const { XMLParser } = require('fast-xml-parser');
const { handleDocumentsRes, handleSearchRes} = require('./handlers');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

const PORT = config.server.port;
const HOST = config.host;
const API_URL = "http://" + config.host + ":" + config.rest["rest-api"].port;

// fast-xml-parser: https://github.com/NaturalIntelligence/fast-xml-parser
const options = {
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: "",
  allowBooleanAttributes: true,
  // isArray: (name, jpath, isLeafNode, isAttribute) => { 
  //     if (alwaysArray.indexOf(jpath) !== -1) return true;
  // }
};
const parser = new XMLParser(options);

const xmlToJson = xml => {
  const json = parser.parse(xml);
  return json;
};

const transformContent = parsed => {
  if (parsed.results && parsed.results.length) {
    parsed.results.forEach((r, i) => {
      if (r.extracted && r.extracted.content) {
        // Convert extracted XML to JSON and replace for each result
        const json = xmlToJson(r.extracted.content[0]);
        parsed.results[i].extracted = json;
        // Add entity type as property to each result
        const entityType = Object.keys(json)[0];
        parsed.results[i].entityType = entityType;
      }
    })
  }
  return parsed;
};

// app.get('/v1/*', createProxyMiddleware({
app.all('/v1/*', createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    auth: config.user["user-name"] + ":" + config.user.password,
    selfHandleResponse: true, // Required since tranforming response
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      let result = responseBuffer;
      switch (req.path) {
        case '/v1/search':
          result = handleSearchRes(responseBuffer, proxyRes, req, res);
          break;
        case '/v1/documents':
          result = handleDocumentsRes(responseBuffer, proxyRes, req, res);
          break;
      }
      console.log(result);
      return result;
      // const response = responseBuffer.toString('utf8'); // convert buffer to string
      // let transformed = transformContent(JSON.parse(response));
      // return JSON.stringify(transformed);
    })
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});