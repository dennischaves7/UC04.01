import express from "express";
import "dotenv/config.js";
import cursoRoutes from "./src/routes/cursoRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/cursos", cursoRoutes); 

app.get("/", (req, res)=> {
    res.status(200).send("Vai, Corinthians!")
});

app.listen(PORT, ()=>{
    console.log(`Clica aí: http://localhost:${PORT}`)
});