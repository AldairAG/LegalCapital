import { useState, useEffect } from "react"
import TextInput from "../../../components/TextInput/TextInput"
import "./UserPerfil.css"
import Common from "../../../components/js/Common"
const UserPerfil = () => {
    const [email, setEmail] = useState("")
    const [userData, setUserData] = useState([]);
    const [fetchCounter, setFetchCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const common = new Common(setUserData);
            await common.getUserData();
            setFetchCounter(fetchCounter + 1);
        };

        if (fetchCounter < 2) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [fetchCounter]);

    return (
        <div>
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
                    <div className="sec2-up">
                        <div className="dtp0 textoM3"><p>Personal data</p></div>
                        <div className="dtp1"><TextInput ti={"Username"} value={email} setValue={setEmail} /></div>
                        <div className="dtp2"><TextInput ti={"E-mail"} value={email} setValue={setEmail} /></div>
                        <div className="dtp3"><TextInput ti={"Name"} value={email} setValue={setEmail} /></div>
                        <div className="dtp4"><TextInput ti={"Surname"} value={email} setValue={setEmail} /></div>
                        <div className="dtp5"><TextInput ti={"Phone"} value={email} setValue={setEmail} /></div>
                        <div className="dtp6"><TextInput ti={"Country"} value={email} setValue={setEmail} /></div>
                        <div className="dtp7"><TextInput ti={"USDT Wallet"} value={email} setValue={setEmail} /></div>
                    </div>
                    <div className="sec3-up"></div>
                </section >
            )}
        </div >


    )
}

export default UserPerfil