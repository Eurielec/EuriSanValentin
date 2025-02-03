import {useState} from "react";
import { useRouter } from 'next/router';

function Check() {
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [fullname, setFullname] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: fullname,
      account,
    };

    console.log("DATA", data);

    let response = await fetch("/api/check", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    });

    response = await response.json();

    if (response.has_piruletas) {
      router.push('/piruleta');
    } else {
      router.push('/no_piruleta');
    }

    return response;
  }


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label>Nombre completo</label>
        <p className="input-description">Nombre que hayan podido escribir para referirse a ti (con uno o dos apellidos). Eliminamos ñ, tildes y mayúsculas 😃.</p>
        <input
          className='text-input'
          type="text"
          placeholder={"Santiago Muñoz-Chapuli"}
          value={fullname}
          //onChange={e => setFullname(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))} //Diacritic no soporta undefined
          onChange={e => setFullname((e.target.value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))} 
        />

        <label>Instagram o Twitter</label>
        <p className="input-description">Pon tu Instagram o Twitter en caso de que no se supiesen tu nombre. Todo suma. Trust the plan 😎. </p>
        <input
          className="text-input"
          type="text"
          placeholder="santi_m_21"
          value={account}
          //onChange={e => setAccount(e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))}
          onChange={e => setAccount((e.target.value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
        />

        <div className="input-button-container">
          <input
            className="input-button"
            type="submit"
            value="Submit"
            disabled={account === "" && fullname === ""}
          />
        </div>
      </form>
    </div>
  )
  
}

export default Check;
