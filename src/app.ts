import express from 'express';
import router from './routes/router'
import {PORT} from './config/config'

const app = express();

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
