import { useState } from "react"
import { Button } from "../common"

const FormSiPiruletasFields = ({ setNombreCompletoOInsta }) => {

    const [nombreCompleto, setNombreCompleto] = useState("")
    const [instagram, setInstagram] = useState("")

    const handlePiruletas = ({ nombreCompleto, instagram }) => {
        nombreCompleto ? // Check if nombreCompleto is not empty
            setNombreCompletoOInsta(nombreCompleto)
            :
            instagram ? // Check if instagram is not empty
                setNombreCompletoOInsta(instagram)
                :
                setNombreCompletoOInsta("") //Both empty
    }

    return (
        <>
            <input key="nombreCompleto" type="text" name="nombreCompleto" value={nombreCompleto} placeholder="Nombre Completo"
                onChange={ev => setNombreCompleto(ev.target.value)} />
            <input key="instagram" type="text" name="instagram" value={instagram} placeholder="Tu cuenta de Instagram (sin @)"
                onChange={ev => setInstagram(ev.target.value)} />
            <Button onClick={handlePiruletas({ nombreCompleto, instagram })}>
                Comprobar
            </Button>
        </>
    )
}

export default FormSiPiruletasFields