import { useEffect, useState } from "react";
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import Common from "../../../components/js/Common";
import "./Dividendos.css"

const Dividendos = (props) => {
    const [userModels, setUserModels] = useState([])
    const [find, setFind] = useState('');
    const [filterConcept, setFilterConcept] = useState('');

    useEffect( () => {
        switch (filterConcept) {
            case '1':

                break;
            case '2':

                break;
            case '3':

                break;
            case '4':

                break;
            case '5':

                break;
            default:
                break;
        }
    }, [filterConcept]);

    const manejarCambioInput = (event) => {
        setFind(event.target.value);
    };
    const manejarCambioSelect = (event) => {
        setFilterConcept(event.target.value);
    };
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "history");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const historys = Object.values(snapshot.val());
            const filteredHistorys = historys.filter(history => history.userName == props.userName);
            setUserModels(filteredHistorys);
        } else {
            alert("error");
        }
    }

    return (
        <section className="seccionDividendos">
            <div className="divTitulo">
                <h2>Dividends</h2>
                <div className="export">
                    <button >
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
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
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
                        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Date
                            </th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Time
                            </th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Amount
                            </th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Type
                            </th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
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