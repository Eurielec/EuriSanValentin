import { useEffect, useState } from "react";

function Form(props) {
  const [email, setEmail] = useState("");
  const [productType, setProductType] = useState("piruleta");
  const [productCount, setProductCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setProducts(
      Array.from({ length: productCount }, () => ({
        personType: "student",
        fullname: "",
        instagram: "",
        group: "",
        degree: "telecommunications",
        message: "",
        findHint: ""
      }))
    );
  }, [productCount]);

  useEffect(() => {
    setDisable(email === "" || products.some(p => p.fullname === "" && p.instagram === "" && p.findHint === ""));
  }, [email, products]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let data = products.map(product => ({
      product_type: productType,
      email: email.trim(),
      person_type: product.personType,
      name: product.fullname.trim(),
      account: product.instagram.trim().replace("@", ""),
      group: product.group.trim(),
      message: product.message,
      degree: product.degree,
      find_hint: product.findHint.trim()
    }));
  
    // console.log("DATA", data);
  
    let response = await fetch("/api/send", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      props.setParentMessage(data.map(p => p.message))
      props.setParentProducts(data);
      alert("Hemos recibido tu pedido!");
    } 
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>¿Qué quieres enviar?</h2>
        <select
          className="selector"
          value={productType}
          onChange={e => setProductType(e.target.value)}
        >
          <option value="piruleta">Piruletas</option>
          <option value="chocolate">Chocolates</option>
          <option value="piruletaYchocolate">Piruleta + Chocolate</option>
        </select>

        <h2>Sobre tí</h2>
        <label>Email</label>
        <p className="input-description">Para contactar contigo en caso de duda. También para ver si has pagado la piruleta/s que envíes.</p>
        <input
          required
          className="text-input"
          type="text"
          placeholder="email@alumnos.upm.es"
          value={email}
          onChange={e => setEmail(e.target.value.toLowerCase())}
          pattern=".*@(?:alumnos.upm.es|upm.es|.*.upm.es)$"
          maxLength={60}
        />
        
        <label>Número de {productType}s que quieras enviar</label>
        <select
          className="selector"
          value={productCount}
          onChange={e => setProductCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <h2>Sobre el destinatario</h2>

        {products.map((product, index) => (
          <div key={index} className="piruleta-form">
            <h2>{productType.charAt(0).toUpperCase() + productType.slice(1)} {index + 1}</h2>
            <label>Estudiante, profesor o PAS?</label>
            <p className="input-description">Mandas la piruleta a un estudiante, un profesor o personal no docente (pecera, secretaría, Quique...)?</p>
            <select
              required
              name={`personType-${index}`}
              id="type"
              className="selector"
              onChange={e => handleProductChange(index, "personType", e.target.value)}
              value={product.personType}
            >
               <option value="student">
                  Estudiante
                </option>
                <option value="teacher">
                  Profesor
                </option>
                <option value="pas">
                  PAS
                </option>
            </select>
            <label>Nombre completo</label>
            <p className="input-description">{
          product.personType === "student"
          ? 'Si sabes el nombre completo, genial. Eliminamos ñ y tildes 😃.'
          : 'Nombre por el que se le conozca 🧐.'
          }</p>
            <input
              className="text-input"
              type="text"
              placeholder={product.personType === "student" ? "Santiago Muñoz-Chapuli Díaz-Mero" : "Grajal"}
              value={product.fullname}
              onChange={e => handleProductChange(index, "fullname", e.target.value)}
              maxLength={40}
            />
            {product.personType === "student" ? (
              <>
              <label>Instagram o Twitter</label>
              <p className="input-description">Si no te sabes el nombre, puedes darnos el Instagram o el Twitter. Todo suma. Trust the plan 😎. </p>
              <input
                className="text-input"
                type="text"
                placeholder="santi_m_21"
                value={product.instagram}
                onChange={e => handleProductChange(index, "instagram", e.target.value)}
                maxLength={30}
              />
              <label>¿Qué estudia?</label>
              <select
                required
                name={`degree-${index}`}
                className="selector"
                onChange={e => handleProductChange(index, "degree", e.target.value)}
                value={product.degree}
              >
               <option value="telecommunications">
                  Telecomunicación
                </option>
                <option value="biomedicine">
                  Biomédica
                </option>
                <option value="data">
                  Datos
                </option>
                <option value="muit">
                  MUIT
                </option>
                <option value="other">
                  Otro
                </option>              
              </select>
              <label>Grupo/s</label>
              <p className="input-description">Sería espectacular si sabes a qué grupo/s va. </p>
              <input
                className="text-input"
                type="text"
                placeholder="43.2"
                value={product.group}
                onChange={e => handleProductChange(index, "group", e.target.value)}
                maxLength={10}
              />
              </>
            ) : (
              <>
              <label>¿Dónde buscamos?</label>
              <p className="input-description">Despacho o sitio de la universidad donde podamos encontrarle fácilmente.</p>
              <input
                className="text-input"
                type="text"
                placeholder="C-407.2"
                value={product.findHint}
                onChange={e => handleProductChange(index, "findHint", e.target.value)}
                maxLength={50}
              />
              </>
            )}
            <label>Mensaje</label>
            <p className="input-description">Es tu momento de explayarte. No te olvides de poner &quot;De:&quot; (puede ser anónimo) y &quot;Para:&quot;. Puedes poner lo que quieras. </p>
            <textarea
              className="text-box"
              name={`message-${index}`}
              value={product.message}
              cols="40"
              rows="5"
              placeholder="Mucho texto."
              onChange={e => handleProductChange(index, "message", e.target.value)}
              maxLength={200}
            ></textarea>
            
          </div>
        ))}
        <h2 className="payment-title">Pago</h2>
          <p className="payment-info">Deberás pagar el número de piruletas y/o chocolates que hayas enviado.
          <br/><b className="subtitle">Precios:</b>
          <ul className="prices">
            <li>0.4 € / piruleta</li>
            <li>1 € / 3 piruletas</li>
            <li>0.80 € / chocolate</li>
            <li>1 € / piruleta y chocolate</li>
          </ul>

          <br/><b className="subtitle">Horarios (Hall A):</b><br/>
            7, 10 y 11 de 9:00h a 17:00h

          </p>

        <div className="input-button-container">
          <input
            className="input-button"
            type="submit"
            value="Enviar"
            disabled={disable}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
