import { useEffect, useState } from "react";

function Form(props) {
  const [email, setEmail] = useState("");
  const [personType, setPersonType] = useState("student");
  const [fullname, setFullname] = useState("");
  const [instagram, setInstagram] = useState("");
  const [group, setGroup] = useState("");
  const [degree, setDegree] = useState("telecomunications");
  const [message, setMessage] = useState("");
  const [findHint, setFindHint] = useState("");
  const [disable, setDisable] = useState(true);

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
          <h2>Sobre el destinatario</h2>
          <label>Estudiante, profesor o PAS?</label>
          <p className="input-description">Mandas la piruleta a un estudiante, un profesor o personal no docente (pecera, secretaría, Quique...)?</p>
          <select
              required
              name="person-type"
              id="type"
              className="selector"
              onChange={e => setPersonType(e.target.value)}
              value={personType}
            >
                <option key={1} value="student">
                  Estudiante
                </option>
                <option key={2} value="teacher">
                  Profesor
                </option>
                <option key={3} value="pas">
                  PAS
                </option>
            </select>
          <label>Nombre completo</label>
          <p className="input-description">{
          personType === "student"
          ? 'Si sabes el nombre completo, genial. Eliminamos ñ y tildes 😃.'
          : 'Nombre por el que se le conozca 🧐.'
          }</p>
          <input
            className='text-input'
            type="text"
            placeholder={personType === "student" ? "Santiago Muñoz-Chapuli Díaz-Mero" : "Grajal"}
            value={fullname}
            onChange={e => setFullname(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))}
          />
          { personType !== "student" ? (
            <>
            <label>¿Dónde buscamos?</label>
          <p className="input-description">Despacho o sitio de la universidad donde podamos encontrarle fácilmente.</p>
          <input
            className="text-input"
            type="text"
            placeholder={"C-407.2"}
            value={findHint}
            onChange={e => setFindHint(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))}
          />
            </>
          ) : null}
          { personType === "student" ? (
            <>
            <label>Instagram o Twitter</label>
          <p className="input-description">Si no te sabes el nombre, puedes darnos el Instagram o el Twitter. Todo suma. Trust the plan 😎. </p>
          <input
            className="text-input"
            type="text"
            placeholder="santi_m_21"
            value={instagram}
            onChange={e => setInstagram(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))}
          />
          <label>¿Qué estudia?</label>
          <p className="input-description">Nivel experto, ¿sabes qué estudia?</p>
          <select
              required
              name="degree"
              id="degree"
              className="selector"
              onChange={e => setDegree(e.target.value)}
              value={degree}
            >
              
                <option key={1} value="telecommunications">
                  Telecomunicación
                </option>
                <option key={2} value="biomedicine">
                  Biomédica
                </option>
                <option key={3} value="data">
                  Datos
                </option>
                <option key={4} value="muit">
                  MUIT
                </option>
                <option key={5} value="other">
                  Otro
                </option>
            </select>
          <label>Grupo/s</label>
          <p className="input-description">Sería espectacular si sabes a qué grupo/s va. </p>
          <input
            className="text-input"
            type="text"
            placeholder="43.2"
            value={group}
            onChange={e => setGroup(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))}
          />
            </>
          ) : null
          }
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
