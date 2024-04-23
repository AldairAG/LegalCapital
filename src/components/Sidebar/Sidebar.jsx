import React, { useState, useMemo } from 'react';
import ControlSidebar from "./js/Sidebar";
import "./Style/Sidebar.css"
import SiderbarNav from "./SiderbarNav"

const Sidebar = () => {
    const [miniBarraLateral, setMiniBarraLateral] = useState(true);
    const controlSidebar = useMemo(() => new ControlSidebar(), []);

    return (
        <div>
            <div className="menu" onClick={() => controlSidebar.openClose(miniBarraLateral, setMiniBarraLateral)}>{miniBarraLateral ? (<i className="bi bi-list"></i>) : (<i className="bi bi-x-lg"></i>)}
            </div>

            <div className={`barra-lateral ${miniBarraLateral ? 'mini-barra-lateral' : 'max-barra-lateral'}`} >
                <div>
                    <button className="boton" onClick={() => controlSidebar.openClose(miniBarraLateral, setMiniBarraLateral)}>
                        <i className={miniBarraLateral ? "bi bi-arrow-bar-right" : "bi bi-arrow-bar-left"} />
                    </button>
                </div>
                <SiderbarNav />
            </div>
        </div>
    )
}

export default Sidebar