import { useEffect, useState } from "react"
import "./CardPack.css"
const CardPack = (props) => {
    const [paquete,setPaquete]=useState("")

    useEffect(() => {
        setPaquete(seleccionarOpcion(props.dato))
      }, []); 

    const seleccionarOpcion=(num)=> {
        let resultado;
        switch (true) {
            case num>100 && num<500:
                resultado = "BUILDER";
                break;
            case num<2500:
                resultado = "BRONZE";
                break;
            case num<5000:
                resultado = "SILVER";
                break;
            case num<10000:
                resultado = "GOLD";
                break;
            case num>10000:
                resultado = "PLATINUM";
                break;
            default:
                resultado = "No pack";
        }
        return resultado;
    }

    return(
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