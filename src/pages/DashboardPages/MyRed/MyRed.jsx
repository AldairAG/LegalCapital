import "./MyRed.css"
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

const MyRed = (props) => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [tablaVisible, setTableVisible] = useState(false);
    const [fetchCounter, setFetchCounter] = useState(0);
    const [arrayOfFlay, setArrayOfFlay] = useState([false, false, false, false, false, false, false])

    const toggleTabla = () => {
        setTableVisible(!tablaVisible)
    };

    const handleClick = (level) => {
        setArrayOfFlay(prevState => {
            const newState = [...prevState];
            newState[level] = !newState[level];
            return newState;
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await getRefData()
            setFetchCounter(fetchCounter + 1);
        };

        if (fetchCounter < 2) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [fetchCounter]);

    const getRefData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            setUsers(users)
        }
    }

    const generador = (usuarios, sponsorMain, nivelMeta) => {
        let usersInLevel = []
        let sumaTotal = 0

        const explorarNivel = (sponsor, nivelActual, nivelRequerido) => {

            if (nivelActual > nivelRequerido) {
                return
            }
            const filteredUsers = usuarios.filter(user => user.referredBy == sponsor);

            for (let user of filteredUsers) {
                if (nivelActual === nivelRequerido) {
                    usersInLevel.push(user)
                    sumaTotal += user.staterPack
                }
                explorarNivel(user.userName, nivelActual + 1, nivelRequerido)
            }

        };
        explorarNivel(sponsorMain, 1, nivelMeta)
        return { usersInLevel, sumaTotal }
    }

    const calcularRango = (numero) => {
        switch (numero) {
            case 1:
                return "Zafiro Ejecutivo"
            case 2:
                return("Ruby Ejecutivo")
            case 3:
                return("Esmeralda Ejecutivo")
            case 4:
                return("Ejecutivo Diamante")
            case 5:
                return("Diamante Azul")
            case 6:
                return("Diamante Negro")
            case 7:
                return("Diamante Royal")
            case 8:
                return("Diamante Corona")
            case 9:
                return("Presidente Royal")
            default:
                return("No Rank")
        }
    }

    const mostrarResultados = () => {
        const items = [];

        for (let i = 0; i < 7; i++) {

            let { usersInLevel, sumaTotal } = generador(users, props.userName, i + 1)
            items.push(
                <div className="nivelCard" onClick={() => handleClick(i + 1)} key={i}>
                    <div className="nivelCard0-1">
                        <div className="nivelCard1">
                            <div className="nivelCard-2"><span>{i + 1}</span></div>
                            <div className="nivelCard-3">
                                <span className="sp1">Nivel {i + 1}</span>
                                <span className="sp2">{usersInLevel ? usersInLevel.length : 0} Users</span>
                            </div>
                        </div>
                        <div className="nivelCard2">
                            <span className="sp2"> Capital:</span>
                            <span className="sp1">{sumaTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</span>
                        </div>
                        <button
                            className="btnDesTab"
                            type="button"
                            aria-controls="radix-:r4:"
                            aria-expanded="false"
                            data-state="closed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="nivelCard0-2">
                        {arrayOfFlay[i + 1] && (
                            <div className="containTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                User
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                registration date
                                            </th>
                                            <th>
                                                Country
                                            </th>
                                            <th>
                                                Sponsor
                                            </th>
                                            <th>
                                                Capital
                                            </th>
                                            <th>
                                                Rank
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersInLevel && usersInLevel.length > 0 ? (
                                            usersInLevel.map((item) => (
                                                <tr key={item.userName}>
                                                    <td className="p-4 align-middle">{item.userName}</td>
                                                    <td className="p-4 align-middle">{item.firstName + " " + item.lastName}</td>
                                                    <td className="p-4 align-middle">{item.admissionDate}</td>
                                                    <td className="p-4 align-middle">{item.Country}</td>
                                                    <td className="p-4 align-middle">{item.referredBy}</td>
                                                    <td className="p-4 align-middle">{item.staterPack.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</td>
                                                    <td className="p-4 align-middle">{calcularRango(item.rank)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="p-4 align-middle">No users in this level</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return items;
    };




    return (
        <section className="seccionMyRed">
            <div className="divTitulo">
                <h2>My net</h2>
            </div>
            <div className="nivel">
                {mostrarResultados()}
            </div>
        </section>
    )
}
export default MyRed