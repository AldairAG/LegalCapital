import { useState } from "react"
import "./CardProduct.css"
const CardProduct = (props) => {
    const [visible, setVisible] = useState(false)

    const openClose = () => {
        setVisible(!visible)
    }

    return (
        <section>
            {visible && (
                <div className="detalles">
                    <div className="ov"></div>
                    <div className="content-ec">
                        <div className="sec4-pec"><button onClick={openClose}><i class="bi bi-x"></i></button></div>
                        <div className="sec5-pec"><img src={props.img} alt="producto" /></div>
                        <div className="sec6-pec"></div>
                    </div>
                </div>
            )}
            <section className={visible ? "CardProduct2" : "CardProduct"}>
                <div className="sec0-pec"><img src={props.img} alt="producto" /></div>
                <div className="sec1-pec"><p>{props.nombre}</p></div>
                <div className="sec2-pec"><p>{props.desc}</p></div>
                <div className="sec3-pec">
                    <p>{props.precio} USDT</p>
                    <button onClick={openClose}>Buy now</button>
                </div>
            </section>
        </section>
    )
}
export default CardProduct