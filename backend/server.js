const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/minicrm")
.then(()=>{
    console.log("✅ MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

app.use(express.static(path.join(__dirname,"../frontend")));

app.use("/api/auth",authRoutes);
app.use("/api/leads",leadRoutes);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/login.html"));
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`🚀 Server Running on Port ${PORT}`);
});