import express from "express";
import usuarioRoutes from "./src/routes/usuario/usuarioRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Clica aí http://localhost:${PORT}`);
});