import { Piruletas } from "../components";

function Piruleta() {
  return <div className="piruletas-result-container">
    <Piruletas />
    <div className="message-container">
        <h2>¡Hay piruleta/s para tí!</h2>
        <p>¿Cuántas? ª</p>
        <p>Las repartiremos el viernes 13 y lunes 16 por las clases. Si por algún motivo no te pillamos en clase, puedes ir a recogerla/s a Eurielec (208-L). ¡Recuerda llevar identificación!</p>
    </div>
  </div>
}

export default Piruleta;