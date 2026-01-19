import { Router } from "express";

const router = Router();

let orders = [];
let orderId = 1;

// CREATE ORDER + INSTALLMENTS
router.post("/", (req, res) => {
  const {
    clientId,
    descricao,
    valor,
    parcelas,
    dataEntrega,
  } = req.body;

  if (!clientId || !valor || !parcelas) {
    return res.status(400).json({ message: "Dados obrigatórios faltando" });
  }

  const newOrder = {
    id: orderId++,
    clientId,
    descricao,
    valor: Number(valor),
    parcelas: Number(parcelas),
    dataEntrega,
    status: "Pendente",
  };

  orders.push(newOrder);

  // 🔹 GERAR PARCELAS AQUI (MESMO FORMATO DO INSTALLMENTS)
  const valorParcela = newOrder.valor / newOrder.parcelas;

  for (let i = 1; i <= newOrder.parcelas; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);

    global.installments.push({
      id: global.installmentId++,
      orderId: newOrder.id,
      clientId: newOrder.clientId,
      numero: i,
      totalParcelas: newOrder.parcelas,
      valor: Number(valorParcela.toFixed(2)),
      vencimento: date.toISOString().slice(0, 10),
      status: "Pendente",
    });
  }

  res.status(201).json(newOrder);
});

// READ
router.get("/", (req, res) => {
  res.json(orders);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  orders = orders.filter((o) => o.id !== id);
  res.status(204).send();
});

export default router;