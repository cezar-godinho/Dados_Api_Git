
import express from 'express';
import { CONFIG } from './config/constants';
import { dataRouter } from './routes';
import { Search } from "./db/search";
const cors = require('cors');

const app = express();
app.use(express.json());

app.use((req, res, next) => {    
    res.header("Access-Control-Allow-Origin", "*");    
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use('/data', dataRouter);

Search.dados();

app.listen(CONFIG.PORT, () => {
    console.log(`Server is listening on port ${CONFIG.PORT}`);
});

export default app;