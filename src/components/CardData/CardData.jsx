import "./CardData.css"
import React, { useState, useEffect } from 'react';
import img1 from "../../Assets/Images/Logos/usdt.png"
const CardData = (props) => {
    const [valor, setValor] = useState(0.00);

    useEffect(() => {
        setValor(props.dato || 0.00);
    }, [props.dato]);


    return (
        <section className="contain-data">
            <div className="case">
                <p class="text-sm text-muted-foreground">{props.titulo}</p>
                <div className="case2">
                    <img src={img1} alt="logo_usdt" />
                    <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{props.dato} USDT</h3>
                </div>
            </div>
        </section>
    )
}
export default CardData