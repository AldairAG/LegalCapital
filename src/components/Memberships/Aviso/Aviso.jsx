import "./Aviso.css"
import React, { useState, useEffect } from 'react';

const Aviso = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.userData && props.userData.validity !== "" && props.userData.validity !== "unpaid") {
            setVisible(false);
          }
      }, []);

    return (
        <div className={`aviso${visible ? '' : '-0'}`}>
            <div className="aviso1">
                <img alt="advertencia" />
                <p>
                    <h2>Legal Capital Corp</h2><h3>Oficina Virtual</h3>
                    <br />
                    <span>Su cuenta aún no está activa</span>
                    <br />
                    <br />
                    Todavía no hemos identificado la confirmación de pago de un paquete de incio.
                    <br />
                    <br />
                    Si ya ha elegido un paquete de inicio, pruebe recargar la pagina. Si realizó el pago, el acceso a la oficina será completamente liberado tan pronto como se confirme.
                    <br />
                    <br />
                    Si aún no ha realizado un pedido de activación, haga clic en el botón de abajo:
                </p>
            </div>

            <button class="cta">
                <span class="hover-underline-animation"> Shop now </span>
                <svg
                    viewBox="0 0 46 16"
                    height="10"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                    id="arrow-horizontal">
                    <path
                        transform="translate(30)"
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        data-name="Path 10"
                        id="Path_10"></path>
                </svg>
            </button>

        </div>
    )
}
export default Aviso