import { Outlet } from "react-router-dom";
import { Navbar } from ".";
import { useLocation } from "react-router-dom";

const Layout = () => {
    const { state } = useLocation();
    const { emisor } = state;
    return (
        <>
            <Navbar emisor={emisor}/>
            <Outlet />
        </>
    );
}

export default Layout;