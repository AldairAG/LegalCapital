import "./MyRed.css"
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { RGBA_ASTC_10x10_Format } from "three";

const MyRed = (props) => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [tablaVisible, setTableVisible] = useState(false);
    const [fetchCounter, setFetchCounter] = useState(0);
    const [t1, setT1] = useState(false)
    const [t2, setT2] = useState(false)
    const [t3, setT3] = useState(false)
    const [t4, setT4] = useState(false)
    const [t5, setT5] = useState(false)
    const [t6, setT6] = useState(false)
    const [t7, setT7] = useState(false)

    const toggleTabla = () => {
        setTableVisible(!tablaVisible)
    }; 

    const handleClick = (level) => {
        switch (level) {
            case 1:
                setT1(!t1)
                break;
            case 2:
                setT2(!t2)
                break;
            case 3:
                setT3(!t3)
                break;
            case 4:
                setT4(!t4)
                break;
            case 5:
                setT5(!t5)
                break;
            case 6:
                setT6(!t6)
                break;
            case 7:
                setT7(!t7)
                break;
            default:
                console.log("Nivel no válido");
        }
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

/*     const useDynamicHooks = (numHooks) => {
        const hooks = Array.from({ length: numHooks }, () => useState(null));
    
        const getHookState = (index) => {
            if (index >= 0 && index < numHooks) {
                return hooks[index];
            } else {
                console.error(`Índice de hook fuera de rango: ${index}`);
                return [null, () => {}]; // Devuelve un estado vacío y una función sin acción
            }
        };
    
        return getHookState;
    }; */

    const mostrarResultados = () => {
        const items = [];
        //const getHookState = useDynamicHooks(7);

        for (let i = 0; i < 7; i++) {
           
            let { usersInLevel, sumaTotal } = generador(users, props.userName, i + 1)
            items.push(
                <div className="nivelCard" onClick={toggleTabla} key={i}>
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
                            <span className="sp1">{sumaTotal} USDT</span>
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
                        {tablaVisible && (
                            <div className="myRedTable">
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
                                                    <td className="p-4 align-middle">{item.firtsName}</td>
                                                    <td className="p-4 align-middle">{item.Country}</td>
                                                    <td className="p-4 align-middle">{item.referredBy}</td>
                                                    <td className="p-4 align-middle">{item.staterPack}</td>
                                                    <td className="p-4 align-middle">{item.rank}</td>
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