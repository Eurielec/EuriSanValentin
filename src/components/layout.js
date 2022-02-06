import { Outlet } from "react-router-dom";
import { NavBar } from ".";


const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Layout;