import img1 from "../../../Assets/Images/Logos/usdt.png";
import "./Retiros.css";
import TextInput from "../../../components/TextInput/TextInput";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertMsg from "../../../components/AlertMsg/AlertMsg";
import AlertMsgError from "../../../components/AlertMsg/AlertMsgError";
import { getDatabase, ref, onValue, get, query, orderByChild, equalTo } from "firebase/database";
import NipModal from "../../../components/NipModal/NipModal";
import appFirebase from "../../../firebase-config";

const Retiros = (props) => {
  const location = useLocation();
  const isWithdrawalsPage = location.pathname === "/Dashboard/withdrawals";

  const [opc1, setOpc1] = useState(true);
  const [opc2, setOpc2] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [visibleMsg, setVisibleMsg] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleNipModal, setVisibleNipModal] = useState(false);
  const [textoMsj, setTextoMsj] = useState("");
  const [userData, setUserData] = useState({});
  const [historial, setHistorial] = useState([]);
  const [wallet, setWallet] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const openCloseNipModal = () => {
    setVisibleNipModal(!visibleNipModal);
  };

  useEffect(() => {
    if (!isWithdrawalsPage) return;

    const fetchUserData = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + props.keyF);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, [isWithdrawalsPage, props.keyF]);

  useEffect(() => {
    if (!isWithdrawalsPage || Object.keys(userData).length === 0) return;

    setWallet(userData.usdtAddress);
    fetchHistorial();
  }, [userData, isWithdrawalsPage]);

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

  const handleChangeOpc = (opc) => {
    setOpc1(opc === 1);
    setOpc2(opc === 2);
  };

  const hasMoreThanTwoDecimals = (num) => {
    const str = num.toString();
    const decimalIndex = str.indexOf(".");
    return decimalIndex !== -1 && str.slice(decimalIndex + 1).length > 2;
  };

  const handleValidacion = () => {
    if (isNaN(parseFloat(cantidad))) {
      setVisibleError(true);
      setTextoMsj("The value you entered is not valid");
    } else if (!wallet) {
      setVisibleError(true);
      setTextoMsj("You have not yet registered your USDT wallet");
    } else if (hasMoreThanTwoDecimals(cantidad)) {
      setVisibleError(true);
      setTextoMsj("The value you entered is not valid");
    } else if (!userData.phoneNumber || !userData.firstName || !userData.lastName) {
      setVisibleError(true);
      setTextoMsj("Complete your profile to be able to withdraw");
    } else if (opc1) {
      const permisos = userData.permisos || { promo: false, retiroDiv: true };
      if (!permisos.retiroDiv) {
        setVisibleError(true);
        setTextoMsj("You are not allowed to perform this action");
      } else if (cantidad > userData.walletDiv) {
        setVisibleError(true);
        setTextoMsj("You do not have enough balance to withdraw this amount");
      } else if (cantidad < 50) {
        setVisibleError(true);
        setTextoMsj("The minimum withdrawal amount is 50 USDT");
      } else if (userData.walletDiv - cantidad < 25) {
        setVisibleError(true);
        setTextoMsj("After withdrawing you need to have at least 25 USDT remaining");
      } else {
        setVisibleNipModal(true);
      }
    } else if (opc2) {
      if (cantidad > userData.walletCom) {
        setVisibleError(true);
        setTextoMsj("You do not have enough balance to withdraw this amount");
      } else if (cantidad < 10) {
        setVisibleError(true);
        setTextoMsj("The minimum withdrawal amount is 10 USDT");
      } else {
        setVisibleNipModal(true);
      }
    }
  };


    return (
        <section className="contenido Retiros">
            <AlertMsgError texto={textoMsj} visible={visibleError} setVisible={setVisibleError} />
            <AlertMsg texto={textoMsj} visible={visibleMsg} setVisible={setVisibleMsg} />
            <NipModal correctNip={userData.nip} onOpenClose={openCloseNipModal} updatedUserData={userData} modalNip={visibleNipModal}
                funcion={true} monto={cantidad} wallet={wallet} fetch={fetchHistorial} opcion={opc1} />
            <div className="titulos titulo-re">
                <i className="bi bi-person-gear"></i>
                <span>Retiros</span>
            </div>
            <div className="contenido-re">
                <div className="se0-re"><p>Select your wallet</p></div>
                <div className="se1-re">
                    <section className={opc1 ? "contain-data seleccionado" : "contain-data"} onClick={() => handleChangeOpc(1)}>
                        <div className="case">
                            <p class="text-sm text-muted-foreground">Dividend wallet</p>
                            <div className="case2">
                                <h3 class="whitespace-nowrap text-2xl font-semibold leadin+g-none tracking-tight">$ {(userData.walletDiv || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</h3>
                                <img src={img1} alt="logo_usdt" />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="se2-re">
                    <section className={opc2 ? "contain-data seleccionado" : "contain-data"} onClick={() => handleChangeOpc(2)}>
                        <div className="case">
                            <p>Comission wallet</p>
                            <div className="case2">
                                <h3>$ {(userData.walletCom || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</h3>
                                <img src={img1} alt="logo_usdt" />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="se3-re">
                    <TextInput ti={"Wallet address"} block={false} value={userData.usdtAddress} setValue={setWallet} />
                </div>
                <div className="se4-re">
                    <TextInput ti={"Amount to withdraw(USDT)"} value={cantidad} setValue={setCantidad} />
                </div>
                <div className="se5-re">
                    <button className="boton4" onClick={handleValidacion}><span>Request withdrawal</span></button>
                </div>
                <div className="notas-re">
                    <p className="textoM2">Important notes:</p>
                    <p className="textoM"><li>You need to have your USDT(TRC20) wallet address registered. If you don't have it yet,<Link to="Profile" className="link"> click here</Link></li></p>
                    <p className="textoM"><li>Withdrawal requests: minimum amount of 50 USDT required for the <span>dividend wallet</span> and minimum amount of 10 USDT required for <span>commission wallet</span>.</li></p>
                    <p className="textoM"><li>All requests will be approved only <span>Monday through Friday</span> starting at 12:00 a.m. (Miami time).</li></p>
                    <p className="textoM"><li>Withdrawal <span>cost of 3% </span>for the total amount requested (Administrative expenses).</li></p>
                    <p className="textoM"><li>When a withdrawal is requested the dividend wallet <span>must have at least 25 USDT</span>.</li></p>
                </div>
            </div>

            <div className="historial-re">
                <div className="sec1-hre">
                    <h2><i class="bi bi-clock-history"></i> History</h2>
                    {/*                     <div className="filtro2">
                        <button onClick={handlePrevPage}><i class="bi bi-arrow-left-short"></i></button>
                        <p>Page: {paginaActual}/{paginaMaxima}</p>
                        <button onClick={handleNextPage}><i class="bi bi-arrow-right-short"></i></button>
                    </div> */}
                </div>
                <div className="sec2-hre">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        historial.length === 0 ? (
                            <p className="aviso-hre">You have not yet made a withdrawal</p>
                        ) : (
                            historial.map((item, index) => (
                                <div>
                                    <div className="cardHistorial" key={index}>
                                        <p>{item.date}</p>
                                        <p className="hora">{item.hora}</p>
                                        <p className="cantidad">{item.cantidad} USDT</p>
                                        <p>{item.emisor}</p>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
        </section >
    )
}

export default Retiros