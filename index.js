import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clientsRoutes from "./routes/clients.js";
import ordersRoutes from "./routes/orders.js";
import installmentsRoutes from "./routes/installments.js";

dotenv.config();

const app = express();

// 🔹 MIDDLEWARES
app.use(cors({
  origin: "*", // Render não bloqueia o frontend
}));
app.use(express.json());

// 🔹 ROTA DE HEALTH CHECK (Render exige isso)
app.get("/", (req, res) => {
  res.status(200).json({
    name: "TaiMimos API",
    status: "online",
    environment: process.env.NODE_ENV || "development",
  });
});

// 🔹 ROTAS DA API
app.use("/clients", clientsRoutes);
app.use("/orders", ordersRoutes);
app.use("/installments", installmentsRoutes);

// 🔹 PORTA (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
