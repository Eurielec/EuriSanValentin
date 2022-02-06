import { React, useState } from "react"
import { useNavigate } from "react-router-dom";

import { Button } from "./common"; 

const Login = () => {

    const [emisor, setEmisor] = useState("")

    const navigate = useNavigate();

    return (
        <section>
            <input key="emisor" type="string" name="emisor" value={emisor} placeholder="Escribe tu correo de la UPM"
                onChange={ev => setEmisor(ev.target.value)} />

            <Button onClick={navigate("/enviar", {state: {emisor: emisor}})}>
                Enviar
            </Button>
        </section>)
};

export default Login;
