import "./MyRed.css"
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

const MyRed = (props) => {
    const [tablaVisible, setTableVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [fetchCounter, setFetchCounter] = useState(0);

    const toggleTabla = () => {
        setTableVisible(!tablaVisible);
    };

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

    const generador = (usuarios, sponsor) => {
        const items = [];
        let userNivel=[]

        const explorarNivel = (sponsor, nivelActual, nivelRequerido) => {

            if (nivelActual > 7) {
                return
            }
            const filteredUsers = usuarios.filter(user => user.referredBy == sponsor);

            if (filteredUsers.length === 0) {
                return
            }
            if (nivelActual === nivelRequerido) {
                userNivel.push(...filteredUsers)
                console.log(userNivel)
                return
            }
            for (const user of filteredUsers) {
                explorarNivel(user.userName, nivelActual + 1, nivelRequerido)
            }

        };

        for (let i = 0; i < 7; i++) {
            userNivel=[]
            explorarNivel(sponsor, 1, i+1)
            items.push(
                 
            );

        }

    }

    return (
        <section className="seccionMyRed">
            <div className="divTitulo">
                <h2>My net</h2>
            </div>
            <div className="nivel">
                <div className="nivelCard" onClick={toggleTabla}>
                    <div className="nivelCard0-1">
                        <div className="nivelCard1">
                            <div className="nivelCard-2"><span>1</span></div>
                            <div className="nivelCard-3">
                                <span className="sp1">Nivel 1</span>
                                <span className="sp2">0 Users</span>
                            </div>
                        </div>
                        <div className="nivelCard2">
                            <span className="sp2"> Capital:</span>
                            <span className="sp1">12,500 USDT</span>
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
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="h-5 w-5"
                            >
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="nivelCard0-2">
                        {tablaVisible && (
                            generador(users, props.userName)
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
    /*     <div className="myRedTable">
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
                {users.map((item, index) => (
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
    </div> */
}
export default MyRed