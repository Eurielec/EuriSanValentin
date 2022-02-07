import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "./navbarLogo";

const Navbar = ({ emisor }) => {

    const navigate = useNavigate();

    return (
        <header className="navbar">

            <NavbarLogo emisor={emisor} />

            <ul className="align-items-center ml-lg-auto">
                <li className="d-none d-lg-block ml-lg-4">
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={ev => navigate("/enviar", { state: { emisor: emisor } })}
                    >
                        <span className="btn-inner--icon">
                            <i className="fa fa-paper-plane" />
                        </span>
                        <span className="ml-1">
                            Enviar Piruletas
                        </span>
                    </button>
                </li>
                <li className="d-none d-lg-block ml-lg-4">
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={ev => navigate("/comprobar", { state: { emisor: emisor } })}
                    >
                        <span className="btn-inner--icon">
                            <i className="fas fa-candy-cane" />
                        </span>
                        <span className="ml-1">
                            Ver mis Piruletas
                        </span>
                    </button>
                </li>
                <li className="d-none d-lg-block ml-lg-4">
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={ev => navigate("/validar", { state: { emisor: emisor } })}
                    >
                        <span className="btn-inner--icon">
                            <i className="fas fa-user-tag" />
                        </span>
                        <span className="ml-1">
                            Validar
                        </span>
                    </button>
                </li>
                <li className="d-none d-lg-block ml-lg-4">
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={ev => navigate("/verpiruletas", { state: { emisor: emisor } })}
                    >
                        <span className="btn-inner--icon">
                            <i className="fas fa-user-tag" />
                        </span>
                        <span className="ml-1">
                            Ver Piruletas
                        </span>
                    </button>
                </li>
            </ul>
        </header>
    )
}

export default Navbar