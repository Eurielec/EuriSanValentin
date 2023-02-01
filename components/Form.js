import { useEffect, useState } from "react";
import Destinatario from "./Destinatario";

function Form(props) {
  const [email, setEmail] = useState("");
  const [personType, setPersonType] = useState("student");
  const [fullname, setFullname] = useState("");
  const [instagram, setInstagram] = useState("");
  //const [group, setGroup] = useState("");
  //const [degree, setDegree] = useState("telecomunications");
  const [message, setMessage] = useState("");
  const [findHint, setFindHint] = useState("");
  const [disable, setDisable] = useState(true);

  const [nPiruletas, setNumberPiruletas] = useState(1);

  const destinatarios = [];
  for (let i = 0; i < nPiruletas; i++) {
    destinatarios.push(
    <Destinatario 
      personType={personType}
      setPersonType={setPersonType}
      fullname={fullname}
      setFullname={setFullname}
      instagram={instagram}
      setInstagram={setInstagram}
      findHint={findHint}
      setFindHint={setFindHint}
      key={i}
      />
    );
  }

  useEffect(() => {

    const isInvalid = () => {
      if (email === "") return true;
      if (personType === "student") return fullname === "" && instagram === "";
      if (personType !== "student") return fullname === "" && findHint === "";
      return true;
    }

    let invalid = isInvalid();

    setDisable(invalid);

  }, [email, personType, fullname, instagram, findHint])

  const handleSubmit = async (e) => {
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
          {/*Destinatario*/}
          
          return <tbody>{destinatarios}</tbody>

          <label>Mensaje</label>
          <p className="input-description">Es tu momento de explayarte. No te olvides de poner &quot;De:&quot; (puede ser anónimo) y &quot;Para:&quot;. Puedes poner lo que quieras. </p>
          <textarea className="text-box" name="message" value={message} cols="40" rows="5" placeholder="Mucho texto." onChange={e => setMessage(e.target.value)}></textarea>
          
          <h2 className="payment-title">Pago</h2>
          <p className="payment-info">Deberás pagar el número de piruletas que hayas enviado.
          <br/><b className="subtitle">Precios:</b>
          <ul className="prices">
            <li>0.3 € / piruleta</li>
            <li>1 € / 4 piruletas</li>
          </ul>

          <br/><b className="subtitle">Horarios (Hall A):</b><br/>
            8, 9 y 10 de 9:00h a 14:30h y de 16:00h a 18:00h

          </p>
          
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
