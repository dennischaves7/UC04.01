import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

// "Banco de dados" em memória
const usuarios = [
  { id: 1, nome: 'Alice',   email: 'alice@example.com',   telefone: '123456789' },
  { id: 2, nome: 'Vitoria', email: 'vitoria@example.com', telefone: '987654321' },
  { id: 3, nome: 'Nicole',  email: 'nicole@example.com',  telefone: '555555555' }
];

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/api/usuarios', (req, res) => {
  res.status(200).json({ usuarios });
});

app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id === parseInt(id));

  if (usuario) {
    return res.status(200).json({ usuario });
  } else {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.post('/api/usuarios', (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    telefone
  };

  usuarios.push(novoUsuario);

  return res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
});

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  const index = usuarios.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  if (!nome || !email || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  usuarios[index] = {
    id: parseInt(id),
    nome,
    email,
    telefone
  };

  return res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario: usuarios[index] });
});

app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  usuarios.splice(index, 1);

  return res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
