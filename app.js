require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// MongoDB Connection //
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on('error', (err) => {
    console.log("Error", err);
})
// // // // // // // //

// Mongoose Models //
require('./models/user');
require('./models/post');
// // // // // //

// Routes //
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
// // // //

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
})