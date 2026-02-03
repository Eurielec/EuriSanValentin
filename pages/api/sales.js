import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  // Verificar el método HTTP
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Verificar la clave de API
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "No autorizado" });
  }

  // console.log("API Key recibida:", apiKey);

  try {
    // Obtener datos de la tabla "piruletas" en lugar de "sales"
    const salesData = await supabase.from("piruletas").select("*");
    if (salesData.error) {
      throw new Error(salesData.error.message);
    }

    // console.log("Datos obtenidos de la tabla 'piruletas':", salesData.data);

    // Continuar con el análisis de datos como antes
    const totalSales = salesData.data.reduce((total, sale) => total + sale.amount, 0);
    const totalItemsSold = salesData.data.reduce((total, sale) => total + sale.quantity, 0);

    // Calcular estadísticas adicionales
    const productStats = {};
    salesData.data.forEach((sale) => {
      if (!productStats[sale.product_type]) {
        productStats[sale.product_type] = {
          totalQuantity: 0,
          totalAmount: 0,
        };
      }
      productStats[sale.product_type].totalQuantity += sale.quantity;
      productStats[sale.product_type].totalAmount += sale.amount;
    });

    // Calcular ingresos totales
    const totalRevenue = salesData.data.reduce((total, sale) => total + sale.amount, 0);

    // Calcular producto más vendido
    const mostSoldProduct = Object.entries(productStats).reduce((max, [product, stats]) => {
      return stats.totalQuantity > max.totalQuantity ? { product, ...stats } : max;
    }, { product: null, totalQuantity: 0, totalAmount: 0 });

    // Incluir estadísticas en la respuesta
    res.status(200).json({
      totalSales,
      totalItemsSold,
      totalRevenue,
      mostSoldProduct,
      productStats,
      salesData: salesData.data,
    });
  } catch (error) {
    console.error("Error al obtener los datos de ventas:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
}