import { Router } from "express";

const router = Router();

let installments = [];
let installmentId = 1;

// CREATE PARCELAS (usado pelo orders)
router.post("/", (req, res) => {
  const { orderId, clientId, valorTotal, parcelas } = req.body;

  if (!orderId || !clientId || !valorTotal || !parcelas) {
    return res.status(400).json({ message: "Dados obrigatórios faltando" });
  }

  const valorParcela = Number(valorTotal) / Number(parcelas);

  for (let i = 1; i <= parcelas; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);

    installments.push({
      id: installmentId++,
      orderId,
      clientId,
      numero: i,
      totalParcelas: parcelas,
      valor: Number(valorParcela.toFixed(2)),
      vencimento: date.toISOString().slice(0, 10),
      status: "Pendente",
    });
  }

  res.status(201).json({ message: "Parcelas criadas" });
});

// READ
router.get("/", (req, res) => {
  res.json(installments);
});

// UPDATE (MARCAR COMO PAGO)
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const installment = installments.find((i) => i.id === id);

  if (!installment) {
    return res.status(404).json({ message: "Parcela não encontrada" });
  }

  installment.status = "Pago";
  res.json(installment);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  installments = installments.filter((i) => i.id !== id);
  res.status(204).send();
});

export default router;