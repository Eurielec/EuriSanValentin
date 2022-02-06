import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/App.css';
import {Login, Layout, FormEnviar, FormSiPiruletas, FormValidar, VerPiruletas} from "./components";

function App() {
    return (
        <div className="App">
            <Loading>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Login/>}/>
                            <Route path="/enviar/:emisor" element={<FormEnviar/>}/>
                            <Route path="/comprobar" element={<FormSiPiruletas/>}/>
                            <Route path="/validar/:emisor" element={<FormValidar/>}/>
                            <Route path="/verpiruletas/:emisor" element={<VerPiruletas/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Loading>
        </div>
    );
}

export default App;
