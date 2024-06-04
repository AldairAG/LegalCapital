import React from 'react';
import { useState, useEffect } from 'react';
import "./Admin.css"
import CopyLink from "../../components/CopiLink/CopyLink.jsx"
import AdminData from "./AdminData.js"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton/LogoutButton.jsx';
import UserLista from '../../components/UserList/UserLista.jsx';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const [userModels, setUserModels] = useState([]);
    const [textFind, setTextFind] = useState("");
    const adminData = new AdminData(setUserModels);
    const history = useHistory();

    useEffect(() => {
        const adminData = new AdminData(setUserModels);
        adminData.fetchData();
    }, []);

    const handleClick = (num) => {
        if (num == 1) {
            history.push('/admin');
        } else if (num == 2) {
            history.push('/admin/gestionar-ususarios');
        } else if (num == 3) {
            history.push('/admin');
        }
    }

    return (
        <div className="mainAdmin">
            <header>
                <div className="logo"><img alt="logo" /></div>
                <div className='cs' ><LogoutButton /></div>

            </header>
            <div className="ops">
                <button onClick={() => handleClick(1)}>Gestionar<br />historial</button>
                <button onClick={() => handleClick(2)}>Gestionar<br />usuarios</button>
                <button onClick={() => handleClick(3)}>Aprobar<br />pagos</button>
            </div>
            <div className="linkC">
                <CopyLink username={"Administrador"} />
            </div>
            <div className="contenido-A">
                
                <Switch>
                    <Route path="/admin/gestionar-ususarios" component={UserList} />
                    <Route path="/admin" component={Tabla} />
                </Switch>
            </div>
        </div>
    )

    function UserList() {
        return (
            <>
                <UserLista/>
            </>
        );
    }

    function Tabla() {
        return (
            <>
                <div className="tabla">
                    <div className="encabezado">
                        <h2>Pagos pendiente</h2>
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
                                        <button onClick={() => adminData.aprobar(item.firebaseKey)} className="check"><i class="bi bi-check-circle-fill" /></button>
                                        <button onClick={() => adminData.denegar(item.firebaseKey)} className="trash"><i class="bi bi-x-circle-fill" /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin