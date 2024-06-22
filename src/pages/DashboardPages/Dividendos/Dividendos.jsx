import { useEffect, useState } from "react";
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import Common from "../../../components/js/Common";
import "./Dividendos.css"

const Dividendos = (props) => {
    const [userModels, setUserModels] = useState([])
    const [find, setFind] = useState('');
    const [filterConcept, setFilterConcept] = useState("All");
    const [paginaMaxima, setPaginaMaxima] = useState(0)
    const [paginaActual, setPaginaActual] = useState(1)

    const convertArrayOfObjectsToCSV = (array) => {
        const data = [];

        // Agregar encabezados de columna
        const headers = Object.keys(array[0]);
        data.push(headers.map(header => `"${header}"`).join(',')); // Rodear los encabezados por comillas dobles

        // Agregar datos
        array.forEach(obj => {
            const row = [];
            headers.forEach(header => {
                row.push(`"${obj[header]}"`); // Rodear el valor con comillas dobles
            });
            data.push(row.join(',')); // Unir los valores con comas
        });

        return data.join('\n');
    }

    const downloadCSV = () => {
        const csvData = convertArrayOfObjectsToCSV(userModels);
        const filename = "datos.csv";

        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownloadClick = () => {
        downloadCSV()
    }

    useEffect(() => {
        fetchData(filterConcept)
    }, [filterConcept]);

    const manejarCambioInput = (event) => {
        setFind(event.target.value);
    };
    const manejarCambioSelect = (event) => {
        setFilterConcept(event.target.value);
    };

    useEffect(() => {
        fetchData("All", paginaActual);
    }, [paginaActual]);

    const fetchData = async (concept, pagina) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "history");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            if (concept == "All") {
                const historys = Object.values(snapshot.val());
                const filteredHistorys = historys.filter(history => history.userName == props.userName);

                const startIndex = (pagina - 1) * 25;
                const endIndex = startIndex + 25;
                const limitedHistorys = filteredHistorys.slice(startIndex, endIndex);

                setUserModels(limitedHistorys);
                setPaginaMaxima(Math.ceil(filteredHistorys.length / 25));
            }
        } else {
            console.log("No data available");
        }
    }

    const handleNextPage = () => {
        if (paginaActual < paginaMaxima) {
            setPaginaActual(paginaActual + 1);
        }
    }

    const handlePrevPage = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    }

    return (
        <section className="seccionDividendos">
            <div className="sec1-div"><i className="bi bi-graph-up-arrow"></i><h2>Dividends</h2></div>

            <div className="sec4-div">
                            <div className="sec2-div">
                <div className="filtro1">
                    <span >Order by concept: </span>
                    <select name="tipo" id="tipo" value={filterConcept} onChange={(event) => manejarCambioSelect(event)} >
                        <option value="All">All</option>
                        <option value="Direct referral bonus">Direct referral bonus</option>
                        <option value="fast track bonus">fast track bonus</option>
                        <option value="Maintenance fee charge">Maintenance fee charge</option>
                        <option value="Residual fee bonus">Residual fee bonus</option>
                        <option value="Rank residual bonus">Rank residual bonus</option>
                        <option value="Weekly earnings">Weekly earnings</option>
                        <option value="Matching bonus">Matching bonus</option>
                    </select>
                </div>
                <div className="filtro2">
                    <button onClick={handlePrevPage}><i class="bi bi-arrow-left-short"></i></button>
                    <p>Page: {paginaActual}/{paginaMaxima}</p>
                    <button onClick={handleNextPage}><i class="bi bi-arrow-right-short"></i></button>
                </div>
            </div>
            <div className="sec3-div">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Time
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                User
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userModels.map((item, index) => (
                            <tr key={index}>
                                <td className="p-4 align-middle">{item.date}</td>
                                <td className="p-4 align-middle">{item.hora}</td>
                                <td className="p-4 align-middle">{item.cantidad}</td>
                                <td className="p-4 align-middle">{item.concepto}</td>
                                <td className="p-4 align-middle">{item.emisor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </section>
    )
}
export default Dividendos