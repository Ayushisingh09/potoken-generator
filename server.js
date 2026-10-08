import express from 'express';
import handler from './api/token.js';

const app = express();
const port = process.env.PORT || 4416;

app.get(['/', '/token', '/api/token'], async (req, res) => {
  await handler(req, res);
});

app.listen(port, () => {
  console.log(`PoToken Generator running on http://localhost:${port}`);
  console.log(`Endpoint: http://localhost:${port}/token`);
});
