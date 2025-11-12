const express = require('express')
const os = require('os');
const dns = require('dns');
const readfile = require('./readfile');
const app = express()
const port = 3000

app.get('/test', (req, res) => {
    res.send('Test route is working')
});

app.get('/readfile', (req, res) => {
    const fileContent = readfile();
    res.send(fileContent);
});

app.get('/getip', (req, res) => {
    dns.lookup('masaischool.com', (err, address) => {
        if (err) {
            res.send('Error fetching IP: ' + err.message);
        } else {
            res.send(`IP address of masaischool.com: ${address}`);
        }
    });
});


app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
});