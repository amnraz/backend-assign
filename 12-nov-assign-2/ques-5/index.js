// index.js
const express = require('express');
const eventEmitter = require('./eventLogger');
const { delayMessage } = require('./delay');

const app = express();
const PORT = 3000;


app.get('/test', (req, res) => {
  res.send('Test route is working!');
});


app.get('/emit', (req, res) => {
  const message = req.query.message;

  if (!message) {
    return res.status(400).json({ error: 'Missing "message" query parameter' });
  }

  eventEmitter.emit('log', message);

  res.json({
    status: 'success',
    message: `Log event emitted with message: "${message}"`,
  });
});

app.get('/delay', async (req, res) => {
  const message = req.query.message;
  const time = parseInt(req.query.time);

  if (!message || isNaN(time)) {
    return res
      .status(400)
      .json({ error: 'Missing "message" or invalid "time" query parameter' });
  }

  const result = await delayMessage(message, time);
  res.json({
    status: 'success',
    delayedMessage: result,
    delayTime: time,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
