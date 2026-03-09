const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});