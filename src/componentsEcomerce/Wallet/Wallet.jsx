import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDatabase, ref, get, query, equalTo, orderByChild } from "firebase/database";
import appFirebase from "../../firebase-config";
import "./Wallet.css";
import img1 from "../../Assets/Images/Logos/usdt.png";

const Wallet = (props) => {
    const [wallet, setWallet] = useState(0);
    const [historial, setHistorial] = useState([]);
    const location = useLocation();

    const fetchData = async () => {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = ref(db, "history");

            // Crear una consulta que filtre por 'concepto' y 'userName'
            const historyQuery = query(dbRef, orderByChild("userName"), equalTo(props.currentUser));

            const snapshot = await get(historyQuery);

            if (snapshot.exists()) {
                const historys = Object.values(snapshot.val());
                // Filtrar solo aquellos que coincidan con 'Purchase commission'
                const filteredHistorys = historys
                    .filter(history => history.concepto === "Purchase commission")
                    .reverse();
                setHistorial(filteredHistorys);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        if (location.pathname === "/Dashboard/E-comerce") {
            fetchData();
        }
    }, [location.pathname, props.currentUser]);

    return (
        <section className="Wallet-ec">
            <div className="sec0-wec"><p>Current balance</p></div>
            <div className="sec1-wec">
                <div>
                    <img src={img1} alt="ustd_logo" />
                    <p>{(props.walletEc || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p>
                </div>
                {/* <button>Add</button> */}
            </div>
            <div className="sec2-wec"><p>transaction history</p></div>
            <div className="sec3-wec">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Hour
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Concepto
                            </th>
                            <th>
                                Emisor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial && historial.length > 0 ? (
                            historial.map((item) => (
                                <tr key={item.userName}>
                                    <td className="p-4 align-middle">{item.date}</td>
                                    <td className="p-4 align-middle">{item.hora}</td>
                                    <td className="p-4 align-middle">{item.cantidad}</td>
                                    <td className="p-4 align-middle">{item.concepto}</td>
                                    <td className="p-4 align-middle">{item.emisor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 align-middle">No history</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )

}
export default Wallet