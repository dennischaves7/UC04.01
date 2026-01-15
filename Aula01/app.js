import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({ message: 'Hello World! This is my first Express app.' });
});

app.get('/teste', (req, res) => {
  res.json({
    nome: "Dennis",
    religiao: 'Corinthians',
    cidade: "Corinthians"
  });
});

app.get('/status', (req, res) => {
  res.status(200).send('Status OK');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

export default app;