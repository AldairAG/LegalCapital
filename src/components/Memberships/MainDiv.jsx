import React from "react";
import "./styles/MainDiv.css"
import CopyLink from "../CopiLink/CopyLink";
import ShowStats from "../ShowStats/ShowStats";


const MainDiv = () => {
    return (
        <div className="seccion-main">

            <div className="seccion1-h">
                <img alt="logo" />
                <p>
                    You're embarking on a journey towards financial
                    success with Legal Capital Corp. We provide the tools
                    and support for your financial goals. Welcome aboard!
                </p>

                <div className="seccion2-h">
                    <CopyLink />
                </div>
            </div>

            <div className="seccion3-h">
                <ShowStats tittle="Total income:" stat={"$"} ic="bi bi-wallet2" />
                <div className="seccion4-h">
                    <button className="boton-redondo"><i class="bi bi-plus-lg"></i></button>
                    <p>deposit to your account</p>
                </div>
            </div>
        </div>
    )
}
/*
             <div className="seccion3-h">

                    <div className="total-income">
                        <div>
                            <p className="titulo">Total income:</p>
                            <p>$</p>
                        </div>
                        <div className="icon">
                            <i class="bi bi-wallet2"></i>
                        </div>
                    </div>

                    <div className="vigenci">
                        <i class="bi bi-calendar-event"></i>
                        <p>Next payment</p>
                        <p>00/00/0000</p>
                    </div>

                </div>
*/

export default MainDiv