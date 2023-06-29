require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
require("./db/Conn");
const port=process.env.port || 8000;
const bodyParser=require("body-parser");
const empRouter=require("./routes/Routers");
const { scheduleContestNotifications } = require('./contestNotification/scheduleContestNotifications');
const cron = require('node-cron');
// app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(empRouter);

cron.schedule('* * * * *', () => {
    scheduleContestNotifications();
});

app.listen(port,async()=>{
    try{
        console.log(`App is listening on port ${port}`);
    }catch(err){
        console.log(err);
    }
})