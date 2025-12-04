const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

try {
  app.use(express.static(path.join(__dirname, 'build')));

  // Catch-all handler for SPA
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const server = app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
  });

  server.on('error', (e) => {
    console.error('Server Error:', e);
  });
} catch (e) {
  console.error('Setup Error:', e);
}
