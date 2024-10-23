import "./QrComponent.css"
import React, { useState, useEffect } from 'react';
import QrData from "./QrData";
import qr from "../../Assets/Images/qr/qrms.png"
import img1 from "../../Assets/flaticons/qrfi.png"
import img2 from "../../Assets/flaticons/copyfi.png"
import img3 from "../../Assets/flaticons/advertecniafi.png"
import img4 from ".././../Assets/Images/Baners_jpg/pagometodo.png"
import logoUSDT from "../../Assets/Images/Logos/usdt.png"
import PeticioModel from "../../model/PeticionModel"
import AlertMsj from "../AlertMsg/AlertMsg"
import AlertMsjError from "../AlertMsg/AlertMsgError"
import Common from "../js/Common";

const QrComponent = ({ visible, openClose, op }) => {
    const [opcion, setOpcion] = useState(0);
    const [msj, setMsj] = useState(false)
    const [msjE, setMsjE] = useState(false)
    const [texto, setTexto] = useState("")
    const opcionesPago = ["---", "USDT Transfer", "Use your own earnings", "Pay by invoice"]
    const [opcionPago, setOpcionPago] = useState("")
    const [userData, setUserData] = useState([])
    const [seleccionado, setSeleccionado] = useState(1)
    const nota3 = {
        intruccion1: "1- select an amount and generate your payment code",
        instruccion2: "2- Copy the code so that someone else can pay for the package",
        advertencia1: "The maximum amount that can be paid through this method corresponds to 50%",
        advertencia2: "The remaining amount must be paid via USDT transfer (TRC20)"
    }
    const [code, setCode] = useState("")

    useEffect(() => {
        fetch()
    }, [])

    if (!visible) return

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            setOpcion(0);
        } else {
            setOpcion(value);
        }
    };
    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        setTexto("Wallet copied successfully")
        setMsj(true)
    };
    const handleCopyCode = () => {
        const inputElement = document.getElementById("code");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        setTexto("Wallet copied successfully")
        setMsj(true)
    };
    const generarOpciones = (op) => {
        switch (op) {
            case 1:
                return (
                    <>
                        <option value={0}>Seleccione una opción</option>;
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={400}>400</option>
                    </>
                );
            case 2:
                return (
                    <>
                        <option value={0}>Seleccione una opción</option>;
                        <option value={500}>500</option>
                        <option value={600}>600</option>
                        <option value={700}>700</option>
                        <option value={800}>800</option>
                        <option value={900}>900</option>
                        <option value={1000}>1000</option>
                        <option value={1100}>1100</option>
                        <option value={1200}>1200</option>
                        <option value={1300}>1300</option>
                        <option value={1400}>1400</option>
                        <option value={1500}>1500</option>
                        <option value={1600}>1600</option>
                        <option value={1700}>1700</option>
                        <option value={1800}>1800</option>
                        <option value={1900}>1900</option>
                        <option value={2000}>2000</option>
                        <option value={2100}>2100</option>
                        <option value={2200}>2200</option>
                        <option value={2300}>2300</option>
                        <option value={2400}>2400</option>
                    </>
                );
            case 3:
                return (
                    <>
                        <option value={0}>Seleccione una opción</option>;
                        <option value={2500}>2500</option>
                        <option value={2600}>2600</option>
                        <option value={2700}>2700</option>
                        <option value={2800}>2800</option>
                        <option value={2900}>2900</option>
                        <option value={3000}>3000</option>
                        <option value={3100}>3100</option>
                        <option value={3200}>3200</option>
                        <option value={3300}>3300</option>
                        <option value={3400}>3400</option>
                        <option value={3500}>3500</option>
                        <option value={3600}>3600</option>
                        <option value={3700}>3700</option>
                        <option value={3800}>3800</option>
                        <option value={3900}>3900</option>
                        <option value={4000}>4000</option>
                        <option value={4100}>4100</option>
                        <option value={4200}>4200</option>
                        <option value={4300}>4300</option>
                        <option value={4400}>4400</option>
                        <option value={4500}>4500</option>
                        <option value={4600}>4600</option>
                        <option value={4700}>4700</option>
                        <option value={4800}>4800</option>
                        <option value={4900}>4900</option>
                    </>
                );
            case 4:
                return (
                    <>
                        <option value={0}>Seleccione una opción</option>;
                        <option value={5000}>5000</option>
                        <option value={5100}>5100</option>
                        <option value={5200}>5200</option>
                        <option value={5300}>5300</option>
                        <option value={5400}>5400</option>
                        <option value={5500}>5500</option>
                        <option value={5600}>5600</option>
                        <option value={5700}>5700</option>
                        <option value={5800}>5800</option>
                        <option value={5900}>5900</option>
                        <option value={6000}>6000</option>
                        <option value={6100}>6100</option>
                        <option value={6200}>6200</option>
                        <option value={6300}>6300</option>
                        <option value={6400}>6400</option>
                        <option value={6500}>6500</option>
                        <option value={6600}>6600</option>
                        <option value={6700}>6700</option>
                        <option value={6800}>6800</option>
                        <option value={6900}>6900</option>
                        <option value={7000}>7000</option>
                        <option value={7100}>7100</option>
                        <option value={7200}>7200</option>
                        <option value={7300}>7300</option>
                        <option value={7400}>7400</option>
                        <option value={7500}>7500</option>
                        <option value={7600}>7600</option>
                        <option value={7700}>7700</option>
                        <option value={7800}>7800</option>
                        <option value={7900}>7900</option>
                        <option value={8000}>8000</option>
                        <option value={8100}>8100</option>
                        <option value={8200}>8200</option>
                        <option value={8300}>8300</option>
                        <option value={8400}>8400</option>
                        <option value={8500}>8500</option>
                        <option value={8600}>8600</option>
                        <option value={8700}>8700</option>
                        <option value={8800}>8800</option>
                        <option value={8900}>8900</option>
                        <option value={9000}>9000</option>
                        <option value={9100}>9100</option>
                        <option value={9200}>9200</option>
                        <option value={9300}>9300</option>
                        <option value={9400}>9400</option>
                        <option value={9500}>9500</option>
                        <option value={9600}>9600</option>
                        <option value={9700}>9700</option>
                        <option value={9800}>9800</option>
                        <option value={9900}>9900</option>


                    </>
                );
            case 5:
                return (
                    <>
                        <option value={0}>Seleccione una opción</option>;
                        <option value={10000}>10000</option>
                        <option value={10100}>10100</option>
                        <option value={10200}>10200</option>
                        <option value={10300}>10300</option>
                        <option value={10400}>10400</option>
                        <option value={10500}>10500</option>
                        <option value={10600}>10600</option>
                        <option value={10700}>10700</option>
                        <option value={10800}>10800</option>
                        <option value={10900}>10900</option>
                        <option value={11000}>11000</option>
                        <option value={11100}>11100</option>
                        <option value={11200}>11200</option>
                        <option value={11300}>11300</option>
                        <option value={11400}>11400</option>
                        <option value={11500}>11500</option>
                        <option value={11600}>11600</option>
                        <option value={11700}>11700</option>
                        <option value={11800}>11800</option>
                        <option value={11900}>11900</option>
                        <option value={12000}>12000</option>
                        <option value={12100}>12100</option>
                        <option value={12200}>12200</option>
                        <option value={12300}>12300</option>
                        <option value={12400}>12400</option>
                        <option value={12500}>12500</option>
                        <option value={12600}>12600</option>
                        <option value={12700}>12700</option>
                        <option value={12800}>12800</option>
                        <option value={12900}>12900</option>
                        <option value={13000}>13000</option>
                        <option value={13100}>13100</option>
                        <option value={13200}>13200</option>
                        <option value={13300}>13300</option>
                        <option value={13400}>13400</option>
                        <option value={13500}>13500</option>
                        <option value={13600}>13600</option>
                        <option value={13700}>13700</option>
                        <option value={13800}>13800</option>
                        <option value={13900}>13900</option>
                        <option value={14000}>14000</option>
                        <option value={14100}>14100</option>
                        <option value={14200}>14200</option>
                        <option value={14300}>14300</option>
                        <option value={14400}>14400</option>
                        <option value={14500}>14500</option>
                        <option value={14600}>14600</option>
                        <option value={14700}>14700</option>
                        <option value={14800}>14800</option>
                        <option value={14900}>14900</option>
                        <option value={15000}>15000</option>

                    </>
                );
            default:
                return <option value={0}>Seleccione una opción</option>;
        }
    };
    const setRequestHandle = (opcion) => {
        const peticionesData = new PeticioModel("Paquete de inicio", opcion)
        peticionesData.save()
        openClose()
    }
    const onOpenClose = () => {
        setOpcionPago("")
        openClose()
    }
    const changeSeleccion = (opc) => {
        setSeleccionado(opc)
    }

    function fetch() {
        if (visible) return
        const userRepo = new Common()
        userRepo.fetchUserData().then(user => {
            setUserData(user)
        }).catch(error => {
            console.error("Error al obtener el usuario:", error);
        });
    }

    function validaciones(wallet, walletS, monto) {
        if (walletS == 1) {
            if (wallet <= 25) {
                setTexto("You must have at least 25 USDT")
                setMsjE(true)
                return false
            }
        }
        if (monto > wallet) {
            setTexto("You don't have enough funds")
            setMsjE(true)
            return false
        }

        //validador por si no selecciono una opcion
        if (opcion == 0) {
            setTexto("You have not selected an option")
            setMsjE(true)
            return false
        }


        return true
    }

    const realizarPago = async () => {
        const userRepo = new Common()
        const monto = opcion
        const wallet = seleccionado
        const user = userData

        if (wallet == 1) {
            const walletPrueba = user.walletDiv - 25
            if (!validaciones(walletPrueba, wallet, monto)) return
            user.walletDiv = user.walletDiv - monto
            user.staterPack = user.staterPack + monto
            userRepo.editAnyUser(user).then(() => {
                setTexto("Successful purchase")
                setMsj(true)
            }).catch(() => {
                setTexto("something went wrong")
                setMsjE(true)
            })
        } else {
            if (!validaciones(user.walletCom, wallet, monto)) return
            user.staterPack = user.staterPack + monto
            user.walletCom = user.walletCom - monto
            userRepo.editAnyUser(user).then(() => {
                setTexto("Successful purchase")
                setMsj(true)
            }).catch(() => {
                setTexto("something went wrong")
                setMsjE(true)
            })
        }
    }

    const generarCodigo = () => {
        if(opcion=="---"){
            setTexto("You must have at least 25 USDT")
            setMsjE(true)
            return
        }
        const peticionesData = new PeticioModel("payment by invoice", opcion)
        peticionesData.saveFactura().then((fkey) => {
            setCode(fkey)
        })
    }

    return (
        <section className='qrPago'>
            <AlertMsj setVisible={setMsj} visible={msj} texto={texto} />
            <AlertMsjError setVisible={setMsjE} visible={msjE} texto={texto} />
            <div className="overlay"></div>
            <div className="modal-contentQr">

                {!opcionPago && (
                    <div className="selector">
                        <div className="titulo">
                            <img src={img4} alt="ic_pago" />
                            <p>Select a payment method</p>
                        </div>
                        <select value={opcionPago} onChange={(e) => setOpcionPago(e.target.value)}>
                            {opcionesPago.map((opcion, index) => (
                                <option key={index} value={opcion}>
                                    {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {opcionPago === opcionesPago[2] && (
                    <div className="paymentWallet">
                        <p className="textoM3">Complete the payment</p>
                        <span>1-Select the wallet</span>
                        {WalletOpcion("Divident wallet", userData.walletDiv, 1)}
                        {WalletOpcion("Comission wallet", userData.walletCom, 2)}
                        <span>2-Select the package price</span>
                        <select className="select-box" value={opcion} onChange={handleChange} >
                            {generarOpciones(op)}
                        </select>
                        <span>3-Finalize your purchase</span>
                        <button className="finish" onClick={realizarPago}>Finish payment</button>
                        <button className="close" onClick={onOpenClose}><span>Close</span></button>
                    </div>
                )}

                {opcionPago === opcionesPago[1] && (
                    <>
                        <div className="payment">
                            <p className="textoM3">Complete the payment</p>
                            <img src={qr} alt="qr" />
                            <div className="copyAddrs">
                                <p >Wallet address to pay</p>
                                <div className="wallet">
                                    <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                                    <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                </div>
                            </div>
                            <div className="monto">
                                <p>Amount</p>
                                <div>
                                    {op === 5 ? (
                                        <input type="text" id="wallet" value={opcion} onChange={handleChange} />
                                    ) : (
                                        <select className="select-box" value={opcion} onChange={handleChange} >
                                            {generarOpciones(op)}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <button className="finish" onClick={() => setRequestHandle(opcion)}>Finish payment</button>
                            <button className="close" onClick={onOpenClose}><span>Close</span></button>
                        </div>
                        <div className="notasqr">
                            <div><p className="textoM3">How to make a deposit?</p></div>
                            <div className="nota">
                                <img src={img1} className="imgSec2-qr" alt="qric" />
                                <p>Scan the Qr code with your payment app</p>
                            </div>
                            <div className="or">
                                <p><i class="bi bi-dash"></i> or <i class="bi bi-dash"></i></p>
                            </div>
                            <div className="nota">
                                <img src={img2} className="imgSec2-qr" alt="qric" />
                                <p>Copy the USDT address and
                                    amount to pay, then paste them
                                    into your payment app
                                </p>
                            </div>
                            <div className="nota">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>Transfer only Tether USD TRC20
                                    token (USDT). Transferring
                                    other currency will result in the
                                    toss of funds
                                </p>
                            </div>
                            <div className="nota">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>
                                    Make sure to correctly send the transaction, verifying the exact amount and that the Wallet is correct.
                                    Any sending error will result in the loss of funds.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {opcionPago === opcionesPago[3] && (
                    <>
                        <div className="payment">
                            <p className="textoM3">Complete the payment</p>
                            <div className="monto">
                                <p className="textoM2">1-. Select a quantity</p>
                                <div>
                                    {op === 5 ? (
                                        <input type="text" id="code" value={opcion} onChange={handleChange} />
                                    ) : (
                                        <select className="select-box" value={opcion} onChange={handleChange} >
                                            {generarOpciones(op)}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <button className="finish" onClick={generarCodigo}>Generate code</button>
                            <div className="copyAddrs">
                                <p className="textoM2">2-. Copy your code</p>
                                <div className="wallet">
                                    <input type="text" id="wallet" value={code} onChange={(e) => setCode(e.target.value)} readOnly />
                                    <button onClick={handleCopyCode} ><i class="bi bi-copy"></i></button>
                                </div>
                            </div>
                            <button className="close" onClick={onOpenClose}><span>Close</span></button>
                        </div>
                        <div className="notasqr">
                            <div><p className="textoM3">How to make a payment by invoice?</p></div>
                            <div className="nota">
                                <img src={img1} className="imgSec2-qr" alt="qric" />
                                <p>{nota3.intruccion1}</p>
                            </div>
                            <div className="nota">
                                <img src={img2} className="imgSec2-qr" alt="qric" />
                                <p>{nota3.instruccion2} </p>
                            </div>
                            <div className="nota">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>{nota3.advertencia1} </p>
                            </div>
                            <div className="nota">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>{nota3.advertencia2} </p>
                            </div>
                        </div>
                    </>
                )}

            </div>
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

export default QrComponent