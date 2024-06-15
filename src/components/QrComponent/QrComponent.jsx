import "./QrComponent.css"
import React, { useState } from 'react';
import QrData from "./QrData";
import qr from "../../Assets/Images/qr/qrms.png"
import img1 from "../../Assets/flaticons/qrfi.png"
import img2 from "../../Assets/flaticons/copyfi.png"
import img3 from "../../Assets/flaticons/advertecniafi.png"


const QrComponent = (props) => {
    const [opcion, setOpcion] = useState(0);

    const closeModal = () => {
        props.setIsVisible(false);
    }
    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setOpcion(value);
        console.log(opcion)
    };
    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
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
        const qrData = new QrData(opcion)
        qrData.setRequest()
        props.setIsVisible(false);
    }

    return (
        <section className={props.visible ? 'compQR' : 'none'}>
            <div className="overlay"></div>
            <div className="modal-content">
                <div className="sec1-qr">
                    <div className="s1-qr">
                        <p className="textoM3">Complete the payment</p>
                    </div>
                    <div className="s2-qr">
                        <img src={qr} alt="qr" />
                    </div>
                    <div className="s3-qr">
                        <p >Wallet address to pay</p>
                        <div className="wallet">
                            <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                            <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                        </div>
                    </div>
                    <div className="s4-qr">
                        <p>Amount</p>
                        <div className="amount">
                            <select className="select-box" value={opcion} onChange={handleChange} >
                                {generarOpciones(props.op)}
                            </select>
                        </div>
                    </div>
                    <div className="s5-qr">
                        <button className="boton3" onClick={closeModal}><span>Close</span></button>
                        <button className="boton2" onClick={() => setRequestHandle(opcion)}>Finish payment</button>
                    </div>
                    <div className="s11-qr">
                        <p>Press the button "Finish payment" to complete the request</p>
                    </div>
                </div>
                <div className="sec2-qr">
                    <div className="s6-qr"><p className="textoM3">How to make a deposit?</p></div>
                    <div className="s7-qr">
                        <img src={img1} className="imgSec2-qr" alt="qric" />
                        <p>Scan the Qr code with your payment app</p>
                    </div>
                    <div className="s8-qr">
                        <img src={img2} className="imgSec2-qr" alt="qric" />
                        <p>Copy the USDTT address and
                            amount to pay, then paste them
                            into your payment app
                        </p>
                    </div>
                    <div className="s9-qr">
                        <img src={img3} className="imgSec2-qr" alt="qric" />
                        <p>Transfer only Tether USD TRC20
                            token (USDTT). Transferring
                            other currency will result in the
                            toss of funds
                        </p>
                    </div>
                    <div className="s10-qr">
                        <img src={img3} className="imgSec2-qr" alt="qric" />
                        <p>
                            Make sure to correctly send the transaction, verifying the exact amount and that the Wallet is correct.
                            Any sending error will result in the loss of funds.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

/*
 <div className="secqr1">
                    <button className="close-modal" onClick={closeModal}><i class="bi bi-x-square-fill"></i></button>
                </div>
                <div className="secqr2">
                    <p className="tituloQr">PAYMENT INFORMATION</p>
                    <img className="qr" />
                </div>
                <div className="secqr3">
                    <span>Wallet address</span>
                    <div className="wallet">
                        <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                        <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                    </div>

                    <span>Price</span>
                    <div className="select-container">
                        <select className="select-box" value={opcion} onChange={handleChange} >
                            {generarOpciones(props.op)}
                        </select>
                        <div className="icon-container">
                            <i class="bi bi-caret-down-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="secqr4">
                    <div className="seccionPack">
                        <p>Starter pack</p>
                        <img src={props.img} alt="stp" />
                    </div>
                    <div className="seccionNota">
                        <p>Once your transaction is completed, you will receive a notification to your registered email of approval.<br /> <br />
                            <span>Important Note: Make sure to correctly send the transaction, verifying the exact amount and that the
                                Wallet is correct. Any sending error will result in the loss of funds.</span></p>
                    </div>
                </div>
                <div className="secqr5">
                    <button className="boton1" onClick={() => setRequestHandle(opcion)}>
                        <span  class="button_top">End</span>
                    </button>
                </div>  
*/

export default QrComponent