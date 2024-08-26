import React, { useState } from 'react';
import "./NipModal.css"
import Common from '../js/Common';
import AlertMsgError from "../../components/AlertMsg/AlertMsgError.jsx"
import AlertMsg from "../../components/AlertMsg/AlertMsg.jsx"
import PeticionModel from "../../model/PeticionModel.js"

const NipModal = ({ correctNip, onOpenClose, updatedUserData, modalNip, funcion, monto, wallet, fetch }) => {
  const [inputNip, setInputNip] = useState('');
  const [error, setError] = useState('');
  const openClose = onOpenClose
  const [visibleE, setVisibleE] = useState(false);
  const [visible, setVisible] = useState(false);
  const [msj, setMsj] = useState("");

  if (!modalNip) return

  const validarFuncion = () => {
    if (funcion) {
      sendRequest(monto, wallet)
    } else {
      verificarNip()
    }
  }

  const sendRequest = (monto, wallet) => {
    const floatValue = parseFloat(monto);
    const common = new Common();
    const peticionModel = new PeticionModel("Retiro", floatValue, wallet)
    if (wallet === 1) {
      //common.saveInHistory(updatedUserData.userName, -monto, "dividend wallet withdrawl", "Dividend wallet")
    } else if (wallet === 2) {
      //common.saveInHistory(updatedUserData.userName, -monto, "commission wallet withdrawl", "Commission wallet")
    }
    peticionModel.saveRetiro()
    fetch()
  }

  const verificarNip = () => {
    const common = new Common();
    if (inputNip === correctNip) {
      common.editAnyUser(updatedUserData).then(() => {
        setMsj("Changes made successfully");
        setVisible(true);
        onOpenClose();
      }).catch(() => {
        setMsj("Error");
        setVisibleE(true);
      })
    } else {
      setMsj("Invalid NIP");
      setVisibleE(true);
    }
  }

  return (
    <section className="ModalNip">
      <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
      <AlertMsgError visible={visibleE} setVisible={setVisibleE} texto={msj} />
      <div className='overlay'></div>
      <div className="modal-contentNip">
        <p>Enter your NIP</p>
        <input type="password" value={inputNip} onChange={(e) => setInputNip(e.target.value)} maxLength={4} placeholder="Enter 4-digit NIP" />
        <div className='botones'>
          <button onClick={openClose}>Close</button>
          <button onClick={validarFuncion} className='azul'>Verify</button>
        </div>
      </div>
    </section>
  );
};

export default NipModal;
