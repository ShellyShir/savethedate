const express = require('express');
var bodyParser = require('body-parser');


const { signUp, getUsers } = require('./service')


var bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/health-check', function (req, res) {
    res.send(
        {
            status: 'OK'
        }
    );
})

app.get('/users', function (req, res) {
    const allUsers = getUsers();

    res.send(
        { users: allUsers }
    );
})

app.post('/sign-up', function (req, res) {
    const { username, password } = req.body;

    signUp({ username, password })

    res.send(
        {
            status: 'OK'
        }
    );
})

const server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})