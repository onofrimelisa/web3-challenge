import express from 'express';
import router from './routes/router'
import {PORT} from './config/config'
const expressJSDocSwagger = require('express-jsdoc-swagger');

const app = express();

const options = {
    info: {
        version: '1.0.0',
        title: 'Platsec NodeJS SDKs test app',
        description: "Application where you can see usage examples of our Policy Agent SDK",
    },
    baseDir: __dirname,
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/swagger/index.html',
    filesPattern: '../dist/**/*.js',
    exposeSwaggerUI: true,
    servers: [
        {
            url: 'localhost:3000',
            description: 'Development server',
        }
    ],
};


expressJSDocSwagger(app)(options);
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
