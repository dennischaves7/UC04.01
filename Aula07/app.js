import express from "express";
import "dotenv/config";
import UsuarioRoutes from "./src/routes/UsuarioRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/usuarios", UsuarioRoutes);

app.get("/", (req, res) =>{
    res.status(200).json({msg: "Rota home da API"});
});

app.use(UsuarioRoutes);

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});

export default app;