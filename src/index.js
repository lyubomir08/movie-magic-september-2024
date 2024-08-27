const express = require('express');

const configHandleBars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');

const app = express();
const port = 5000;

configHandleBars(app);
configExpress(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));