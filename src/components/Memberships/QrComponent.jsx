import "./styles/QrComponent.css"
import React, { useState } from 'react';
import QrData from "./js/QrData";

const QrComponent = (props) => {
    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <section className={props.visible ? 'compQR' : 'none'}>
            <div className="modalMain">
                <div  className="overlay"></div>

                <div className="modal-content">

                    <div className="seccion1-mc">
                        <h2>Payment information</h2>
                        <img className="qr" />
                    </div>

                    <div className="seccion2-mc">
                        <div className="seccion3-mc">

                            <button className="close-modal">
                                <i class="bi bi-x-square-fill"></i>
                            </button>

                            <span>Wallet address</span>
                            <div className="wallet">
                                <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                                <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                            </div>

                            <span>Price</span>
                            <input type="number" min="99" />

                        </div>


                        <div className="seccion4-mc">
                            <div className="seccion5-mc">
                                <p>Starter pack</p>
                            </div>

                            <div className="seccion6-mc">
                                <div className="seccion7-mc">
                                    <p>Capital income will be verified and approved within 24 hours. <span>You will be notified once they have been approved.</span></p>
                                </div>

                                <button className="end" >End <i class="bi bi-rocket-takeoff"></i></button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    )
}

/*

*/

export default QrComponent