//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import express from 'express';
import connectDB from './db/connect';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
   origin: process.env.CORS_ORIGIN, credentials: true 
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true , limit: "16kb"}));  // url encode and convert karta hai , because url se data kisi b format m ajata hai . // extended mtlan nested object use karsaktey ho
app.use(express.static("public"));
app.use(cookieParser());



connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log("ERRR:", error);
        throw error;
       });

    app.listen(port, ()=>{
        console.log(`App is listening on port ${port}`);
       });
})
.catch((err)=>{
    console.log("MongoDB connection failed...!!", err);
    
})


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