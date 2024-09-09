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
import DireccionModel from "../../../model/DireccionModel.js"
import InteresCompuesto from "../../../components/InteresCompuesto/InteresCompuesto.jsx"
import TwoStepVerification from "../../../components/TwoStepVerification/TwoStepVerification.jsx"
import NipModal from "../../../components/NipModal/NipModal.jsx"
import AlertMsgError from "../../../components/AlertMsg/AlertMsgError.jsx"

const UserPerfil = (props) => {
    //ventanas modales|
    const [modalNip, setModalNip] = useState(false)
    const [verificado, setVerificado] = useState(false)
    const [periods, setperiods] = useState(12)

    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [wallet, setWallet] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const [userData, setUserData] = useState({});
    const [updatedUserData, setUpdatedUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visibleE, setVisibleE] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visiblePic, setVisiblePic] = useState(false);
    const [msj, setMsj] = useState("");
    const [interesCompuesto, setInteresCompuesto] = useState(["0", "0"]);

    //direccion
    const [direccionData, setDireccionData] = useState([])
    const [direccion, setDireccion] = useState("")
    const [numInt, setNumInt] = useState("")
    const [numExt, setNumExt] = useState("")
    const [colonia, setColonia] = useState("")
    const [city, setCity] = useState("")
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [cp, setCp] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'direcciones/' + props.keyF);  // Reemplaza 'USER_ID' con el ID del usuario

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDireccionData(data);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

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

    useEffect(() => {
        if (Object.keys(direccionData).length > 0) {
            setDireccion(direccionData.direccion || "");
            setNumExt(direccionData.numExt || "");
            setNumInt(direccionData.numInt || "");
            setColonia(direccionData.colonia || "");
            setCity(direccionData.city || "");
            setEstadoSeleccionado(direccionData.estadoSeleccionado || "");
            setCp(direccionData.cp)
            setIsLoading(false);
        }
    }, [direccionData]);

    const fetchImage = async (userName) => {
        try {
            const storage = getStorage(appFirebase);
            const imageRef = storageRef(storage, 'imagesUp/' + userName);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    };

    const save = () => {
        try {
            editarUser();
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    };

    const editarUser = () => {
        const common = new Common();
        const updatedUser = { ...userData };
        updatedUser.intComp = interesCompuesto.join("");
        updatedUser.firstName = name;
        updatedUser.lastName = apellido;
        updatedUser.phoneNumber = telefono;
        if (wallet != userData.usdtAddress) {
            updatedUser.usdtAddress = wallet;
            setModalNip(true)
            setUpdatedUserData(updatedUser)
        } else {
            common.editAnyUser(updatedUser).then(() => {
                setMsj("Changes made successfully");
                setVisible(true);
            }).catch(() => {
                setMsj("Error");
                setVisibleE(true);
            })
        }
    };

    const actualizarPermiso = (indice, nuevoValor) => {
        const nuevosPermisos = [...interesCompuesto];
        nuevosPermisos[indice] = nuevoValor;
        setInteresCompuesto(nuevosPermisos);
    };

    const activarSelectorImg = () => {
        setVisiblePic(true)
    }

    const estados = {
        US: [
            'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
            'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
            'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
            'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],
        MX: [
            'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
            'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
            'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
            'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
        ]
    };

    const handleChange = (event) => {
        setEstadoSeleccionado(event.target.value);
    };

    const handleSaveDireccion = () => {
        const direccionModel = new DireccionModel(estadoSeleccionado, direccion, numExt, numInt, colonia, city, cp, userData.firebaseKey)
        direccionModel.saveDireccion()
        setVisible(true);
        setMsj("Changes made successfully");
    };

    const onOpenClose = () => {
        setModalNip(!modalNip)
    }

    const editarWalletAddress = () => {
        const common = new Common();
        common.editAnyUser(updatedUserData).then(() => {
            setMsj("Changes made successfully");
            setVisible(true);
            onOpenClose();
        }).catch(() => {
            setMsj("Error");
            setVisibleE(true);
        })
    }


    /*     const [modalNip, setModalNip] = useState(false)
        const [verificado, setVerificado] = useState(false)
        const [isLoading, setIsLoading] = useState(true);
     
        const [visibleE, setVisibleE] = useState(false);
        const [visible, setVisible] = useState(false);
        const [msj, setMsj] = useState("");
     
        const [visiblePic, setVisiblePic] = useState(false);
     
        const [interesCompuesto, setInteresCompuesto] = useState(["0", "0"]);
     
        const [direccionData, setDireccionData] = useState([])
        const [userData, setUserData] = useState({});
     
        useEffect(() => {
            fetch()
        }, [])
     
        function fetch() {
            const userRepo = new Common()
            userRepo.fetchUserData.then(user => {
                setUserData(user)
                fetchDireccion(user.firebaseKey).then(()=>{
                    setIsLoading(false)
                })
            }).catch(error => {
                console.error("Error al obtener el usuario:", error);
            });
     
        }
     
        async function fetchDireccion(keyF) {
            const db = getDatabase();
            const userRef = ref(db, 'direcciones/' + keyF);  // Reemplaza 'USER_ID' con el ID del usuario
     
            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setDireccionData(data);
                } else {
                    console.log("No such document!");
                }
            });
        } */

    return (
        <div>
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            <AlertMsgError visible={visibleE} setVisible={setVisibleE} texto={msj} />
            <UploadImg visible={visiblePic} setVisible={setVisiblePic} userName={userData.userName} />
            <NipModal correctNip={userData.nip} onOpenClose={onOpenClose} modalNip={modalNip} proceso={editarWalletAddress} />
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
                        </div>{/* 
                        <div className="s32-up textoM2">
                            <p>Activate compound interest from the dividend wallet</p>
                            <SwitchFun permiso={interesCompuesto[0]} indice={0} actualizarPermiso={actualizarPermiso} tipo={0}/>
                        </div> */}
                        <div className="s33-up textoM2">
                            <p>Activate compound interest from the commission wallet</p>
                            <SwitchFun permiso={interesCompuesto[1]} indice={1} actualizarPermiso={actualizarPermiso} tipo={1} />
                        </div>
                        <div className="s34-up textoM2">
                            <button onClick={save} className="boton1"><span className="button_top">Save</span></button>
                        </div>
                    </div>

                    <div className="sec5-up">
                        <InteresCompuesto keyF={userData.firebaseKey} />
                    </div>

                    <div className="sec4-up">
                        <div className="s40-up textoM3"><p>Address</p></div>
                        <div className="s41-up">
                            <TextInput ti={"Address"} value={direccion} setValue={setDireccion} pl={"123 Main St"} />
                            <TextInput ti={"Outdoor Number"} value={numExt} setValue={setNumExt} pl={"#202"} />
                            <TextInput ti={"Interior number"} value={numInt} setValue={setNumInt} pl={"#15 (optional)"} />
                        </div>
                        <div className="s42-up">
                            <TextInput ti={"Colony"} value={colonia} setValue={setColonia} pl={"Buenos Aires"} />
                            <TextInput ti={"City"} value={city} setValue={setCity} pl={"San Francisco"} />
                        </div>
                        <div className="s42-up">
                            <TextInput ti={"Zip/Postal code"} value={cp} setValue={setCp} pl={"96610"} />
                            <div>
                                <p htmlFor="select-estado" className="textoM2">State/Province:</p>
                                <select id="select-estado" value={estadoSeleccionado} onChange={handleChange}>
                                    <option value="">--Select--</option>
                                    <optgroup label="United States">
                                        {estados.US.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="México">
                                        {estados.MX.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className="s43-up">
                            <button onClick={handleSaveDireccion} className="boton1"><span className="button_top">Save</span></button>
                        </div>
                    </div>

                    <div className="sec6-up">
                        <TwoStepVerification userData={userData} />
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserPerfil;