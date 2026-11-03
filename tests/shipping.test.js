const { calculateShipping } = require("../src/shipping");

describe("Pruebas Unitarias - Módulo de Tarifas de Envío", () => {
  test("Debe calcular correctamente un envío estándar (10kg, 100km)", () => {
    // Base: 5 + Peso: (10 * 1.5 = 15) + Distancia: (100 * 0.10 = 10) = 30
    const cost = calculateShipping(10, 100, false);
    expect(cost).toBe(30.0);
  });

  test("Debe aplicar el recargo del 50% en envíos express (2kg, 50km)", () => {
    // Base: 5 + Peso: (2 * 1.5 = 3) + Distancia: (50 * 0.10 = 5) = 13. Con express: 13 * 1.5 = 19.5
    const cost = calculateShipping(2, 50, true);
    expect(cost).toBe(19.5);
  });

  test("Debe lanzar excepción si el peso o la distancia son menores o iguales a cero", () => {
    expect(() => calculateShipping(-2, 100)).toThrow("Parámetros de envío inválidos");
    expect(() => calculateShipping(5, 0)).toThrow("Parámetros de envío inválidos");
  });
});

