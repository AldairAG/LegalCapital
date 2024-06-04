import { useState, useEffect } from "react"
import TextInput from "../../../components/TextInput/TextInput"
import "./UserPerfil.css"
import Common from "../../../components/js/Common"
import AlertMsg from "../../../components/AlertMsg/AlertMsg.jsx"
import SwitchFun from "../../../components/EditUser/InputData/SwitchFun.jsx"
const UserPerfil = () => {
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [wallet, setWallet] = useState("")
    const [apellidio, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")

    const [userData, setUserData] = useState([]);
    const [fetchCounter, setFetchCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [msj, setMsj] = useState("");
    const [interesCompuesto, setInteresCompuesto] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const common = new Common(setUserData);
            await common.getUserData();
            setFetchCounter(fetchCounter + 1);
        };

        const asingData = () => {
            setApellido(userData.lastName)
            setName(userData.firstName)
            setEmail(userData.email)
            setTelefono(userData.phoneNumber)
            setWallet(userData.usdtAddress)
            setUser(userData.userName)
            if (user.intComp) {
                setInteresCompuesto(user.intComp)
            } else {
                setInteresCompuesto("00")
            }

        }
        if (fetchCounter < 2) {
            fetchData();
        } else {
            asingData()
            setIsLoading(false);
        }
    }, [fetchCounter]);

    const save = () => {
        try {
            editarUser()
            setVisible(true)
            setMsj("changes made successfully")
            window.location.reload();
        } catch (error) {

        }
    }

    const actualizarPermiso = (indice, nuevoValor) => {
        const nuevosPermisos = [...interesCompuesto];
        nuevosPermisos[indice] = nuevoValor;
        setInteresCompuesto(nuevosPermisos);
    };

    const editarUser = () => {
        const common = new Common()
        const user = userData
        //user.intComp=interesCompuesto.join("")
        user.firstName = name
        user.lastName = apellidio
        user.usdtAddress = wallet
        user.phoneNumber = telefono
        common.editAnyUser(user)
    }

    return (
        <div>
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            {isLoading ? (
                <div class="spinner"></div>
            ) : (
                <section className="contenido userPerfil">
                    <div className="titulos sec0-up">
                        <i className="bi bi-person-gear"></i>
                        <span>Profile</span>
                    </div>
                    <div className="sec1-up">
                        <img className="userImg" alt="userImg" />
                        <div className="userInfo">
                            <div className="infos">
                                <p className="textoG">{userData.userName}</p>
                                <p className="textoM">{userData.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="sec2-up" >
                        <div className="dtp0 textoM3"><p>Personal data</p></div>
                        <div className="dtp1"><TextInput ti={"Username"} value={user} setValue={setUser} block={true}/></div>
                        <div className="dtp2"><TextInput ti={"E-mail"} value={email} setValue={setEmail} block={true}/></div>
                        <div className="dtp3"><TextInput ti={"Name"} value={name} setValue={setName} /></div>
                        <div className="dtp4"><TextInput ti={"Surname"} value={apellidio} setValue={setApellido} /></div>
                        <div className="dtp5"><TextInput ti={"Phone"} value={telefono} setValue={setTelefono} /></div>
                        <div className="dtp6"></div>
                        <div className="dtp7"><TextInput ti={"USDT Wallet"} value={wallet} setValue={setWallet} /></div>
                        <div className="dtp8"><button onClick={save} className="boton1"><span class="button_top">Save</span></button></div>
                    </div>
                    <div className="sec3-up">
                        <div className="s30-up textoM3"><p>Use compound interest</p></div>
                        <div className="s31-up textoM2">
                            <p>The "compound interest" feature automatically reinvests into the starter
                                pack every 100 USDT earned in the activated wallet. This reinvestment is carried out daily at 00:00 hours (Miami time).</p></div>
                        <div className="s32-up textoM2">
                            <p>Activate compound interest from the dividend wallet</p>
                            <SwitchFun permiso={interesCompuesto[0]} indice={0} actualizarPermiso={actualizarPermiso} />
                        </div>
                        <div className="s33-up textoM2">
                            <p>Activate compound interest from the commission wallet</p>
                            <SwitchFun permiso={interesCompuesto[1]} indice={1} actualizarPermiso={actualizarPermiso} />
                        </div>
                        <div className="s34-up textoM2">
                            <button onClick={save} className="boton1"><span class="button_top">Save</span></button>
                        </div>
                    </div>
                </section >
            )}
        </div >


    )
}

export default UserPerfil