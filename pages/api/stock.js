import { supabase } from "../../utils";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  try {
    // Contamos cuántos registros tienen chocolate (o piruletaYchocolate)
    // Usamos .or para contar ambos tipos si el chocolate está incluido
    const { count, error } = await supabase
      .from('piruletas')
      .select('*', { count: 'exact', head: true })
      .or('product_type.eq.chocolate,product_type.eq.piruletaYchocolate');

    if (error) throw error;

    // Retornamos el número de chocolates vendidos
    return res.status(200).json({ sold: count || 0 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}