import { useState } from "react"
import "./Support.css"

const Support = () => {
    const [motivo, setMotivo] = useState("")


    return (
        <section className="support">
            <div className="sec0-sp">
                <i className="bi bi-exclamation-octagon"></i>
                <span>Support</span>
            </div>
            <div className="sec1-sp">
                <label for="support-options">Seleccione una opción de soporte:</label>
                <div class="custom-select-wrapper">
                    <select id="support-options" class="custom-select">
                        <option value="general">Soporte General</option>
                        <option value="technical">Soporte Técnico</option>
                        <option value="billing">Soporte de Facturación</option>
                        <option value="sales">Soporte de Ventas</option>
                    </select>
                </div>
            </div>
            <div className="sec2-sp">
                <p>Tell us your problem</p>
                <input type="text" />
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