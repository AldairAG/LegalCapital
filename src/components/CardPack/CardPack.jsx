import { useEffect, useState } from "react"
import "./CardPack.css"
const CardPack = (props) => {
    const [paquete, setPaquete] = useState("")

    useEffect(() => {
        setPaquete(seleccionarOpcion(props.dato))
    }, [props.dato]);

    const seleccionarOpcion = (num) => {
        switch (true) {
            case num > 99 && num < 500:
                return "BUILDER";
            case num > 499 && num < 2500:
                return "BRONZE";
            case num > 2499 && num < 5000:
                return "SILVER";
            case num > 4999 && num < 10000:
                return "GOLD";
            case num >= 10000:
                return "PLATINUM";
            default:
                return "No pack";
        }
    } 

    return (
        <section className="cardpack">
            <div className="cardpack-s1">
                <p className="pcp1">YOUR PACKAGE</p>
                <p className="pcp2">{paquete}</p>
            </div>
            <div className="cardpack-s2">
                <p className="pcp1">TOTAL CAPITAL:</p>
                <p className="pcp3">{props.dato} USDT</p>
            </div>
        </section>
    )
}

export default CardPack