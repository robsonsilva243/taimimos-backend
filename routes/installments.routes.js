import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * CREATE INSTALLMENT
 */
router.post("/", async (req, res) => {
  try {
    const installment = await prisma.installment.create({
      data: {
        orderId: req.body.orderId,
        value: req.body.value,
        dueDate: new Date(req.body.dueDate),
        paid: false,
      },
    });
    res.status(201).json(installment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LIST ALL INSTALLMENTS
 */
router.get("/", async (req, res) => {
  try {
    const installments = await prisma.installment.findMany({
      include: {
        order: {
          include: { client: true },
        },
      },
      orderBy: { dueDate: "asc" },
    });
    res.json(installments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LIST ONLY PENDING INSTALLMENTS (CONTAS A PAGAR)
 */
router.get("/pending", async (req, res) => {
  try {
    const installments = await prisma.installment.findMany({
      where: { paid: false },
      include: {
        order: {
          include: { client: true },
        },
      },
      orderBy: { dueDate: "asc" },
    });
    res.json(installments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * MARK INSTALLMENT AS PAID
 */
router.put("/:id/pay", async (req, res) => {
  try {
    const installment = await prisma.installment.update({
      where: { id: Number(req.params.id) },
      data: { paid: true },
    });
    res.json(installment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE INSTALLMENT
 */
router.delete("/:id", async (req, res) => {
  try {
    await prisma.installment.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
