import { useNavigate } from "react-router-dom"

const NavbarLogo = ({emisor}) => {
const navigate = useNavigate()

    return (
        <div className="logo-euri">
                <img
                    alt="Eurielec"
                    //src={require("")}
                    onClick={()=>navigate("/enviar", {state: {emisor: emisor}})}
                />

        </div>
    )
}

export default NavbarLogo