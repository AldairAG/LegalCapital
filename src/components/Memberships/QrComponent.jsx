import "./styles/QrComponent.css"
import React, { useState } from 'react';
import QrData from "./js/QrData";

const QrComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [numero, setNumero] = useState(99);
    const qrData=new QrData(numero);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };
    const handleNumber= (event) => {
        let nuevoNumero = parseInt(event.target.value);
        if (nuevoNumero < 99 || isNaN(nuevoNumero)) {
          nuevoNumero = 99;
        }
        setNumero(nuevoNumero);
    };
    const handleSetRequest = () => {
        qrData.setRequest()
    };



    return (
        <div className="compQR">
            <button onClick={togglePopup} className="btnOpen">Deposite to your account<i class="bi bi-wallet"></i></button>
            {isOpen && (
                <div className="modalMain">
                    <div onClick={togglePopup} className="overlay"></div>

                    <div className="modal-content">

                        <div className="seccion1-mc">
                            <h2>Payment information</h2>
                            <img className="qr" />
                        </div>

                        <div className="seccion2-mc">
                            <div className="seccion3-mc">

                                <button className="close-modal" onClick={togglePopup}>
                                    <i class="bi bi-x-square-fill"></i>
                                </button>

                                <span>Wallet address</span>
                                <div className="wallet">
                                    <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                                    <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                </div>

                                <span>Price</span>
                                <input type="number" value={numero} onChange={handleNumber} min="99" />

                            </div>


                            <div className="seccion4-mc">
                                <div className="seccion5-mc">
                                    <p>Starter pack</p>
                                </div>

                                <div className="seccion6-mc">
                                    <div className="seccion7-mc">
                                        <p>Capital income will be verified and approved within 24 hours. <span>You will be notified once they have been approved.</span></p>
                                    </div>

                                    <button className="end" onClick={handleSetRequest}>End <i class="bi bi-rocket-takeoff"></i></button>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>


            )}
        </div>
    )
}

/*

*/

export default QrComponent