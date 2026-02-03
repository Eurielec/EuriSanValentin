import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getSalesData() {
  try {
    const { data, error } = await supabase.from("sales").select("*");
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching sales data:", err);
    throw err;
  }
}

export async function testSupabaseConnection() {
  try {
    console.log("Probando conexión con Supabase...");
    const { data, error } = await supabase.from("sales").select("*").limit(1);
    if (error) {
      console.error("Error al probar la conexión con Supabase:", error);
      return { success: false, error };
    }
    console.log("Conexión con Supabase exitosa. Datos de prueba:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Error inesperado al probar la conexión con Supabase:", err);
    return { success: false, error: err };
  }
}

export default supabase;