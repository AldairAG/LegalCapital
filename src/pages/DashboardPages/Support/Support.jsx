import { useState } from "react"
import "./Support.css"
import Email from "../../../components/js/Email"

const Support = (props) => {
    const [motivo, setMotivo] = useState("Soporte General")
    const [mensaje, setMensaje] = useState("")

    const sendEmail=()=>{
        const email=new Email(props.email,"template_zkw75fr")
        email.sendEmailSupport(motivo,props.userName,mensaje)
    }


    return (
        <section className="support">
            <div className="sec0-sp">
                <i className="bi bi-exclamation-octagon"></i>
                <span>Support</span>
            </div>
            <div className="sec1-sp">
                <label for="support-options">Seleccione el problema que presenta:</label>
                <div class="custom-select-wrapper">
                    <select id="support-options" class="custom-select" onChange={(e) => setMotivo(e.target.value)}>
                        <option value="Soporte General">Soporte General</option>
                        <option value="la acreditación de dividendos">No recibi correctamente mis dividendos</option>
                        <option value="la acreditacion de comisiones">No recibi correctamente mis comisiones</option>
                        <option value="un retiro pendiente">Tengo un retiro pendiente</option>
                        <option value="la compra de un paquete de inicio (Aun no se refleja)">Compre un paquete de inicio (Aun no se refleja)</option>
                        <option value="la actulizacion datos generales">Soporte de actulizacion datos generales</option>
                    </select>
                </div>
            </div>
            <div className="sec2-sp">
                <p>Tell us your problem</p>
                <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Write your problem here" />
            </div>
            <div className="sec3-sp">
            <button class="btn2" onClick={sendEmail}>Send</button>

            </div>
            <div className="sec4-sp">
                <div className="contenido">
                    <p>We do our best to solve all your problems and provide you with quality service.</p>
                    <img alt="support_img" />
                </div>
            </div>
        </section>
    )
}
export default Support