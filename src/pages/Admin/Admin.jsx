import React from 'react';
import { useState, useEffect } from 'react';
import "./Admin.css"
import AdminData from "./AdminData.js"


const Admin = () => {
    const [userModels, setUserModels] = useState([]);
    const [textFind, setTextFind] = useState("");
    const adminData = new AdminData(setUserModels);

    const baseURL = "https://legalcapital-corp.com/register/";
    const rValue = "LegalCapitalMaster";
    const completeURL = `${baseURL}${rValue}`;

    useEffect(() => {
        const adminData = new AdminData(setUserModels);
        adminData.fetchData();
    }, []);

    const handleCopy = () => {
        const inputElement = document.getElementById("invitationLink");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };


    return (
        <div className="mainAdmin">

            <div className="header">
                <img className="logo" alt="logo"/>

                <div className="contain-link">
                    <span>Invitation Link:</span>

                    <div className="link">
                        <input id='invitationLink' type="text" value={completeURL} readOnly/>
                        <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                    </div>

                </div>

            </div>

            <div className="ops">
                <button>Gestionar<br />admnistradores</button>
                <button>Gestionar<br />usuarios</button>
                <button>Aprobar<br />membresias</button>
            </div>
            <div className="tabla">
                <div className="encabezado">
                    <h2>Membresías pendientes</h2>
                    <div className="buscador">
                        <input type="text" placeholder="Buscar por E-mail..." onChange={(e) => setTextFind(e.target.value)} />
                        <button onClick={() => adminData.findData(textFind)}><i class="bi bi-search"></i></button>
                    </div>
                    <button onClick={() => adminData.fetchData()} className="refresh" ><i class="bi bi-arrow-counterclockwise"></i></button>
                </div>
                <li>
                    <span className="column-header">Nombre de usuario</span>
                    <span className="column-header">E-mail</span>
                    <span className="column-header">Cantidad</span>
                    <span className="column-header">Vigencia</span>
                    <span className="column-header">Aprobar</span>
                </li>
                <div className="datos">
                    <ul>
                        {userModels.map((item, index) => (
                            <li key={index}>
                                <span>{item.userName}</span>
                                <span>{item.email}</span>
                                <span>{item.request}</span>
                                <span>{item.validity}</span>
                                <div className="aprobar">
                                    <button onClick={() => adminData.updateUser(item.firebaseKey)} className="check"><i class="bi bi-check-circle-fill" /></button>
                                    <button onClick={() => adminData.updateRequest(item.firebaseKey)} className="trash"><i class="bi bi-x-circle-fill" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Admin