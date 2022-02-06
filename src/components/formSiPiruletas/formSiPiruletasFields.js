import { useState } from "react"

const FormSiPiruletasFields = ({ setNombreCompletoOInsta }) => {

    const [nombreCompleto, setNombreCompleto] = useState("")
    const [instagram, setInstagram] = useState("")

    const handlePiruletas = ({ nombreCompleto, instagram }) => {
        nombreCompleto ?
            setNombreCompletoOInsta({ nombreCompleto: true, instagram: false, receptor: nombreCompleto })
            :
            instagram ?
                setNombreCompletoOInsta({ nombreCompleto: false, instagram: true, receptor: instagram })

                :
                setNombreCompletoOInsta({ nombreCompleto: false, instagram: false, receptor: "" })
    }

    return (
        <>
            <input key="nombreCompleto" type="text" name="nombreCompleto" value={nombreCompleto} placeholder="Nombre Completo"
                onChange={ev => setNombreCompleto(ev.target.value)} />
            <input key="instagram" type="text" name="instagram" value={instagram} placeholder="Tu cuenta de Instagram (sin @)"
                onChange={ev => setInstagram(ev.target.value)} />
            <Button onClick={ev => handlePiruletas({ nombreCompleto, instagram })}>
                Comprobar
            </Button>
        </>
    )
}

export default FormSiPiruletasFields