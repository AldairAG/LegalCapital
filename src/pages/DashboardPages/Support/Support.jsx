import { useState } from "react"
import "./Support.css"
import Email from "../../../components/js/Email"

const Support = () => {
    const [motivo, setMotivo] = useState("")
    const [mensaje, setMensaje] = useState("")


    return (
        <section className="support">
            <div className="sec0-sp">
                <i className="bi bi-exclamation-octagon"></i>
                <span>Support</span>
            </div>
            <div className="sec1-sp">
                <label for="support-options">Seleccione el problema que presenta:</label>
                <div class="custom-select-wrapper">
                    <select id="support-options" class="custom-select">
                        <option value="general">Soporte General</option>
                        <option value="technical">No recibi correctamente mis dividendos</option>
                        <option value="billing">No recibi correctamente mis comisiones</option>
                        <option value="sales">Tengo un retiro pendiente</option>
                        <option value="sales">Compre un paquete de inicio (Aun no se refleja)</option>
                        <option value="sales">Soporte de actulizacion datos generales</option>
                    </select>
                </div>
            </div>
            <div className="sec2-sp">
                <p>Tell us your problem</p>
                <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Write your problem here" />
            </div>
            <div className="sec3-sp">
            <button class="btn2">Send</button>

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