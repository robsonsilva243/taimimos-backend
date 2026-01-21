import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * CREATE ORDER
 */
router.post("/", async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: {
        description: req.body.description,
        totalValue: req.body.totalValue,
        clientId: req.body.clientId,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LIST ALL ORDERS
 */
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { client: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET ORDER BY ID
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { client: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE ORDER
 */
router.delete("/:id", async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
