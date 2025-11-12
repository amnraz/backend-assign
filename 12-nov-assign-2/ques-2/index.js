const express = require('express');
const app = express();
const port = 3000;
 
app.get('/home', (req, res) => {
  res.send('Welcome to the Home Page...!');
});
app.get('/contact', (req , res) => {
    res.send ("Welcome to the contact page....!")
});
app.get('/about', (req, res) => {
    res.send("Welcome to the about page...!");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});