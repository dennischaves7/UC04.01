import express from "express";
import veiculoRoutes from "./src/veiculoRoutes.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/veiculos", veiculoRoutes);

app.get("/", (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Clica aí http://localhost:${PORT}`);
}
);