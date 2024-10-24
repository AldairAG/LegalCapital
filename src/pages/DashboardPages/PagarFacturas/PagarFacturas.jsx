import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import "./Retiros.css";
import TextInput from "../../../components/TextInput/TextInput";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertMsg from "../../../components/AlertMsg/AlertMsg";
import AlertMsgError from "../../../components/AlertMsg/AlertMsgError";
import { getDatabase, ref, onValue, get, query, orderByChild, equalTo } from "firebase/database";
import NipModal from "../../../components/NipModal/NipModal";
import appFirebase from "../../../firebase-config";
import Common from "../../../components/js/Common";
import PeticionModel from "../../../model/PeticionModel"
import img1 from "../../../Assets/Images/qr/qrms.png"

const PagarFacturas = () => {
    const location = useLocation();
    const isWithdrawalsPage = location.pathname === "/Dashboard/withdrawals";
    const [cantidad, setCantidad] = useState("");
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [textoMsj, setTextoMsj] = useState("");
    const [historial, setHistorial] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRP, setIsLoadingRP] = useState(true);
    const [visibleNipModal, setVisibleNipModal] = useState(false);
    const [wallet, setWallet] = useState("");
    const [seleccionado, setSeleccionado] = useState(1)
    const [userData, setUserData] = useState({});
    const errores = {
        invalidValue: "The value you entered is not valid",
        noWallet: "You have not yet registered your USDT wallet",
        completeProfile: "Complete your profile to be able to withdraw",
        insufficientBalance: "You do not have enough balance to withdraw this amount",
        minWithdrawal: `The minimum withdrawal amount is $50 USDT`,
        minBalanceAfterWithdraw: "After withdrawing you need to have at least 25 USDT remaining",
        retiroActivo: "you already have a pending withdrawal"
    };

    const openCloseNipModal = () => {
        const retiroMinimo = seleccionado == 1 ? 50 : 10
        const wallet = seleccionado == 1 ? userData.walletDiv : userData.walletCom
        if (visibleNipModal) {
            setVisibleNipModal(false)
        } else {
            if (validacion(wallet, userData, retiroMinimo, seleccionado, cantidad)) setVisibleNipModal(!visibleNipModal);
        }
    };

    const pagar = () => {
        if (!validacion()) return

    }

    const validacion = () => {
        if (cantidad === 0) {
            setTextoMsj(errores.igualCero)
            setVisibleError(true)
            console.log(errores.igualCero)
            return false
        }
    }

    const changeSeleccion = (opc) => {
        setSeleccionado(opc)
    }

    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <section className="contenido Retiros">
            <AlertMsgError texto={textoMsj} visible={visibleError} setVisible={setVisibleError} />
            <AlertMsg texto={textoMsj} visible={visibleMsg} setVisible={setVisibleMsg} />
            <NipModal correctNip={userData.nip} onOpenClose={openCloseNipModal} modalNip={visibleNipModal} />
            <section className="titulos titulo-re">
                <i className="bi bi-person-gear"></i>
                <span>Facturas</span>
            </section>

            <section className="contenido">
                <section className="retirar">
                    <p className="titulo">Select your wallet</p>
                    <div className="wallets">
                        {WalletOpcion("Divident wallet", userData.walletDiv, 1)}
                        {WalletOpcion("Comission wallet", userData.walletCom, 2)}
                    </div>

                    <TextInput ti={"Billing code"} value={cantidad} setValue={setCantidad} />
                    <button className="boton4" onClick={openCloseNipModal}><span>Pay Bill</span></button>
                </section>

                <section className="notas">
                    <p className="textoM2">How to pay?:</p>
                    <p className="textoM"><li>Select a <span>wallet</span>.</li></p>
                    <p className="textoM"><li>Enter the invoice code.</li></p>
                    <p className="textoM"><li>Press the make payment buttonPress the make payment button.</li></p>
                    <p className="textoM"><li>Pay the remaining 50% <span>via a USDT(TRC20)</span> transfer with the code or QR that will be provided to you.</li></p>
                    <p className="textoM"><li>Please note that only 50% of the total package bill can be paid with credit from the wallets Please note that only 50% of the total package bill can be paid with credit from the wallets.</li></p>

                </section>
            </section>

            <section className="qrPagoFac">
                <div className="contenidoqrpf">
                    <label className="titulo">Pago con QR</label>
                    <div className="walletInput">
                                    <input type="text" id="wallet" readOnly value="" />
                                    <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                    </div>
                    

                </div>
                <div className="qr-section">
                    <section className="notas">
                        <p className="textoM"><li>Scan the QR code to pay.</li></p>
                    </section>
                    <img src={img1} alt="QR code" />
                </div>

            </section>

        </section >


    )

    function WalletOpcion(titulo, wallet, opc) {
        return (
            <div onClick={() => changeSeleccion(opc)} className={seleccionado == opc ? "seleccionado walletOpcion" : "walletOpcion"}>
                <h3>{titulo}</h3>
                <div>
                    <img src={logoUSDT} alt="usdt_logo" />
                    <span>{(wallet || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</span>
                </div>
            </div>
        )
    }



}



export default PagarFacturas