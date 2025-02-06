import { supabase } from "../../utils";

const validateRequest = (body) => {
  const { email, name, message, product_type } = body;

  const emailValidation = email && email.match(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/);
  const nameValidation = name && name.trim().length > 0;  // Nombre obligatorio
  const messageValidation = message && message.trim().length > 0;  // Mensaje obligatorio
  const productValidation = ["piruleta", "chocolate", "piruletaYchocolate"].includes(product_type); 

  return emailValidation && nameValidation && messageValidation && productValidation;
};


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  console.log("Incoming request body:", JSON.stringify(req.body, null, 2));

  if (!Array.isArray(req.body)) {
    console.error("Error: La solicitud debe ser un array de productos.");
    return res.status(400).json({ error: "Solicitud no válida. Debe ser un array de productos (piruletas o chocolates)." });
  }

  if (!req.body.every(validateRequest)) {
    console.error("Error: Validación fallida en algunos elementos.");
    return res.status(400).json({ error: "Algunos datos de la solicitud no son válidos." });
  }

  try {
    const { data, error } = await supabase
      .from('piruletas') 
      .insert(req.body, { returning: "minimal" });// So it doesn't perform a select after it finishes
    if (error) {
      console.error("Insert Error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Productos enviados con éxito" });

  } catch (err) {
    console.error("Unexpected Server Error:", err);
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
}
