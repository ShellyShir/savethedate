const express = require('express');
const app = express();
const PORT = 8000;

const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.routes')

mongoose.connect('mongodb://localhost:27017/register-db', {
        // useNewUrlParser: true,
        // useUniffiedTopology: true,
        // useCreateIndex: true,
})

app.use('*', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use("/", userRoute);

app.listen(PORT, () => {
    console.log(`server up at ${PORT}`)
})


