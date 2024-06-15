import img1 from "../../../Assets/Images/Logos/usdt.png"
import "./Retiros.css"
import TextInput from "../../../components/TextInput/TextInput"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import AlertMsg from "../../../components/AlertMsg/AlertMsg"
import AlertMsgError from "../../../components/AlertMsg/AlertMsgError"
import { getDatabase, ref, onValue } from 'firebase/database';
import Common from "../../../components/js/Common"

const Retiros = (props) => {
    const [opc1, setOpc1] = useState(true)
    const [opc2, setOpc2] = useState(false)
    const [cantidad, setCantidad] = useState("")
    const [visibleMsg, setVisibleMsg] = useState(false)
    const [visibleError, setVisibleError] = useState(false)
    const [textoMsj, setTextoMsj] = useState("")
    const [userData, setUserData] = useState({});
    const [wallet, setWallet] = useState("")
    const [isLoading, setIsLoading] = useState(true);

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
            setWallet(userData.usdtAddress)
            setIsLoading(false)
        }
    }, [userData]);

    const handleChangeOpc = (opc) => {
        if (opc === 1) {
            setOpc1(true)
            setOpc2(false)
        } else if (opc === 2) {
            setOpc2(true)
            setOpc1(false)
        }
    }

    const hasMoreThanTwoDecimals = (num) => {
        const str = num.toString();
        const decimalIndex = str.indexOf('.');
        if (decimalIndex === -1) return false;
        const decimalPart = str.slice(decimalIndex + 1);
        return decimalPart.length > 2;
    };

    const handleValidacion = () => {
        if (isNaN(parseFloat(cantidad))) {
            setVisibleError(true)
            setTextoMsj("The value you entered is not valid")
        } else if (wallet === null || wallet === undefined || wallet === "") {
            setVisibleError(true)
            setTextoMsj("You have not yet registered your USDT wallet")
        } else if (hasMoreThanTwoDecimals(cantidad)) {
            setVisibleError(true)
            setTextoMsj("The value you entered is not valid")
        } else if (opc1) {
            if (cantidad > userData.walletDiv) {
                setVisibleError(true)
                setTextoMsj("You do not have enough balance to withdraw this amount")
            } else if (cantidad < 50) {
                setVisibleError(true)
                setTextoMsj("The minimum withdrawal amount is 50 USDT")
            } else if (userData.walletDiv - cantidad < 25) {
                setVisibleError(true)
                setTextoMsj("After withdrawing you need to have at least 25 USDT remaining")
            } else {
                sendRequest(cantidad,1)
                setVisibleMsg(true)
                setTextoMsj("Request submitted successfully")
            }
        } else if (opc2) {
            if (cantidad > userData.walletCom) {
                setVisibleError(true)
                setTextoMsj("You do not have enough balance to withdraw this amount")
            } else if (cantidad < 50) {
                setVisibleError(true)
                setTextoMsj("The minimum withdrawal amount is 50 USDT")
            } else {
                sendRequest(cantidad,2)
                setVisibleMsg(true)
                setTextoMsj("Request submitted successfully")
            }
        }
    }

    const sendRequest = (monto, wallet) => {
        const floatValue = parseFloat(monto);
        const common = new Common();
        const updatedUser = { ...userData };
        updatedUser.requestRetiro = floatValue
        if (wallet === 1) {
            updatedUser.walletDiv = updatedUser.walletDiv - monto
        }else if(wallet===2){
            updatedUser.walletCom = updatedUser.walletCom - monto
        }
        updatedUser.retiros=updatedUser.retiros + Number(monto)
        common.editAnyUser(updatedUser)
    }

    return (
        <section className="contenido Retiros">
            <AlertMsgError texto={textoMsj} visible={visibleError} setVisible={setVisibleError} />
            <AlertMsg texto={textoMsj} visible={visibleMsg} setVisible={setVisibleMsg} />
            <div className="titulos titulo-re">
                <i className="bi bi-person-gear"></i>
                <span>Retiros</span>
            </div>
            {isLoading ? (
                <div className="spinner"></div>
            ) : (
                <div className="contenido-re">
                    <div className="se0-re"><p>Select your wallet</p></div>
                    <div className="se1-re">
                        <section className={opc1 ? "contain-data seleccionado" : "contain-data"} onClick={() => handleChangeOpc(1)}>
                            <div className="case">
                                <p class="text-sm text-muted-foreground">Dividend wallet</p>
                                <div className="case2">
                                    <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$ {userData.walletDiv}</h3>
                                    <img src={img1} alt="logo_usdt" />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="se2-re">
                        <section className={opc2 ? "contain-data seleccionado" : "contain-data"} onClick={() => handleChangeOpc(2)}>
                            <div className="case">
                                <p>Comission wallet</p>
                                <div className="case2">
                                    <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$ {userData.walletCom}</h3>
                                    <img src={img1} alt="logo_usdt" />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="se3-re">
                        <TextInput ti={"Wallet address"} block={false} value={userData.usdtAddress} setValue={setWallet} />
                    </div>
                    <div className="se4-re">
                        <TextInput ti={"Amount to withdraw(USDT)"} value={cantidad} setValue={setCantidad} />
                    </div>
                    <div className="se5-re">
                        <button className="boton4" onClick={handleValidacion}><span>Request withdrawal</span></button>
                    </div>
                    <div className="notas-re">
                        <p className="textoM2">Important notes:</p>
                        <p className="textoM"><li>You need to have your TRC20 wallet address registered. If you don't have it yet,<Link to="Profile" className="link"> click here</Link></li></p>
                        <p className="textoM"><li>To request withdrawal of dividends or commissions, a <span>minimum amount of 50 USDT is required.</span></li></p>
                        <p className="textoM"><li>All requests will be approved only <span>Monday through Friday</span> starting at 12:00 a.m. (Miami time).</li></p>
                        <p className="textoM"><li>Withdrawal <span>cost of 5% </span>for the total amount requested (Administrative expenses).</li></p>
                        <p className="textoM"><li>When a withdrawal is requested the dividend wallet <span>must have at least 25 USDT</span>.</li></p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Retiros