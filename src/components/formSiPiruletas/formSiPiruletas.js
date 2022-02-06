import { useState } from "react";
import FormSiPiruletasBody from "./formSiPiruletasBody";
import FormSiPiruletasFields from "./formSiPiruletasFields";
import { useSiPiruletas } from "../../hooks";

const FormSiPiruletas = () => {

    const {nombreCompletoOInsta, setNombreCompletoOInsta} = useState({})

    const { hasPiruletas, piruletas } = useSiPiruletas({ nombreCompletoOInsta })

    return (
        <>
            <FormSiPiruletasFields setNombreCompletoOInsta={setNombreCompletoOInsta}/>

            <div className="result-siPiruletas">
                {
                    hasPiruletas ?
                        <FormSiPiruletasBody piruletas={piruletas} />
                        :
                        <p> Lo siento, no tienes piruletas :( </p>
                }
            </div>
        </>


    )

}
export default FormSiPiruletas