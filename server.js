const express = require("express");
const path = require("path");
const { calculateShipping } = require("./src/shipping");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint API para cálculo de envío
app.post("/api/calculate-shipping", (req, res) => {
  try {
    const { weightKg, distanceKm, isExpress } = req.body;

    const weight = parseFloat(weightKg);
    const distance = parseFloat(distanceKm);
    const expressDelivery = Boolean(isExpress);

    if (isNaN(weight) || isNaN(distance)) {
      return res.status(400).json({ error: "El peso y la distancia deben ser valores numéricos válidos." });
    }

    const totalCost = calculateShipping(weight, distance, expressDelivery);

    return res.json({
      success: true,
      data: {
        weightKg: weight,
        distanceKm: distance,
        isExpress: expressDelivery,
        totalCost: totalCost
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Iniciar servidor solo si no es importado en tests
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app;

