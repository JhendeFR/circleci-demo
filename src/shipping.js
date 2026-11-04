/**
 * Calcula el costo total de envío logístico.
 * @param {number} weightKg - Peso del paquete en kilogramos
 * @param {number} distanceKm - Distancia de entrega en kilómetros
 * @param {boolean} isExpress - Si el servicio es prioritario (+50% sobre subtotal)
 * @returns {number} Costo final del envío
 */
function calculateShipping(weightKg, distanceKm, isExpress = false) {
  if (weightKg <= 0 || distanceKm <= 0) {
    throw new Error("Parámetros de envío inválidos");
  }

  const BASE_FEE = 5.0;       // Tarifa base fija ($5)
  const RATE_PER_KG = 1.5;     // $1.50 por kg
  const RATE_PER_KM = 0.10;    // $0.10 por km

  let total = BASE_FEE + (weightKg * RATE_PER_KG) + (distanceKm * RATE_PER_KM);

  if (isExpress) {
    total = total * 0.5;
  }

  return Number(total.toFixed(2));
}

module.exports = { calculateShipping };

