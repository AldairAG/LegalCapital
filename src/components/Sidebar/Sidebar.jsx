import React, { useState, useEffect } from 'react';
import ControlSidebar from "./js/Sidebar";
import "./Style/Sidebar.css"
import SiderbarNav from "./SiderbarNav"

const Sidebar = (props) => {
    return (
        <div>
            <div className={`barra-lateral ${props.max ? 'mini-barra-lateral' : 'max-barra-lateral'}`} >
                <div className={props.max ? 'headNav' : 'headNavMax'}>
                    <img alt="logo" className={props.max ? 'logoNav' : 'logoNavMax'} />
                </div>
                <SiderbarNav/>
            </div>
        </div>
    )
    /*<div className="menu" onClick={() => controlSidebar.openClose(miniBarraLateral, setMiniBarraLateral)}>{miniBarraLateral ? (<i className="bi bi-list"></i>) : (<i className="bi bi-x-lg"></i>)}
            </div>*/
}

export default Sidebar