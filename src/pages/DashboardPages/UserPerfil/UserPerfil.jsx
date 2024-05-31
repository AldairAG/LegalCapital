import { useState, useEffect } from "react"
import TextInput from "../../../components/TextInput/TextInput"
import "./UserPerfil.css"
import Common from "../../../components/js/Common"
import AlertMsg from "../../../components/AlertMsg/AlertMsg.jsx"
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

    useEffect(() => {
        const fetchData = async () => {
            const common = new Common(setUserData);
            await common.getUserData();
            setFetchCounter(fetchCounter + 1);
        };
        
        const asingData=()=>{
            setApellido(userData.lastName)
            setName(userData.firstName)
            setEmail(userData.email)
            setTelefono(userData.phoneNumber)
            setWallet(userData.usdtAddress)
            setUser(userData.userName)
        }
        if (fetchCounter < 2) {
            fetchData();
        } else {
            asingData()
            setIsLoading(false);
        }
    }, [fetchCounter]);

    const save=()=>{
        try {
            editarUser()
            setVisible(true)
            setMsj("changes made successfully")
        } catch (error) {
            
        }
    }

    const editarUser=()=>{
        const common =new Common()
        const user=userData
        user.firstName=name
        user.lastName=apellidio
        user.usdtAddress=wallet
        user.phoneNumber=telefono
        common.editAnyUser(user)
    }

    return (
        <div>
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj}/>
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
                        <div className="dtp1"><TextInput ti={"Username"} value={user} setValue={setUser} /></div>
                        <div className="dtp2"><TextInput ti={"E-mail"} value={email} setValue={setEmail} /></div>
                        <div className="dtp3"><TextInput ti={"Name"} value={name} setValue={setName} /></div>
                        <div className="dtp4"><TextInput ti={"Surname"} value={apellidio} setValue={setApellido} /></div>
                        <div className="dtp5"><TextInput ti={"Phone"} value={telefono} setValue={setTelefono} /></div>
                        <div className="dtp6"></div>
                        <div className="dtp7"><TextInput ti={"USDT Wallet"} value={wallet} setValue={setWallet} /></div>
                        <div className="dtp8"><button onClick={save} className="btnSave"><span class="button_top"> Save</span></button></div>
                    </div>
                    <div className="sec3-up"></div>
                </section >
            )}
        </div >


    )
}

export default UserPerfil