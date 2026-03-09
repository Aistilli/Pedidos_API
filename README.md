# Order API

API REST para gerenciamento de pedidos com **Node.js**, **Express**, **Prisma** e **MongoDB**.

---

## 📋 Requisitos

- Node.js v18+
- npm ou yarn
- MongoDB (local ou Atlas)

---

## 🚀 Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure a URL do MongoDB:

```bash
cp .env.example .env
```

Edite o `.env`:
```env
# MongoDB local
DATABASE_URL="mongodb://localhost:27017/orders_db"

# MongoDB Atlas
DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/orders_db"

PORT=3000
```

### 3. Gerar o Prisma Client
```bash
npm run prisma:generate
```

### 4. Sincronizar o schema com o MongoDB
```bash
npm run prisma:push
```

### 5. Iniciar o servidor
```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

---

## 📡 Endpoints

### Criar Pedido
```
POST /order
Content-Type: application/json
```

**Body:**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Resposta (201):**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso.",
  "data": {
    "id": "64dab8a0f6b7183237d307f6",
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
}
```

---

### Listar Todos os Pedidos
```
GET /order/list
```

---

### Obter Pedido por ID
```
GET /order/:id
```

**Exemplo:** `GET /order/v10089015vdb-01`

---

### Atualizar Pedido
```
PUT /order/:id
Content-Type: application/json
```

**Exemplo:** `PUT /order/v10089015vdb-01`

Aceita os mesmos campos do POST (parcialmente ou completo).

---

### Deletar Pedido
```
DELETE /order/:id
```

**Exemplo:** `DELETE /order/v10089015vdb-01`

---

## 🗂️ Mapeamento de Campos

| Campo de Entrada         | Campo no Banco       |
|--------------------------|----------------------|
| `numeroPedido`           | `orderId`            |
| `valorTotal`             | `value`              |
| `dataCriacao`            | `creationDate`       |
| `items[].idItem`         | `items[].productId`  |
| `items[].quantidadeItem` | `items[].quantity`   |
| `items[].valorItem`      | `items[].price`      |

---

## 🧪 Exemplos com cURL

```bash
# Criar pedido
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{"idItem": "2434", "quantidadeItem": 1, "valorItem": 1000}]
  }'

# Listar todos os pedidos
curl http://localhost:3000/order/list

# Obter pedido
curl http://localhost:3000/order/v10089015vdb-01

# Atualizar pedido
curl -X PUT http://localhost:3000/order/v10089015vdb-01 \
  -H "Content-Type: application/json" \
  -d '{"valorTotal": 15000}'

# Deletar pedido
curl -X DELETE http://localhost:3000/order/v10089015vdb-01
```

---

## 🏗️ Estrutura do Projeto

```
order-api/
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
├── src/
│   ├── routes/
│   │   └── orderRoutes.js        # Definição das rotas
│   ├── mapper.js                 # Mapeamento de campos
│   ├── prismaClient.js           # Singleton do Prisma
│   └── server.js                 # Entry point
├── .env.example
├── .gitignore
└── package.json
```
