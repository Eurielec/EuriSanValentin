import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({emisor}) => {

    const navigate = useNavigate();

    return (
        <header className="header">
            <Container id="navbar-main" expand="lg">
                <NavbarLogo className="mr-lg-5" to="/" tag={Link}>
                    <img
                        alt="..."
                        //src={require("path/al/logo/de/euri")}
                    />
                </NavbarLogo>
                <Nav className="align-items-center ml-lg-auto" navbar>
                    <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            onClick={ev => navigate("/enviar", {state: {emisor: emisor}})}
                        >
                            <span className="btn-inner--icon">
                                <i className="fa fa-paper-plane" />
                            </span>
                            <span className="ml-1">
                                Enviar Piruletas
                            </span>
                        </Button>
                    </NavItem>
                    <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            onClick={ev => navigate("/comprobar", {state: {emisor: emisor}})}
                        >
                            <span className="btn-inner--icon">
                                <i className="fas fa-candy-cane" />
                            </span>
                            <span className="ml-1">
                                Ver mis Piruletas
                            </span>
                        </Button>
                    </NavItem>
                    <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            onClick={ev => navigate("/validar", {state: {emisor: emisor}})}
                        >
                            <span className="btn-inner--icon">
                                <i className="fas fa-user-tag" />
                            </span>
                            <span className="ml-1">
                                Validar
                            </span>
                        </Button>
                    </NavItem>
                    <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            onClick={ev => navigate("/verpiruletas", {state: {emisor: emisor}})}
                        >
                            <span className="btn-inner--icon">
                                <i className="fas fa-user-tag" />
                            </span>
                            <span className="ml-1">
                                Ver Piruletas
                            </span>
                        </Button>
                    </NavItem>
                </Nav>
            </Container>
        </header>
    )
}

export default Navbar