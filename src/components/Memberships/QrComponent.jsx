import "./styles/QrComponent.css"
import React, { useState } from 'react';

const QrComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={togglePopup}>Select</button>
            {isOpen && (
                <div className="modal">
                    <div onClick={togglePopup} className="overlay"></div>
                    <div className="modal-content">
                        <h2>titulo</h2>
                        <p>
                        qr
                        </p>
                        <button className="close-modal" onClick={togglePopup}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QrComponent