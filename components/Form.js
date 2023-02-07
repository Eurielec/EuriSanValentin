import { useEffect, useState } from "react";
import Destinatario from "./Destinatario";

function Form(props) {
  const [email, setEmail] = useState("");
  const [nPiruletas, setNumberPiruletas] = useState(1);
  const [piruletas, setPiruletas] = useState({
    "0": {
      personType:"", 
      fullname:"", 
      instagram:"", 
      group:"", 
      degree:"", 
      message:"", 
      findHint:""
    }
  })
  const [disable, setDisable] = useState(true);

  useEffect(() => {

    const isInvalid = ({fullname, personType, instagram, findHint}) => {
      if (personType === "student") return fullname === "" && instagram === "";
      if (personType !== "student") return fullname === "" && findHint === "";
      return true;
    }
    
    // Checks if any lollipop is invalid
    let invalid = Object.keys(piruletas).map(k => isInvalid({...piruletas[k]})).some(i => i === true);

    setDisable(invalid);

  }, [email, piruletas, nPiruletas]);

  useEffect(() => {
    // TODO: añadir piruletas al diccionario o quitarlos si hace falta
  }, [nPiruletas]);

  const handleSubmit = async (e, {email, personType, name, account, group, message, degree, findHint}) => {
    e.preventDefault();
    let data = {
      email: email.trim(),
      personType,
      name: fullname.trim(),
      account: instagram.trim().replace("@", ""),
      group: group.trim(),
      message,
      degree,
      findHint: findHint.trim()
    };

    // console.log("DATA", data);

    let response = await fetch("/api/send", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    });

    if (response.ok) {
      props.setParentMessage(message);
      alert("Hemos recibido tu piruleta!");
    }
    
    return response;
  }

  return (
    <div className="form-container">
        {
            // Instagram, email or something
        }
        <form onSubmit={handleSubmit} className="form">
          <h2>Sobre ti</h2>
          <div className="section">
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
            />
            <label>¿Cuántas piruletas quieres mandar?</label>
            <p className="input-description">¡Ahora puedes enviar múltiples piruletas de una!</p>
            <select
                required
                name="piruleta-number"
                id="type"
                className="selector"
                onChange={e => setNumberPiruletas(e.target.value)}
                value={nPiruletas}
              >
                {[...Array(5).keys()].map((index) => {
                  return <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                })}
            </select>
          </div>
          {
            [...Array(parseInt(nPiruletas)).keys()].map(i =>
              <>
                <h2>Sobre el destinatario {i+1}</h2>
                <Destinatario index={i} piruletas={piruletas} setPiruletas={setPiruletas}/>
              </>
            )
          }
          
          
          <h2>Pago</h2>
          <div className="section">
            <p className="payment-info">Deberás pagar el número de piruletas que hayas enviado.
            <br/><b className="subtitle">Precios:</b>
            <ul className="prices">
              <li>0.3 € / piruleta</li>
              <li>1 € / 4 piruletas</li>
            </ul>

            <br/><b className="subtitle">Horarios (Hall A):</b><br/>
              8, 9 y 10 de 9:00h a 14:30h y de 16:00h a 18:00h

            </p>
          </div>
          
          <div className="input-button-container">
            <input
              className="input-button"
              type="submit"
              value="Submit"
              disabled={disable}
            />
          </div>
      </form>
    </div>

    
  );
}

export default Form;
