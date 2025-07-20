import express from 'express';

const app = express ()
const PORT = 8010;


//middlewares
import cors from 'cors';
import morgan from 'morgan';
app.use(cors());
app.use(morgan("dev"));

//if this is missing , req.body will be undefined
app.use(express.json());

//db connection
import { dbConnect } from './src/config/dbconfig.js';


//API endpoints
import router from './src/routes/userRoutes.js';
app.use("/api/v1/auth", router);





app.get('/', (req, res) => {
    const message = "Server is live made by bibek";
    res.send (message);
});

dbConnect()
app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server is running om http://localhost:${PORT}`);
});

