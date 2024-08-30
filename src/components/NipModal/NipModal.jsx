import React, { useEffect, useState } from 'react';
import "./NipModal.css"
import Common from '../js/Common';
import AlertMsgError from "../../components/AlertMsg/AlertMsgError.jsx"
import AlertMsg from "../../components/AlertMsg/AlertMsg.jsx"
import PeticionModel from "../../model/PeticionModel.js"

const NipModal = ({ correctNip, onOpenClose, updatedUserData, modalNip, funcion, monto, wallet, fetch, opcion }) => {
  const [inputNip, setInputNip] = useState('');
  const [error, setError] = useState('');
  const openClose = onOpenClose
  const [visibleE, setVisibleE] = useState(false);
  const [visible, setVisible] = useState(false);
  const [msj, setMsj] = useState("");
  const [authTF, setAuthTF] = useState(false)

  if (!modalNip) return

  const validarFuncion = () => {
    if (funcion) {
      sendRequest(monto, wallet)
    } else {
      verificarNip()
    }
  }

  const sendRequest = (monto) => {
    const floatValue = parseFloat(monto);
    const common = new Common();
    let seleccion
    if (opcion) {
      seleccion = 1
    } else {
      seleccion = 2
    }
    const peticionModel = new PeticionModel("Retiro", floatValue, seleccion)
    /*if (wallet === 1) {
      //common.saveInHistory(updatedUserData.userName, -monto, "dividend wallet withdrawl", "Dividend wallet")
    } else if (wallet === 2) {
      //common.saveInHistory(updatedUserData.userName, -monto, "commission wallet withdrawl", "Commission wallet")
    }*/
    peticionModel.saveRetiro().then(() => {
      setVisible(true)
      setMsj("Request submitted successfully")
      fetch()
      onOpenClose()
      setInputNip("")
    })
  }

  const verificarNip = () => {
    const common = new Common();
    if (inputNip === correctNip) {
      common.editAnyUser(updatedUserData).then(() => {
        setMsj("Changes made successfully");
        setVisible(true);
        onOpenClose();
        setInputNip("")
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
      {/*authTF ? (*/
        <div className="modal-contentNip">
          <p>Enter your NIP</p>
          <input type="password" value={inputNip} onChange={(e) => setInputNip(e.target.value)} maxLength={4} placeholder="Enter 4-digit NIP" />
          <div className='botones'>
            <button onClick={openClose}>Close</button>
            <button onClick={validarFuncion} className='azul'>Verify</button>
          </div>
        </div>
      /*) : (
        <div className='modal-contentNip'>
          <p>Complete two-step verification to create your PIN</p>
          <button onClick={openClose}>Close</button>
        </div>
      )*/}

    </section>
  );
};

export default NipModal;
