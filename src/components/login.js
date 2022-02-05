import {React, useState} from "react"

import {Link} from "react-router-dom";

const Login = () => {

    const [emisor, setEmisor] = useState("")

    return(
        <nav>
            <ul>
                <li>
                    <input key="emisor" type="string" name="emisor" value={emisor} placeholder="Escribe tu correo de la UPM"
                            onChange={ev => setEmisor(ev.target.value)}/>
                </li>

                <td><Link to={`/home/${emisor}`}>Entrar</Link></td>
            </ul>
        </nav>)
};

export default Login;
