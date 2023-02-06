import { useState, useEffect } from "react";

function Destinatario(props) {

    //const [personType, setPersonType] = useState("student");
    //const [fullname, setFullname] = useState("");
    //const [instagram, setInstagram] = useState("");
    //const [group, setGroup] = useState("");
    //const [degree, setDegree] = useState("telecomunications");
    //const [findHint, setFindHint] = useState("");

    return (
        <div className="destinatario-container">
        <h2>Sobre el destinatario</h2>
        <label>Estudiante, profesor o PAS?</label>
        <p className="input-description">Mandas la piruleta a un estudiante, un profesor o personal no docente (pecera, secretaría, Quique...)?</p>
        <select
            required
            name="person-type"
            id="type"
            className="selector"
            onChange={e => props.personType = e.target.value}
            value={props.personType}
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
        props.personType === "student"
        ? 'Si sabes el nombre completo, genial. Eliminamos ñ y tildes 😃.'
        : 'Nombre por el que se le conozca 🧐.'
        }</p>
        <input
          className='text-input'
          type="text"
          placeholder={props.personType === "student" ? "Jaime Vicente Conde" : "Villagrá"}
          value={props.fullname}
          onChange={e => props.fullname = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}
        />
        { props.personType !== "student" ? (
          <>
          <label>¿Dónde buscamos?</label>
        <p className="input-description">Despacho o sitio de la universidad donde podamos encontrarle fácilmente.</p>
        <input
          className="text-input"
          type="text"
          placeholder={"C-407.2"}
          value={props.findHint}
          onChange={e => props.findHint = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}
        />
          </>
        ) : null}
        { props.personType === "student" ? (
          <>
          <label>Instagram o Twitter</label>
        <p className="input-description">Si no te sabes el nombre, puedes darnos el Instagram o el Twitter. Todo suma. Trust the plan 😎. </p>
        <input
          className="text-input"
          type="text"
          placeholder="jamesvicen"
          value={props.instagram}
          onChange={e => props.instagram = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}
        />
        <label>¿Qué estudia?</label>
        <p className="input-description">Nivel experto, ¿sabes qué estudia?</p>
        <select
            required
            name="degree"
            id="degree"
            className="selector"
            onChange={e => props.degree = e.target.value}
            value={props.degree}
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
          placeholder="35.2"
          value={props.group}
          onChange={e => props.group = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")}
        />
          </>
        ) : null
        }
        </div>

    );
}

export default Destinatario;