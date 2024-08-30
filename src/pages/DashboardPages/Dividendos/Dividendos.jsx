import { useEffect, useState } from "react";
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get, query, orderByChild, equalTo, limitToLast, startAfter, limitToFirst } from "firebase/database";
import { useLocation } from "react-router-dom";
import "./Dividendos.css";

// Custom hook to handle Firebase queries
const useFetchData = (userName, concept, pagina, pageSize) => {
    const [historial, setHistorial] = useState([]);
    const [paginaMaxima, setPaginaMaxima] = useState(12); // Fijo en 12 páginas
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userName) return;

        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "history");

        const fetchData = async () => {
            let queryRef;

            if (concept === "All") {
                if (pagina === 1) {
                    // Para la primera página
                    queryRef = query(dbRef, orderByChild("userName"), equalTo(userName), limitToLast(Math.min(500, pageSize)));
                } else {
                    const lastItemKey = await getLastItemKey(db, userName, pagina - 1, pageSize);
                    if (lastItemKey) {
                        queryRef = query(dbRef, orderByChild("userName"), startAfter(lastItemKey), limitToLast(Math.min(500 - (pagina - 1) * pageSize, pageSize)));
                    }
                }
            }

            const snapshot = await get(queryRef);
            if (snapshot.exists()) {
                const historys = Object.values(snapshot.val()).reverse();
                setHistorial(prevModels => pagina === 1 ? historys : [...prevModels, ...historys]);
            }
            setLoading(false);
        };

        fetchData();

        return () => setHistorial([]); // Cleanup

    }, [userName, concept, pagina, pageSize]);

    return { historial, paginaMaxima, loading };
};

const getLastItemKey = async (db, userName, pagina, pageSize) => {
    const dbRef = ref(db, "history");
    const queryRef = query(dbRef, orderByChild("userName"), equalTo(userName), limitToLast(Math.min(500, pagina * pageSize)));
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
        const historys = Object.keys(snapshot.val());
        return historys[historys.length - 1];
    }
    return null;
};

const Dividendos = ({ userName }) => {
    const [filterConcept, setFilterConcept] = useState("All");
    const [paginaActual, setPaginaActual] = useState(1);
    const pageSize = 25;

    const { historial, paginaMaxima, loading } = useFetchData(userName, filterConcept, paginaActual, pageSize);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/Dashboard/benefits") {
            // Cleanup any ongoing async processes if the route changes
            setPaginaActual(1);
            setFilterConcept("All");
        }
    }, [location.pathname]);

    return (
        <section className="seccionDividendos">
            <div className="sec1-div"><i className="bi bi-graph-up-arrow"></i><h2>Dividends</h2></div>

            <div className="sec4-div">
                <div className="sec2-div">
                    <div className="filtro1">
                        <span>Order by concept: </span>
                        <select name="tipo" id="tipo" value={filterConcept} onChange={(e) => setFilterConcept(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Direct referral bonus">Direct referral bonus</option>
                            <option value="fast track bonus">Fast track bonus</option>
                            <option value="Maintenance fee charge">Maintenance fee charge</option>
                            <option value="Residual fee bonus">Residual fee bonus</option>
                            <option value="Rank residual bonus">Rank residual bonus</option>
                            <option value="Weekly earnings">Weekly earnings</option>
                            <option value="Matching bonus">Matching bonus</option>
                        </select>
                    </div>
                    <div className="filtro2">
                        <button onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}><i className="bi bi-arrow-left-short"></i></button>
                        <p>Page: {paginaActual}/{paginaMaxima}</p>
                        <button onClick={() => setPaginaActual(prev => Math.min(prev + 1, paginaMaxima))}><i className="bi bi-arrow-right-short"></i></button>
                    </div>
                </div>
                <div className="sec3-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                historial.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-4 align-middle">{item.date}</td>
                                        <td className="p-4 align-middle">{item.hora}</td>
                                        <td className="p-4 align-middle">{item.cantidad}</td>
                                        <td className="p-4 align-middle">{item.concepto}</td>
                                        <td className="p-4 align-middle">{item.emisor}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Dividendos;
