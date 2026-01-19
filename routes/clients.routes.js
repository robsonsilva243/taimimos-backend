import { Router } from "express";

const router = Router();

let clients = [];
let clientId = 1;

// CREATE
router.post("/", (req, res) => {
  const { nome, telefone, email } = req.body;

  const newClient = {
    id: clientId++,
    nome,
    telefone,
    email,
  };

  clients.push(newClient);
  res.status(201).json(newClient);
});

// READ
router.get("/", (req, res) => {
  res.json(clients);
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = clients.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  clients[index] = { id, ...req.body };
  res.json(clients[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  clients = clients.filter((c) => c.id !== id);
  res.status(204).send();
});

export default router;