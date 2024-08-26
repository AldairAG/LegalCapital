import "./InteresCompuesto.css"
import IntCompFor from "../IntCompFor/IntCompFor"
import { useState, useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';
import Common from "../js/Common";
import AlertMsg from "../AlertMsg/AlertMsg";
import AlertMsgError from "../AlertMsg/AlertMsgError";

const InteresCompuesto = ({ keyF }) => {
    const [modal2, setModal2] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleE, setVisibleE] = useState(false)
    const [userData, setUserData] = useState([])
    const [activar, setActivar] = useState(false)
    const [periods, setPeriods] = useState(false)
    const [msj, setMsj] = useState("")

    const openClose2 = () => {
        setModal2(!modal2)
    }
    const openClose = () => {
        setModal1(!modal1)
    }

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + keyF);  // Reemplaza 'USER_ID' con el ID del usuario

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, [keyF]);

    const validarInteres = () => {
        if (userData && userData.finIntComp && userData.finIntComp !== "") {
            setActivar(true);
            console.log("Interés compuesto activo:", userData.finIntComp);
        }
    };

    useEffect(() => {
        validarInteres()
    }, [userData])

    const save = () => {
        try {
            editarUser();
        } catch (error) {
            setVisibleE(true);
            setMsj("Something went wrong try again");
            console.log(error)
        }
    };

    const editarUser = () => {
        const common = new Common();
        const updatedUser = { ...userData };
        let interesCompuesto = []
        if (userData.intComp) {
            interesCompuesto = userData.intComp.split("");
        } else {
            interesCompuesto = ["0", "0"];
        }
        if (interesCompuesto[0] == 0 && !updatedUser.finIntComp) {
            updatedUser.finIntComp = addYear()
            interesCompuesto[0] = 1
        }
        updatedUser.intComp = interesCompuesto.join("");
        common.editAnyUser(updatedUser).then(() => {
            setVisible(true);
            setMsj("Compound interest activated");
            validarInteres()
            openClose()
        }).catch((error) => {
            setVisibleE(true);
            setMsj("Something went wrong try again");
            console.log(error)
        })
    };

    const addYear = () => {
        const years = periods / 12
        const today = new Date();
        today.setFullYear(today.getFullYear() + years);

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${day}-${month}-${year}`;
    };


    return (
        <section className="IComp">
            <IntCompFor isOpen={modal2} closeModal={openClose2} />
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            <AlertMsgError visible={visibleE} setVisible={setVisibleE} texto={msj} />
            {renderModal1()}
            <header><p>Compound interest in mandatory terms</p></header>
            <div className="datos">
                <div className="datoDiv">
                    <div className="dato">
                        <span>Accumulated capital</span>
                        <input type="text" value={userData.capitalIntComp || 0} readOnly />
                    </div>
                    <div className="dato">
                        <span>End of term</span>
                        <input type="text" value={userData.finIntComp || "---"} readOnly />
                    </div>
                </div>
                <div className="state">
                    <p>State:</p>
                    {activar ? (
                        <span className="green"><i class="bi bi-circle-fill"></i> Active</span>
                    ) : (
                        <span className="red"><i class="bi bi-circle-fill"></i> Disable</span>
                    )}
                </div>
                <div className="botones">
                    <button className="azul" onClick={openClose2}>Calculate</button>
                    <button disabled={activar} onClick={openClose}><i class="bi bi-power"></i> Activate</button>
                </div>
            </div>
        </section>
    )



    function renderModal1() {
        return (
            modal1 && (
                <div className="modal1">
                    <div className="overlay"></div>
                    <div className="modal1-content">
                        <div className="header">
                            <button onClick={openClose}><i className="bi bi-x"></i></button>
                        </div>
                        <div className="body">
                            <p>By activating compound interest you will not be able to make withdrawals.</p>
                            <div className="inputs">
                                <span>Select the number of periods</span>
                                <select name="periodos" value={periods} onChange={(e) => setPeriods(e.target.value)}>
                                    <option value={12}>12 Month</option>
                                    <option value={24}>24 Month</option>
                                    <option value={36}>36 Month</option>
                                    <option value={48}>48 Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="botones">
                            <button onClick={openClose} className="boton1"><p className="button_top">Cancel</p></button>
                            <button onClick={save} className="boton1"><p className="button_top">Save</p></button>
                        </div>
                    </div>
                </div>
            )
        );
    }

}

export default InteresCompuesto