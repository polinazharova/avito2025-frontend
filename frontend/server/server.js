import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const FRONTEND_PORT = 80;

app.get('/', (req, res) => {
  res.redirect(301, '/issues');
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(FRONTEND_PORT, async () => {
  console.log(`Frontend запущен: http://localhost:${FRONTEND_PORT}`);
});
