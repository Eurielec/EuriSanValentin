import Link from "next/link";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link href="/">
          <a className="logo-text">San Valentín</a>
        </Link>
      </div>

      {/*zona dcha del navbar*/}
      <div className="right-menu">
        <Link href="/send">
            <a className="nav-link">Enviar</a>
        </Link>
        
        <Link href="/check">
            <a className="nav-link">Comprobar</a>
        </Link>
        
        <Link href="/sponsors">
            <a className="nav-link">Sorteo</a>
        </Link>

        <Link href="https://www.instagram.com/eesteclcmadrid">
            <a className="nav-link" target="_blank" rel="noopener noreferrer">Contacto</a>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;