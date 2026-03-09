const express = require("express");
const prisma = require("../prismaClient");
const { mapRequestToOrder } = require("../mapper");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const orderData = mapRequestToOrder(req.body);
    const order = await prisma.order.create({
      data: orderData,
      include: { items: true },
    });
    return res.status(201).json(order);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Order already exists." });
    }
    return res.status(500).json({ error: "Failed to create order." });
  }
});

// List all orders
router.get("/list", async (_req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { items: true } });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Failed to list orders." });
  }
});

// Get order by orderId
router.get("/:orderId", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: req.params.orderId },
      include: { items: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get order." });
  }
});

// Update order by orderId
router.put("/:orderId", async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;
    const order = await prisma.order.update({
      where: { orderId: req.params.orderId },
      data: {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        items: {
          deleteMany: {},
          create: items.map((item) => ({
            productId: parseInt(item.idItem, 10),
            quantity: item.quantidadeItem,
            price: item.valorItem,
          })),
        },
      },
      include: { items: true },
    });
    return res.json(order);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Order not found." });
    }
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Failed to update order." });
  }
});

// Delete order by orderId
router.delete("/:orderId", async (req, res) => {
  try {
    await prisma.order.delete({
      where: { orderId: req.params.orderId },
    });
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.status(500).json({ error: "Failed to delete order." });
  }
});

module.exports = router;
