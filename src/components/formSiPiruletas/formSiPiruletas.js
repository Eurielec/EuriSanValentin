import { useState } from "react";
import FormSiPiruletasFields from "./formSiPiruletasFields";
import { useSiPiruletas } from "../../hooks";

const FormSiPiruletas = () => {

    const {nombreCompletoOInsta, setNombreCompletoOInsta} = useState({})

    const { hasPiruletas } = useSiPiruletas({ nombreCompletoOInsta })

    return (
        <>
            <FormSiPiruletasFields setNombreCompletoOInsta={setNombreCompletoOInsta}/>

            <div className="result-siPiruletas">
                {
                    hasPiruletas ?
                        <p>¡Enhorabuena! Tienes piruletas esperándote, ve a Euri a recibirlas (A-208-L) :D</p> // TODO: Añadir Cuadro bonito
                        :
                        <p> Lo siento, no tienes piruletas :( </p>
                }
            </div>
        </>


    )

}
export default FormSiPiruletas