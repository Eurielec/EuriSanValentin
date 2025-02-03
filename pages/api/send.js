import { supabase } from "../../utils";

const validateRequest = (body) => {
  const { email, person_type, name, account, message, group, degree, find_hint, product_type } = body;

  const emailValidation = email && email.match(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/);
  const lengthValidation = Object.values(body).every(elem => typeof elem === "string" ? elem.length < 1000 : true);
  const typeValidation = ["student", "teacher", "pas"].includes(person_type);
  const studentValidation = !(person_type === "student" && (!degree || degree.trim() === ""));
  const teacherValidation = !(person_type !== "student" && (!find_hint || find_hint.trim() === ""));
  const nameValidation = !(name === undefined && account === undefined);
  const productValidation = ["piruleta", "chocolate", "piruletaYchocolate"].includes(product_type); // <-- Validar el tipo de producto

  return emailValidation && lengthValidation && typeValidation && studentValidation && teacherValidation && nameValidation && productValidation;
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
