function mapRequestToOrder(body) {
  const { numeroPedido, valorTotal, dataCriacao, items } = body;

  return {
    orderId: numeroPedido,
    value: valorTotal,
    creationDate: new Date(dataCriacao),
    items: {
      create: items.map((item) => ({
        productId: parseInt(item.idItem, 10),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      })),
    },
  };
}

module.exports = { mapRequestToOrder };
