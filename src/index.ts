//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import express from 'express';
import connectDB from './db/connect';


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDB();


// IFFI function 
/*
( async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error", (error)=>{
        console.log("ERRR:", error);
        throw error;
       })

       app.listen(port, ()=>{
        console.log(`App is listening on port ${port}`);
       });
        
    } catch (error) {
        console.error("ERROR: " , error)
        throw error;
    }

})()

*/








/* 
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

 */