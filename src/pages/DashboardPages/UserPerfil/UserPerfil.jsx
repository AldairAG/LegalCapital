import { useState, useEffect, useRef } from "react"
import TextInput from "../../../components/TextInput/TextInput"
import "./UserPerfil.css"
import Common from "../../../components/js/Common"
import AlertMsg from "../../../components/AlertMsg/AlertMsg.jsx"
import SwitchFun from "../../../components/EditUser/InputData/SwitchFun.jsx"
import { getDatabase, ref, onValue } from 'firebase/database';
import img1 from "../../../Assets/Images/Baners_jpg/user.png"
import UploadImg from "../../../components/uploadImg/UploadImg.jsx"
import appFirebase from "../../../firebase-config.js"
import { ref as storageRef, getDownloadURL, getStorage } from 'firebase/storage';

const UserPerfil = (props) => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [wallet, setWallet] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visiblePic, setVisiblePic] = useState(false);
    const [msj, setMsj] = useState("");
    const [interesCompuesto, setInteresCompuesto] = useState(["0", "0"]);

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + props.keyF);  // Reemplaza 'USER_ID' con el ID del usuario

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setApellido(userData.lastName || "");
            setName(userData.firstName || "");
            setEmail(userData.email || "");
            setTelefono(userData.phoneNumber || "");
            setWallet(userData.usdtAddress || "");
            setUser(userData.userName || "");
            if (userData.intComp) {
                setInteresCompuesto(userData.intComp.split(""));
            } else {
                setInteresCompuesto(["0", "0"]);
            }
            fetchImage(userData.userName)
            setIsLoading(false);
        }
    }, [userData]);

    const fetchImage = async (userName) => {
        try {
            const storage = getStorage(appFirebase);
            const imageRef = storageRef(storage, 'imagesUp/'+userName);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    };

    const save = () => {
        try {
            editarUser();
            setVisible(true);
            setMsj("Changes made successfully");
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    };

    const actualizarPermiso = (indice, nuevoValor) => {
        const nuevosPermisos = [...interesCompuesto];
        nuevosPermisos[indice] = nuevoValor;
        setInteresCompuesto(nuevosPermisos);
    };

    const editarUser = () => {
        const common = new Common();
        const updatedUser = { ...userData };
        updatedUser.intComp = interesCompuesto.join("");
        updatedUser.firstName = name;
        updatedUser.lastName = apellido;
        updatedUser.usdtAddress = wallet;
        updatedUser.phoneNumber = telefono;
        common.editAnyUser(updatedUser);
    };

    const activarSelectorImg = () => {
        setVisiblePic(true)
    }

    return (
        <div>
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            <UploadImg visible={visiblePic} setVisible={setVisiblePic} userName={userData.userName} />
            {isLoading ? (
                <div className="spinner"></div>
            ) : (
                <section className="contenido userPerfil">
                    <div className="titulos sec0-up">
                        <i className="bi bi-person-gear"></i>
                        <span>Profile</span>
                    </div>
                    <div className="sec1-up">
                        <div onClick={activarSelectorImg} className="uih"><i className="bi bi-pencil"></i></div>
                        <img className="userImg" src={imageUrl || img1} alt="user" />
                        <button onClick={activarSelectorImg}><i className="bi bi-pencil-square"></i></button>
                        <div className="userInfo">
                            <div className="infos">
                                <p className="textoG">{user}</p>
                                <p className="textoM">{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="sec2-up">
                        <div className="dtp0 textoM3"><p>Personal data</p></div>
                        <div className="dtp1"><TextInput ti={"Username"} value={user} setValue={setUser} block={true} /></div>
                        <div className="dtp2"><TextInput ti={"E-mail"} value={email} setValue={setEmail} block={true} /></div>
                        <div className="dtp3"><TextInput ti={"Name"} value={name} setValue={setName} /></div>
                        <div className="dtp4"><TextInput ti={"Surname"} value={apellido} setValue={setApellido} /></div>
                        <div className="dtp5"><TextInput ti={"Phone"} value={telefono} setValue={setTelefono} /></div>
                        <div className="dtp6"></div>
                        <div className="dtp7"><TextInput ti={"USDT Wallet(TRC20)"} value={wallet} setValue={setWallet} /></div>
                        <div className="dtp8"><button onClick={save} className="boton1"><span className="button_top">Save</span></button></div>
                    </div>
                    <div className="sec3-up">
                        <div className="s30-up textoM3"><p>Use compound interest</p></div>
                        <div className="s31-up textoM2">
                            <p>The "compound interest" feature automatically reinvests into the starter
                                pack every 100 USDT earned in the activated wallet. This reinvestment is carried out daily at 00:00 hours (Miami time).</p>
                        </div>
                        <div className="s32-up textoM2">
                            <p>Activate compound interest from the dividend wallet</p>
                            <SwitchFun permiso={interesCompuesto[0]} indice={0} actualizarPermiso={actualizarPermiso} />
                        </div>
                        <div className="s33-up textoM2">
                            <p>Activate compound interest from the commission wallet</p>
                            <SwitchFun permiso={interesCompuesto[1]} indice={1} actualizarPermiso={actualizarPermiso} />
                        </div>
                        <div className="s34-up textoM2">
                            <button onClick={save} className="boton1"><span className="button_top">Save</span></button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserPerfil;