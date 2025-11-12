const fileinfo = require('./fileinfo');
// const urlparser = require('./urlparser');   
const express = require('express');


const app = express();
const port = 3000;

app.get('/fileinfo', (req, res) => {
  const filePath = req.query.path;  
    if (!filePath) {
    return res.status(400).json({ error: 'Path query parameter is required' });
    }
    const info = fileinfo.getFileInfo(filePath);        
    res.json(info);
});

app.get('/urlinfo', (req, res) => {
  const fullURL = req.query.url;  
    if (!fullURL) {
    return res.status(400).json({ error: 'URL query parameter is required' });
    }
    const info = urlparser.parseURL(fullURL);        
    res.json(info);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});