import React from 'react';
import { useState, useEffect } from 'react';
import "./Admin.css"
import CopyLink from "../../../components/CopiLink/CopyLink.jsx"
import AdminData from "./AdminData.js"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogoutButton from '../../../components/LogoutButton/LogoutButton.jsx';
import UserLista from '../../../components/UserList/UserLista.jsx';
import { useHistory } from 'react-router-dom';
import Retiros from "../Retiros/Retiros.jsx"
import EditarUsuario from '../EditarUsuario/EditarUsuario.jsx';
import Editar from "../../../componentsEcomerce/Editar/Editar.jsx"
import AdminEc from "../../../componentsEcomerce/Admin/AdminEc.jsx"

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
            history.push('/admin/gestionar-retiros');
        } else if (num == 2) {
            history.push('/admin/gestionar-ususarios');
        } else if (num == 3) {
            history.push('/admin');
        } else if(num==4){
            history.push('/admin/Ecomerce');
        }
    }

    return (
        <div className="mainAdmin">
            <header>
                <div className="logo"><img alt="logo" /></div>
                <div className='cs' ><LogoutButton /></div>
            </header>
            <div className="ops">
                <button onClick={() => handleClick(1)}>Gestionar<br />retiros</button>
                <button onClick={() => handleClick(2)}>Gestionar<br />usuarios</button>
                <button onClick={() => handleClick(3)}>Aprobar<br />pagos</button>
                <button onClick={() => handleClick(4)}>Ecomerce</button>
            </div>
            <div className="linkC">
                <CopyLink username={"Administrador"} />
            </div>
            <div className="contenido-A">
                
                <Switch>
                    <Route path="/admin/gestionar-ususarios" component={UserList} />
                    <Route path="/admin/gestionar-retiros" component={Retiros} />
                    <Route path="/admin/editar-usuario/:fk?" component={EditarUsuario} />
                    <Route path="/admin/Ecomerce/" component={AdminEc} />
                    <Route path="/admin/editar-orden/:fk?" component={Editar} />
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
                        <span className="column-header">Concepto</span>
                        <span className="column-header">Aprobar</span>
                    </li>
                    <div className="datos">
                        <ul>
                            {userModels.map((item, index) => (
                                <li key={index}>
                                    <span>{item.userName}</span>
                                    <span>{item.email}</span>
                                    <span>{item.monto}</span>
                                    <span>{item.concepto}</span>
                                    <div className="aprobar">
                                        <button onClick={() => adminData.aprobar(item)} className="check"><i class="bi bi-check-circle-fill" /></button>
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