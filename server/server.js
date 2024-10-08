const express = require('express');
const app = express();






const httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT,() => console.log('it work !!!'));