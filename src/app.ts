import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

app.use(cors({
   origin: process.env.CORS_ORIGIN, credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended: true , limit: "16kb"}));  // url encode and convert karta hai , because url se data kisi b format m ajata hai . // extended mtlan nested object use karsaktey ho
app.use(express.static("public"));
app.use(cookieParser());


// Imports routes

import router from './route/user.route'

// routes declaration

app.use("/api/v1/users", router)

// export default app

export {app}