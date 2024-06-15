import "./EditarUsuario.css"
import TextInput from "../../../components/TextInput/TextInput"
const EditarUsuario=()=>{
    return(
        <section className="EditarUsuario">
            <div className="sec0-edtu"><p className="titulo-edtu">Datos personales</p></div>
            <div className="sec1-edtu"><TextInput ti={"Nombre de ususario"}/></div>
            <div className="sec2-edtu"><TextInput ti={"E-mail"}/></div>
            <div className="sec3-edtu"><TextInput ti={"Nombre"}/></div>
            <div className="sec4-edtu"><TextInput ti={"Apellidos"}/></div>
            <div className="sec5-edtu"><TextInput ti={"Telefono"}/></div>
            <div className="sec6-edtu"><TextInput ti={"Direccion de wallet"}/></div>
            <div className="sec7-edtu"></div>
            <div className="sec8-edtu"><p className="titulo-edtu">Datos de oficinal virtual</p></div>
            <div className="sec9-edtu"><TextInput ti={"Bono fast-Track"}/></div>
            <div className="sec10-edtu"><TextInput ti={"Bono de igualación"}/></div>
            <div className="sec11-edtu"><TextInput ti={"Bono ingreso residual"}/></div>
            <div className="sec12-edtu"><TextInput ti={"Bono rango residual"}/></div>
            <div className="sec13-edtu"><TextInput ti={"Bono referencia directa"}/></div>
            <div className="sec14-edtu"><TextInput ti={"Rango"}/></div>
            <div className="sec15-edtu"><TextInput ti={"Referido"}/></div>
            <div className="sec18-edtu"><p className="titulo-edtu">Permisos</p></div>
            <div className="sec19-edtu"><button><p>Guardar</p></button></div>
            <div className="sec20-edtu"><button><p>Eliminar ususario</p></button></div>
            <div className="sec21-edtu"><button><p>Regresar</p></button></div>
        </section>
    )
}
export default EditarUsuario