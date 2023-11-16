import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 3000;
const app = express();

app.use(cors({
    credentials : true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

app.get("/", async (req: express.Request, res: express.Response)=> {
    return res.status(200).send("<h1>Hello World from typescript...!</h1>");
  });

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});

