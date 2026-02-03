import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });

  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const { data, error } = await supabase.from("piruletas").select("*");
    if (error) throw new Error(error.message);

    const totalItemsSold = data.length;

    const productStats = {};
    data.forEach((sale) => {
      const type = sale.product_type || "desconocido";
      if (!productStats[type]) {
        productStats[type] = { totalQuantity: 0 };
      }
      productStats[type].totalQuantity += 1;
    });

    res.status(200).json({
      totalItemsSold,
      productStats,
      salesData: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}