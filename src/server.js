import express from 'express';

const app = express();

app.use(express.json());

const orders = [];
let nextId = 1;

app.post('/order', (req, res) => {
  const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

  if (!numeroPedido || valorTotal == null || !dataCriacao || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Os campos numeroPedido, valorTotal, dataCriacao e items são obrigatórios.' });
  }

  const order = {
    id: nextId++,
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
  };

  orders.push(order);
  res.status(201).json(order);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});