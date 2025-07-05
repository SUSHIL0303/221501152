import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;


const urlDatabase = {};

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const { url, minutes, customName } = req.body;

  if (!url || !minutes) {
    return res.status(400).json({ error: 'URL and expiration time are required.' });
  }

  const shortName = customName || `id${Date.now()}`;
  const expiresAt = Date.now() + minutes * 60 * 1000;


  urlDatabase[shortName] = {
    originalUrl: url,
    expiresAt: expiresAt
  };

  res.json({
    originalUrl: url,
    expirationMinutes: minutes,
    customName: shortName,
    shortenedUrl: `http://localhost:${PORT}/${shortName}`
  });
});

app.get('/:shortName', (req, res) => {
  const { shortName } = req.params;
  const record = urlDatabase[shortName];

  if (!record) {
    return res.status(404).send('Shortened URL not found.');
  }

  if (Date.now() > record.expiresAt) {
    return res.status(410).send('This link has expired.');
  }

  res.redirect(record.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
