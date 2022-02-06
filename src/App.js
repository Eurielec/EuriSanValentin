import { BrowserRouter, Routes, Route } from "react-router-dom";

import './css/App.css';
import {Login, Layout, FormEnviar, FormSiPiruletas, FormValidar, VerPiruletas} from "./components";

function App() {
    return (
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Login/>}/>
                            <Route path="enviar" element={<FormEnviar/>}/>
                            <Route path="comprobar" element={<FormSiPiruletas/>}/>
                            <Route path="validar" element={<FormValidar/>}/>
                            <Route path="verpiruletas" element={<VerPiruletas/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
        </div>
    );
}

export default App;
