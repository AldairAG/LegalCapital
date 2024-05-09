import { useEffect, useState } from "react";
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import Common from "../../../components/js/Common";
import "./Dividendos.css"

const Dividendos = (props) => {
    const [userModels, setUserModels] = useState([])
    const [find, setFind] = useState('');
    const [filterConcept, setFilterConcept] = useState("All");

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
        console.log(userModels)
    }, [filterConcept]);

    const manejarCambioInput = (event) => {
        setFind(event.target.value);
    };
    const manejarCambioSelect = (event) => {
        setFilterConcept(event.target.value);
    };

    const fetchData = async (concept) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "history");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            if (concept == "All") {
                const historys = Object.values(snapshot.val());
                const filteredHistorys = historys.filter(history => history.userName == props.userName);
                setUserModels(filteredHistorys);
            } else {
                const historys = Object.values(snapshot.val());
                const filteredHistorys = historys.filter(history => {
                    return history.concepto === concept && history.userName === props.userName;
                });
                setUserModels(filteredHistorys);
            }
        } else {
            alert("error");
        }
    }

    return (
        <section className="seccionDividendos">
            <div className="divTitulo">
                <h2>Dividends</h2>
                <div className="export">
                    <button onClick={handleDownloadClick} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5 mr-2"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                        Export
                    </button>
                </div>
            </div>

            <div className="filtros">
                <div className="filtro1">
                    <span >Order by concept: </span>
                    <select name="tipo" id="tipo" value={filterConcept} onChange={(event) => manejarCambioSelect(event)} >
                        <option value="All">All</option>
                        <option value="Direct referral bonus">Direct referral bonus</option>
                        <option value="fast track bonus">fast track bonus</option>
                        <option value="Maintenance fee charge">Maintenance fee charge</option>
                        <option value="Residual fee bonus">Residual fee bonus</option>
                        <option value="Launch promotion">Launch promotion</option>
                        <option value="Rank residual bonus">Rank residual bonus</option>
                        <option value="Weekly earnings">Weekly earnings</option>
                        <option value="Matching bonus">Matching bonus</option>

                    </select>
                </div>
                <div className="filtro2">
                    <span >Find by Sponsor: </span>
                    <input
                        type="text"
                        value={find}
                        onChange={manejarCambioInput}
                        placeholder="username"
                    />
                </div>
            </div>

            <div className="containTable">
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
                                Sponsor
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
        </section>
    )

}
export default Dividendos