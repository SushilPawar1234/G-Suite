const express = require('express');
const app = express();
//for accepting data in Json format //
app.use(express.json());

const route=require('./test.js');
app.use("/test",route);

const PORT = 8081;
let  server = app.listen(PORT, function () {
    console.log(`Node server is running..${PORT}`);
});

