import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * CREATE CLIENT
 */
router.post("/", async (req, res) => {
  try {
    const client = await prisma.client.create({
      data: req.body,
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LIST ALL CLIENTS
 */
router.get("/", async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET CLIENT BY ID
 */
router.get("/:id", async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE CLIENT
 */
router.put("/:id", async (req, res) => {
  try {
    const client = await prisma.client.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE CLIENT
 */
router.delete("/:id", async (req, res) => {
  try {
    await prisma.client.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
