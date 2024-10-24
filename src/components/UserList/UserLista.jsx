import { getDatabase, ref, get, set, push, remove } from "firebase/database";
import appFirebase from "../../firebase-config";
import { useState, useEffect } from 'react';
import "firebase/auth"
import EditUser from '../../components/EditUser/EditUser.jsx';
import "./UserLista.css"
import { getAuth } from "firebase/auth"
import { useHistory } from 'react-router-dom';

const UserLista = () => {
    const [userModels, setUserModels] = useState([]);
    const [textFind, setTextFind] = useState("");
    const [visible, setVisible] = useState(false);
    const [userModel, setUserModel] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const history = useHistory();


    const handleClick=(item)=>{
        history.push('/admin/editar-usuario/'+item.firebaseKey);
    }

    const fetchData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            if (users) {
                const usersArray = Object.values(users);
                setUserModels(usersArray);
            } else {
                setUserModels([]);
            }
        } else {
            alert("error");
        }
    }

    const findData = async (text) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const filteredUsers = users.filter(user => {
                if (user.email && user.membership) {
                    return user.email.includes(text) && (user.request !== 0);
                } else {
                    return false;
                }
            });
            this.setUserModels(filteredUsers);
        } else {
            alert("error");
        }
    }

    useEffect(() => {
        fetchData()
    }, []);



    return (
        <section className="tabla U">
            <div className="encabezado">
                <h2>Usuarios</h2>
                <div className="buscador">
                    <input type="text" placeholder="Buscar por E-mail..." onChange={(e) => setTextFind(e.target.value)} />
                    <button onClick={() => findData(textFind)}><i class="bi bi-search"></i></button>
                </div>
                <button onClick={() => fetchData()} className="refresh" ><i class="bi bi-arrow-counterclockwise"></i></button>
            </div>
            <li>
                <span className="column-header">Nombre de usuario</span>
                <span className="column-header">E-mail</span>
                <span className="column-header">Editar</span>
            </li>
            <div className="datos">
                <ul>
                    {userModels.map((item, index) => (
                        <li key={index}>
                            <span>{item.userName}</span>
                            <span>{item.email}</span>
                            <div className="editar">
                                <button class="edit-button" onClick={() => handleClick(item)}>
                                    <svg class="edit-svgIcon" viewBox="0 0 512 512">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default UserLista