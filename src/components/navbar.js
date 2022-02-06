import React from "react";
import { Link } from "react-router-dom";


class Navbar extends React.Component{
    render(){
        return(
            <>
            <header className="header">
                <Navbar id="navbar-main" expand="lg">
                    <Container>
                        <NavbarLogo className="mr-lg-5" to="/"tag={Link}>
                            <img
                                alt="..."
                                src={require("path/al/logo/de/euri")}                
                            />
                        </NavbarLogo>
                        <Nav className ="align-items-center ml-lg-auto" navbar>
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="no tengo muy claro"
                                >
                                <span className="btn-inner--icon">
                                    <i className="fa fa-paper-plane"/>
                                </span>
                                <span className="ml-1">
                                    Enviar
                                </span>
                                </Button>
                            </NavItem>
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="no tengo muy claro"
                                >
                                <span className="btn-inner--icon">
                                    <i className="fas fa-candy-cane"/>
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
                                href="no tengo muy claro"
                                >
                                <span className="btn-inner--icon">
                                    <i className="fas fa-user-tag"/>
                                </span>
                                <span className="ml-1">
                                    Validar
                                </span>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Container>

                </Navbar>

            </header>



            </>
        )
    }
}