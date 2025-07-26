const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Absolute directory
const __dirnameFixed = path.resolve();

// Serve static assets
app.use(express.static(path.join(__dirnameFixed, 'dist')));

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirnameFixed, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
