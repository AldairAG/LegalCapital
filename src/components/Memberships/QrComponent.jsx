import "./styles/QrComponent.css"
import React, { useState } from 'react';

const QrComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };


    return (
        <div className="compQR">
            <button onClick={togglePopup} className="btnOpen">Select</button>
            {isOpen && (


                <div className="modalMain">
                    <div onClick={togglePopup} className="overlay"></div>

                    <div className="modal-content">
                        <button className="close-modal" onClick={togglePopup}>
                            <i class="bi bi-x-square-fill"></i>
                        </button>
                        <h2>Payment information</h2>
                        <img className="qr" />
                        <div>
                            <span>Wallet address</span>
                            <div className="wallet">
                                <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                                <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                            </div>
                            <span>Price</span>
                            <input type="text" readOnly value={props.price} />
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