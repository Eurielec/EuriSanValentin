import { useEffect, useState } from "react";

function Form(props) {
  const [email, setEmail] = useState("");
  const [senderAccount, setSenderAccount] = useState(""); 
  const [productType, setProductType] = useState("piruleta");
  const [productCount, setProductCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [chocolatesLeft, setChocolatesLeft] = useState(null);
  const STOCK_TOTAL = 108;

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
    setDisable(
      email.trim() === "" || 
      products.some(p => 
        p.fullname.trim() === "" ||
        p.message.trim() === "" ||
        ((p.personType === "teacher" || p.personType === "pas") && p.findHint.trim() === "")
      )
    );
  }, [email, senderAccount, products]);

  useEffect(() => {
    async function fetchStock() {
      try {
        document.querySelector('.form-container').classList.add('loading');
        const data = await fetch('/api/stock').then(res => res.json());
        //const data = { sold: 108 };  //testing sold out
        setChocolatesLeft(STOCK_TOTAL - data.sold);
      } catch (e) {
        console.error("Error cargando stock", e);
      } finally {
        document.querySelector('.form-container').classList.remove('loading');
      }
    }
    fetchStock();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productType === "chocolate" && chocolatesLeft <= 0) {
      alert("Lo sentimos, los chocolates están agotados. Por favor, elige otro producto.");
      return;
    }

    let data = products.map(product => ({
      product_type: productType,
      email: email.trim(),
      sender_account: senderAccount.trim().replace("@", ""), 
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
      {chocolatesLeft !== null && (
          <div className={`stock-info ${chocolatesLeft < 20 ? 'low-stock' : ''}`}>
            <span className="status-dot"></span>
              <span>
                {chocolatesLeft > 0 
                    ? `Nos quedan: ${chocolatesLeft} chocolates` 
                    : "Chocolates agotados (Solo piruletas)"}
                </span>
            </div>
  )}
        <select
          className="selector"
          value={productType}
          onChange={e => setProductType(e.target.value)}
        >
          <option value="piruleta">Piruletas</option>
          {chocolatesLeft > 0 && <option value="chocolate">Chocolates</option>}
          {chocolatesLeft > 0 && <option value="piruletaYchocolate">Piruleta + Chocolate</option>}
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
          pattern=".*@.*\.upm\.es$"
          maxLength={60}
        />

        <label>Tu Instagram (Opcional)</label>
        <p className="input-description">
            Si quieres participar en los <b>sorteos de los sponsors</b>, déjanos tu Instagram. 
            Si lo dejas vacío, no participarás.
        </p>
        <input
          className="text-input"
          type="text"
          placeholder="@tu_usuario"
          value={senderAccount}
          onChange={e => setSenderAccount(e.target.value)}
          maxLength={30}
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
          ? 'Si sabes el nombre completo, genial. Eliminamos ñ y tildes.'
          : 'Nombre por el que se le conozca.'
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
              <p className="input-description">Despacho, hora y lugar donde va a dar clase o sitio de la universidad donde podamos encontrarle fácilmente. Cuanto más preciso seas, más fácil será para nosotros encontrarle. Si no especificas despacho Y clase no podremos garantizar el reparto</p>
              <input
                className="text-input"
                type="text"
                placeholder="C-407.2; A134"
                value={product.findHint}
                onChange={e => handleProductChange(index, "findHint", e.target.value)}
                required
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
            9, 10 y 11 de 9:00h a 17:00h

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
