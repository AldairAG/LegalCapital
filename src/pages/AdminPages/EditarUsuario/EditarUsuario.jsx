import "./EditarUsuario.css"
import TextInput from "../../../components/TextInput/TextInput"
import { useState ,useEffect} from "react"
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue,remove } from 'firebase/database';
import AlertMsg from "../../../components/AlertMsg/AlertMsg.jsx";
import Common from "../../../components/js/Common";
import { useHistory } from 'react-router-dom';

const EditarUsuario=()=>{
    const [userData,setUserData]=useState("")
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [apellidos,setApellidos]=useState("")
    const [telefono,setTelefono]=useState("")
    const [walletDir,setWalletDir]=useState("")
    const [igualacion,setIgualacion]=useState("")
    const [fastTrack,setFastTrack]=useState("")
    const [ingresoResidual,setIngresoResidual]=useState("")
    const [rangoResidual,setRangoResidual]=useState("")
    const [referenciaDirecta,setReferenciaDirecta]=useState("")
    const [rango,setRango]=useState("")
    const [referido,setReferido]=useState("")
    const { fk } = useParams();
    const [visible,setVisible]=useState(false)
    const [msj,setMsj]=useState("")
    const history = useHistory();
    const [visibleAlert,setVisibleAlert]=useState(false)
    const [fechaInicio,setFechaIncio]=useState("")

    useEffect(() => {
        const db =getDatabase();
        const userRef = ref(db, 'users/'+fk);

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
            setFastTrack(userData.bonoFastTrack || "");
            setIgualacion(userData.bonoIgualacion || "");
            setIngresoResidual(userData.bonoIngresoRes || "");
            setRangoResidual(userData.bonoRangoRes || "");
            setReferenciaDirecta(userData.bonoRefDirect || "");
            setRango(userData.rank || "no rank");
            setReferido(userData.referredBy || "");
            setFechaIncio(userData.admissionDate||"")
            //setIsLoading(false);
        }
    }, [userData]);

    const editarUser = () => {
        const common = new Common();
        const updatedUser = { ...userData };
        updatedUser.userName=userName
        updatedUser.lastName=apellidos
        updatedUser.firstName=name
        updatedUser.email=email
        updatedUser.phoneNumber=telefono
        updatedUser.usdtAddress=walletDir
        updatedUser.bonoFastTrack=Number(fastTrack)
        updatedUser.bonoIgualacion=Number(igualacion)
        updatedUser.bonoIngresoRes=Number(ingresoResidual)
        updatedUser.bonoRangoRes=Number(rangoResidual)
        updatedUser.bonoRefDirect=Number(referenciaDirecta)
        updatedUser.rank=Number(rango)
        updatedUser.referredBy=referido
        updatedUser.admissionDate=fechaInicio
        common.editAnyUser(updatedUser);
    };

    const save = () => {
        try {
            editarUser();
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
    return(
        <section className="EditarUsuario">
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            {visibleAlert &&(
                <section className="deleteSection">
                    <div className="overlay-ads"></div>
                    <div className="deleteContain">
                        <div className="sec1-dc"><p>Eliminar al usuario: {userName}</p></div>
                        <div className="sec2-dc">
                            <button  onClick={close} className="cancel">Cancelar</button>
                            <button onClick={eliminarUsuario} className="ok">Aceptar</button>
                        </div>
                    </div>
                </section>
            )}
            <div className="sec0-edtu"><p className="titulo-edtu">Datos personales</p></div>
            <div className="sec1-edtu"><TextInput ti={"Nombre de ususario"} value={userName} setValue={setUserName}/></div>
            <div className="sec2-edtu"><TextInput ti={"E-mail"} value={email} setValue={setEmail}/></div>
            <div className="sec3-edtu"><TextInput ti={"Nombre"} value={name} setValue={setName}/></div>
            <div className="sec4-edtu"><TextInput ti={"Apellidos"} value={apellidos} setValue={setApellidos}/></div>
            <div className="sec5-edtu"><TextInput ti={"Telefono"} value={telefono} setValue={setTelefono}/></div>
            <div className="sec6-edtu"><TextInput ti={"Direccion de wallet"} value={walletDir} setValue={setWalletDir}/></div>
            <div className="sec7-edtu"><TextInput ti={"Fecha de inscripción"} value={fechaInicio} setValue={setFechaIncio}/></div>
            <div className="sec8-edtu"><p className="titulo-edtu">Datos de oficinal virtual</p></div>
            <div className="sec9-edtu"><TextInput ti={"Bono fast-Track"} value={fastTrack} setValue={setFastTrack}/></div>
            <div className="sec10-edtu"><TextInput ti={"Bono de igualación"} value={igualacion} setValue={setIgualacion}/></div>
            <div className="sec11-edtu"><TextInput ti={"Bono ingreso residual"} value={ingresoResidual} setValue={setIngresoResidual}/></div>
            <div className="sec12-edtu"><TextInput ti={"Bono rango residual"} value={rangoResidual} setValue={setRangoResidual}/></div>
            <div className="sec13-edtu"><TextInput ti={"Bono referencia directa"} value={referenciaDirecta} setValue={setReferenciaDirecta}/></div>
            <div className="sec14-edtu"><TextInput ti={"Rango"} value={rango} setValue={setRango}/></div>
            <div className="sec15-edtu"><TextInput ti={"Referido"} value={referido} setValue={setReferido}/></div>
            <div className="sec18-edtu"><p className="titulo-edtu">Permisos</p></div>
            <div className="sec19-edtu"><button onClick={save}><p>Guardar</p></button></div>
            <div className="sec20-edtu"><button onClick={open}><p>Eliminar ususario</p></button></div>
            <div className="sec21-edtu"><button onClick={regresar}><p>Regresar</p></button></div>
        </section>
    )
}
export default EditarUsuario