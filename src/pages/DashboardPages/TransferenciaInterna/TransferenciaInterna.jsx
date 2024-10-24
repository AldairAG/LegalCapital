import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import "./TransferenciaInterna.css";
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


const TransferenciaInterna = (props) => {
  const location = useLocation();
  const isWithdrawalsPage = location.pathname === "/Dashboard/withdrawals";

  const [visibleMsg, setVisibleMsg] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [textoMsj, setTextoMsj] = useState("");

  const [cantidad, setCantidad] = useState("");
  const [userName, setUserName] = useState("")
  const [seleccionado, setSeleccionado] = useState(1)

  const [historial, setHistorial] = useState([]);
  const [userData, setUserData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleNipModal, setVisibleNipModal] = useState(false);




  const fetchHistorial = async () => {
    if (!isWithdrawalsPage) return;

    try {
      const db = getDatabase(appFirebase);
      const dbRef = ref(db, "history");
      const snapshot = await get(query(dbRef, orderByChild("userName"), equalTo(userData.userName)));

      if (snapshot.exists()) {
        const filteredHistorys = Object.values(snapshot.val())
          .filter(({ concepto }) => concepto?.toLowerCase().includes("withdrawl"))
          .reverse();

        setHistorial(filteredHistorys);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isWithdrawalsPage) return;

    fetchHistorial()
  }, [userData])

  useEffect(() => {
    if (!isWithdrawalsPage) return;

    fetch()

  }, [isWithdrawalsPage]);

  function fetch() {
    const userRepo = new Common()
    userRepo.fetchUserData().then(user => {
      setUserData(user)
      setIsLoading(false)
    }).catch(error => {
      console.error("Error al obtener el usuario:", error);
    });
  }

  function validacion(wallet, userData, trasnferenciaMinima, tipoWallet, cantidad) {
    const errores = {
      invalidValue: "The value you entered is not valid",
      notUser: "The user does not exist",
      completeProfile: "Complete your profile to be able to withdraw",
      insufficientBalance: "You do not have enough balance to withdraw this amount",
      minWithdrawal: `The minimum withdrawal amount is ${trasnferenciaMinima} USDT`,
      minBalanceAfterWithdraw: "After withdrawing you need to have at least 25 USDT remaining",
      retiroActivo: "you already have a pending withdrawal",

    };

    const mostrarError = (mensaje) => {
      setVisibleError(true);
      setTextoMsj(mensaje);
      return false;
    };

    if (isNaN(parseFloat(cantidad)) || hasMoreThanTwoDecimals(cantidad)) {
      console.log(cantidad)
      return mostrarError(errores.invalidValue);
    }

    if (cantidad > wallet) {
      return mostrarError(errores.insufficientBalance);
    }

    if (cantidad < trasnferenciaMinima) {
      return mostrarError(errores.minWithdrawal);
    }

    if (tipoWallet === 1 && userData.walletDiv - cantidad < 25) {
      return mostrarError(errores.minBalanceAfterWithdraw);
    }

    if (wallet < cantidad + cantidad * 0.03) {
      return mostrarError(errores.insufficientBalance);
    }

    if(!userExist){
      return mostrarError(errores.notUser);
    }

    // Si todas las validaciones pasan
    return true;
  }

  function hasMoreThanTwoDecimals(num) {
    const str = num.toString();
    const decimalIndex = str.indexOf(".");
    return decimalIndex !== -1 && str.slice(decimalIndex + 1).length > 2;
  };

  const changeSeleccion = (opc) => {
    setSeleccionado(opc)
  }

  const openCloseNipModal = () => {
    const trasnferenciaMinima = 50
    const wallet = seleccionado == 1 ? userData.walletDiv : userData.walletCom
    if (visibleNipModal) {
      setVisibleNipModal(false)
    } else {
      if (validacion(wallet, userData, trasnferenciaMinima, seleccionado, cantidad)) setVisibleNipModal(!visibleNipModal);
    }
  };

  const userExist = () => {
    const userRepo = new Common()
    userRepo.getUserDataByName(userName).then(user => {
      return true
    }).catch(error => {
      return false
    });
  }


  const Transferir = () => {
    let walletSelec
    const trasnferenciaMinima=50
    if (seleccionado == 1) {
      userData.walletDiv -= cantidad
      walletSelec=userData.walletDiv
    } else {
      userData.walletCom -= cantidad
      walletSelec=userData.walletDiv
    }
    if(!validacion(walletSelec,userData,trasnferenciaMinima,seleccionado,cantidad)) return 

    const userRepo = new Common()
    userRepo.editAnyUser(userData).then(()=>{
      userRepo.saveInHistory(userData.userName, -cantidad,"Internal transfer", "", "")
      userRepo.getUserDataByName().then(user =>{
        userData.walletDiv += cantidad
        userRepo.saveInHistory(user.userName, cantidad,"Internal transfer", userData.userName, "")
      })
    })
 //"'s internal transfer"
  }

  return (
    <section className="contenido Retiros">
      <AlertMsgError texto={textoMsj} visible={visibleError} setVisible={setVisibleError} />
      <AlertMsg texto={textoMsj} visible={visibleMsg} setVisible={setVisibleMsg} />
      <NipModal correctNip={userData.nip} onOpenClose={openCloseNipModal} modalNip={visibleNipModal} proceso={Transferir} />
      <section className="titulos titulo-re">
        <i className="bi bi-cash-coin"></i>
        <span>Transferencias internas</span>
      </section>

      <section className="contenido">
        <section className="retirar">
          <p className="titulo">Select your wallet</p>
          <div className="wallets">
            {WalletOpcion("Divident wallet", userData.walletDiv, 1)}
            {WalletOpcion("Comission wallet", userData.walletCom, 2)}
          </div>
          <TextInput ti={"User"} block={false} value={userName} setValue={setUserName} />
          <TextInput ti={"Amount to withdraw(USDT)"} value={cantidad} setValue={setCantidad} />
          <button className="boton4" onClick={openCloseNipModal}><span>Transfer</span></button>
        </section>

        <section className="notas">
          <p className="textoM2">Important notes:</p>
          <p className="textoM"><li>You need to have your USDT(TRC20) wallet address registered. If you don't have it yet,<Link to="Profile" className="link"> click here</Link></li></p>
          <p className="textoM"><li>Withdrawal requests: minimum amount of 50 USDT required for the <span>dividend wallet</span> and minimum amount of 10 USDT required for <span>commission wallet</span>.</li></p>
          <p className="textoM"><li>All requests will be approved only <span>Monday through Friday</span> starting at 12:00 a.m. (Miami time).</li></p>
          <p className="textoM"><li>Withdrawal <span>cost of 3% </span>for the total amount requested (Administrative expenses).</li></p>
          <p className="textoM"><li>When a withdrawal is requested the dividend wallet <span>must have at least 25 USDT</span>.</li></p>
        </section>
      </section>

      <section className="historial">
        <div className="titulo">
          <h2><i class="bi bi-clock-history"></i> History</h2>
        </div>

        <table>
          <tbody>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              historial.length > 0 ? (
                historial.map((item) => (
                  <tr>
                    <td >{item.date}</td>
                    <td >{item.hora}</td>
                    <td><span>{item.cantidad} USDT</span></td>
                    <td className={item.state == 1 ? "r" : "acept"}>{item.state == 1 ? <span><i class="bi bi-x-circle"></i> Denied</span> : <span><i class="bi bi-check2-circle"></i>  Approved</span>}</td>
                    <td >{item.emisor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <p className="aviso">You have not yet made a withdrawal</p>
                </tr>
              )
            )}
          </tbody>
        </table>
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

export default TransferenciaInterna