const express = require('express');
const cors = require('cors');            // to avoid cross origin
const morgan = require('morgan');      //to see api request,time
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//env config
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);

const PORT = process.env.PORT||8080

app.listen(8080,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode port no. ${PORT}`.bgCyan.white);
});