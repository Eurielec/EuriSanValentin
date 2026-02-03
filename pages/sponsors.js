import Image from "next/image";

const prizes = [
  {
    sponsor: "Kreta Frozen Yogurt",
    reward: 'Cita Dulce (x3)',
    desc: "Vales para 2 personas",
    logo: "/assets/sponsors/kreta.png",
  },
  {
    sponsor: "Alfredo's Pasta",
    reward: 'Cita Italiana (x5)',
    desc: "Vales para 2 personas",
    logo: "/assets/sponsors/alfredos.png",
  },
  {
    sponsor: "EXIT Madrid",
    reward: 'Bono Street Escape',
    desc: "Aventura urbana para 4 personas",
    logo: "/assets/sponsors/exit.png",
  },
  {
    sponsor: "EXIT Madrid",
    reward: 'Juego de Mesa EXIT',
    desc: 'Edición "La Mansión Siniestra"',
    logo: "/assets/sponsors/exit.png",
  },
  {
    sponsor: "104studio",
    reward: 'Nails Set',
    desc: "",
    logo: "/assets/sponsors/104studio.png",
  },
];

function Sponsors() {
  return (
    <div className="polaroid-page">
      <div className="title-section">
        <p>¡Participa y llévate un recuerdo inolvidable!</p>
      </div>

      {/* --- NUEVO APARTADO DE CONDICIONES --- */}
      <div className="rules-container">
        <h2 className="rules-title"> ¿Cómo participar?</h2>
        <ul className="rules-list">
          <li>
            <strong>Compra mínima:</strong> Debes enviar al menos 1 piruleta o chocolate.
          </li>
          <li>
            <strong>Síguenos en Instagram:</strong> 
            <br/>
            {/* Ajusta las cuentas aquí según necesites */}
            <span className="accounts">
              <a href="https://instagram.com/eesteclcmadrid" target="_blank" rel="noopener noreferrer">@eesteclcmadrid</a> • 
              <a href="https://instagram.com/104stud.io" target="_blank" rel="noopener noreferrer">@104stud.io</a> • 
              <a href="https://instagram.com/kreta_frozenyogurt" target="_blank" rel="noopener noreferrer">@kreta_frozenyogurt</a>
            </span>
          </li>
        </ul>
        <p className="rules-note">¡Cada producto comprado es una participación extra!</p>
      </div>
      {/* -------------------------------------- */}

      <div className="polaroid-gallery">
        {prizes.map((p, index) => (
          <div key={index} className="polaroid-frame">
            <div className="tape"></div>
            
            <div className="photo-area">
              <Image 
                src={p.logo} 
                alt={p.sponsor} 
                width={200}
                height={200}
                objectFit="contain"
                className="sponsor-img"
              />
            </div>
            
            <div className="caption-area">
              <h3 className="handwritten-title">{p.reward}</h3>
              <p className="small-desc">{p.sponsor}</p>
              <p className="small-detail">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-info">
        <h3>Resolución del Sorteo</h3>
        <p>Los ganadores se anunciarán en nuestro instagram durante los <strong>días de reparto</strong>.</p>
        
        <div className="pdf-container">
          <p className="small-text">¿Quieres saber más detalles?</p>
          {/* Asegúrate de cambiar la ruta al nombre real de tu archivo PDF */}
          <a href="/assets/bases_sorteo.pdf" target="_blank" rel="noopener noreferrer" className="pdf-button">
            Ver Bases Legales (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;