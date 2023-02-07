import { useEffect, useState } from "react";

function Destinatario(props) {

    const [personType, setPersonType] = useState("student");
    const [fullname, setFullname] = useState("");
    const [instagram, setInstagram] = useState("");
    const [group, setGroup] = useState("");
    const [degree, setDegree] = useState("telecomunications");
    const [message, setMessage] = useState("");
    const [findHint, setFindHint] = useState("");


    useEffect(() => {
        let _piruletas = props.piruletas;
        _piruletas[props.index] = {
            personType, fullname, instagram, group, degree, message, findHint
        }
        console.log(_piruletas);
        props.setPiruletas(_piruletas)
      }, [personType, fullname, instagram, group, degree, message, findHint])

    return (
        <div className="section">
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
          </div>
    )

}

export default Destinatario;