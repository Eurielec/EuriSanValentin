import { Outlet } from "react-router-dom";
import { NavBar } from ".";


const Layout = () => {
    const { state } = useLocation();
    const { emisor } = state;
    return (
        <>
            <NavBar emisor={emisor}/>
            <Outlet />
        </>
    );
}

export default Layout;