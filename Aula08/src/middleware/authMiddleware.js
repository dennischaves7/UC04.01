import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET); 
        req.usuario = usuario;
        next();
    } catch (error) {
            return res.status(403).json({ erro: "Token inválido" });     
    }
}