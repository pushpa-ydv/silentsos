const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, ".env")});
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require("./db");
const Alert = require("./models/Alert");
const sendAlertEmail = require('./emailService');
const multer = require('multer');
const Contact = require("./models/Contact");

console.log("Loaded Mongo_Uri", process.env.MONGO_URI);

const PORT = 5000;

app.use(cors());
app.use(express.json());
const upload = multer();

connectDB();

app.post('/add-contact', async(req,res)=>{
    try{
        const {name, email} = req.body;
        const newContact = new Contact({name, email});
        await newContact.save();

        res.status(200).json({message: "Contact saved!"});
    }catch(error) {
        console.log("Error saving contact", error);
        res.status(500).json({error: "Failed to save contact"});
    }
});

app.post('/send-alert',upload.single('video'), async(req, res)=>{
    try {
        const {latitude, longitude} = req.body;
        const videoBuffer = req.file.buffer;
        
        const newAlert = new Alert({latitude, longitude});
        await newAlert.save();

        const contacts = await Contact.find();
        for(let contact of contacts) {
            await sendAlertEmail({latitude, longitude}, videoBuffer, contact.email);
        }

        console.log("Alert recieved:", newAlert);
        res.status(200).json({message: "Alert saved successfully!"});
    }catch(error) {
        console.log("Error saving alert: ", error);
        res.status(500).json({ error: "Failed to save alert "});
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
