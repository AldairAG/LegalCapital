import "./EditarUsuario.css"
import TextInput from "../../../components/TextInput/TextInput"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import AlertMsg from "../../../components/AlertMsg/AlertMsg.jsx";
import Common from "../../../components/js/Common";
import { useHistory } from 'react-router-dom';
import appFirebase from "../../../firebase-config.js";
import ToggleButton from "../../../components/ToggleButton/ToggleButton.jsx";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
const auth = getAuth(appFirebase)

const EditarUsuario = () => {
    const [userData, setUserData] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [telefono, setTelefono] = useState("")
    const [walletDir, setWalletDir] = useState("")
    const [igualacion, setIgualacion] = useState("")
    const [fastTrack, setFastTrack] = useState("")
    const [ingresoResidual, setIngresoResidual] = useState("")
    const [rangoResidual, setRangoResidual] = useState("")
    const [referenciaDirecta, setReferenciaDirecta] = useState("")
    const [rango, setRango] = useState("")
    const [referido, setReferido] = useState("")
    const [walletCom, setWalletCom] = useState("")
    const [walletDiv, setWalletDiv] = useState("")
    const { fk } = useParams();
    const [visible, setVisible] = useState(false)
    const [msj, setMsj] = useState("")
    const history = useHistory();
    const [visibleAlert, setVisibleAlert] = useState(false)
    const [fechaInicio, setFechaIncio] = useState("")
    const [gananciasTotales, setGananciasTotales] = useState("")
    const [permisos, setPermisos] = useState("")

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + fk);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setUserName(userData.userName || "");
            setApellidos(userData.lastName || "");
            setName(userData.firstName || "");
            setEmail(userData.email || "");
            setTelefono(userData.phoneNumber || "");
            setWalletDir(userData.usdtAddress || "");
            setFastTrack(userData.bonoFastTrack || 0);
            setIgualacion(userData.bonoIgualacion || 0);
            setIngresoResidual(userData.bonoIngresoRes || 0);
            setRangoResidual(userData.bonoRangoRes || 0);
            setReferenciaDirecta(userData.bonoRefDirect || 0);
            setRango(userData.rank || "no rank");
            setReferido(userData.referredBy || "");
            setFechaIncio(userData.admissionDate || "")
            setWalletCom(userData.walletCom || 0)
            setWalletDiv(userData.walletDiv || 0)
            setGananciasTotales(userData.walletTotal || 0)
            setPermisos(userData.permisos || { promo: false, retiroDiv: true })
            setPassword(userData.password)
            //setIsLoading(false);
        }
    }, [userData]);

    const editarUser = async() => {
        const common = new Common();
        const updatedUser = { ...userData };
        updatedUser.userName = userName
        updatedUser.lastName = apellidos
        updatedUser.firstName = name
        updatedUser.email = email
        updatedUser.phoneNumber = telefono
        updatedUser.usdtAddress = walletDir
        updatedUser.bonoFastTrack = Number(fastTrack)
        updatedUser.bonoIgualacion = Number(igualacion)
        updatedUser.bonoIngresoRes = Number(ingresoResidual)
        updatedUser.bonoRangoRes = Number(rangoResidual)
        updatedUser.bonoRefDirect = Number(referenciaDirecta)
        updatedUser.rank = Number(rango) || 0
        updatedUser.referredBy = referido
        updatedUser.admissionDate = fechaInicio
        updatedUser.walletCom = Number(walletCom)
        updatedUser.walletDiv = Number(walletDiv)
        updatedUser.walletTotal = Number(gananciasTotales)
        updatedUser.permisos = permisos
        updatedUser.password=await cambiarContraseña(password)||""
        common.editAnyUser(updatedUser)
    };

    const cambiarContraseña = async (newPass) => {
        if(userData.password!=newPass){
            const userCredential = await signInWithEmailAndPassword(auth, email, userData.password);
            const userCurrent = userCredential.user;
            await updatePassword(userCurrent, newPass);
            return newPass
        }else{
            return userData.password
        }
    }

    const save = () => {
        try {
            editarUser()
            setVisible(true);
            setMsj("Changes made successfully");
        } catch (error) {
            setMsj("Error saving data");
        }
    };

    const eliminarUsuario = () => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + fk);

        remove(userRef)
            .then(() => {
                setVisible(true);
                setMsj("Successfully deleted user");
                history.push('/admin/gestionar-ususarios');
            })
            .catch((error) => {
                console.error('Error al eliminar el usuario: ', error);
            });
    };

    const regresar = () => {
        history.push('/admin/gestionar-ususarios');
    }
    const close = () => {
        setVisibleAlert(false)
    }
    const open = () => {
        setVisibleAlert(true)
    }
    const updatePermiso = (key, value) => {
        setPermisos({
            ...permisos,
            [key]: value,
        });
    };
    return (
        <section className="EditarUsuario">
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            {visibleAlert && (
                <section className="deleteSection">
                    <div className="overlay-ads"></div>
                    <div className="deleteContain">
                        <div className="sec1-dc"><p>Eliminar al usuario: {userName}</p></div>
                        <div className="sec2-dc">
                            <button onClick={close} className="cancel">Cancelar</button>
                            <button onClick={eliminarUsuario} className="ok">Aceptar</button>
                        </div>
                    </div>
                </section>
            )}
            <section className="botones">
                <div><button onClick={regresar}><p>Regresar</p></button></div>
                <div><button onClick={save}><p>Guardar</p></button></div>
                <div><button onClick={open}><p>Eliminar ususario</p></button></div>
            </section>
            <div><p className="titulo-edtu">Datos personales</p></div>
            <section className="enterData">
                <div><TextInput ti={"Nombre de ususario"} value={userName} setValue={setUserName} /></div>
                <div><TextInput ti={"Contraseña"} value={password} setValue={setPassword} /></div>
                <div><TextInput ti={"E-mail"} value={email} setValue={setEmail} /></div>
                <div><TextInput ti={"Nombre"} value={name} setValue={setName} /></div>
                <div><TextInput ti={"Apellidos"} value={apellidos} setValue={setApellidos} /></div>
                <div><TextInput ti={"Telefono"} value={telefono} setValue={setTelefono} /></div>
                <div><TextInput ti={"Direccion de wallet"} value={walletDir} setValue={setWalletDir} /></div>
                <div><TextInput ti={"Fecha de inscripción"} value={fechaInicio} setValue={setFechaIncio} /></div>
            </section>
            <div><p className="titulo-edtu">Datos de oficinal virtual</p></div>
            <section className="enterData">
                <div><TextInput ti={"wallet de dividendos"} value={walletDiv} setValue={setWalletDiv} /></div>
                <div><TextInput ti={"wallet de comisiones"} value={walletCom} setValue={setWalletCom} /></div>
                <div><TextInput ti={"Ganancias totales"} value={gananciasTotales} setValue={setGananciasTotales} /></div>
                <div><TextInput ti={"Bono fast-Track"} value={fastTrack} setValue={setFastTrack} /></div>
                <div><TextInput ti={"Bono de igualación"} value={igualacion} setValue={setIgualacion} /></div>
                <div><TextInput ti={"Bono ingreso residual"} value={ingresoResidual} setValue={setIngresoResidual} /></div>
                <div><TextInput ti={"Bono rango residual"} value={rangoResidual} setValue={setRangoResidual} /></div>
                <div><TextInput ti={"Bono referencia directa"} value={referenciaDirecta} setValue={setReferenciaDirecta} /></div>
                <div><TextInput ti={"Rango"} value={rango} setValue={setRango} /></div>
                <div><TextInput ti={"Referido"} value={referido} setValue={setReferido} /></div>
            </section>
            <div><p className="titulo-edtu">Permisos</p></div>
            <section className="permisos">
                <div className="permiso"><ToggleButton permiso={permisos.retiroDiv} onToggle={(newValue) => updatePermiso('retiroDiv', newValue)} /><span>Retirar de dividendos</span></div>
                <div className="permiso"><ToggleButton permiso={permisos.promo} onToggle={(newValue) => updatePermiso('promo', newValue)} /><span>Activar promosion de 10%</span></div>
            </section>
        </section>
    )
}
export default EditarUsuario