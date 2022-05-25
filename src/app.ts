import express from 'express';
import router from './routes/router'
import {PORT} from './config/config'
import {swaggerOptions} from './config/swagger'
const expressJSDocSwagger = require('express-jsdoc-swagger');

const app = express()

// Initialize Swagger UI
expressJSDocSwagger(app)(swaggerOptions);

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
