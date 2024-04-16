import React, { useState } from 'react';
import "./styles/MainDiv.css"
import CopyLink from "../CopiLink/CopyLink";
import ShowStats from "../ShowStats/ShowStats";
import QRComponent from "./QrComponent"

const MainDiv = (props) => {
    const [totalMN, setTotalMN] = useState(0);
    const [newMN, setNewMN] = useState(0);
    const [totalRF, setTotalRF] = useState(0);
    const [newRF, setNewRF] = useState(0);

    return (
        <div className="seccion-main">
            <div className='seccion-m-1-h'>
                <div className="seccion1-h">
                    <img alt="logo" />
                    <p>
                        You're embarking on a journey towards financial
                        success with Legal Capital Corp. We provide the tools
                        and support for your financial goals. Welcome aboard!
                    </p>

                    <div className="seccion2-h">
                        <CopyLink username={props.userData.userName}/>
                    </div>

                </div>

                <div className="seccion3-h">
                    <ShowStats tittle="Total income:" stat={"$"} ic="bi bi-wallet2" />

                    <div className="seccion4-h">
                        <QRComponent />
                    </div>
                </div>
            </div>

            <div className='seccion-m-2-h'>
                <div className="seccion5-h">
                    <div className='cabecera'>
                        <h1>My network</h1>
                    </div>

                    <div className="stats">
                        <div className="stat">
                            <h2>Total <i class="bi bi-people-fill"></i></h2>
                            <span>{totalMN}</span>
                        </div>
                        <div className="stat">
                            <h2>New <i class="bi bi-person-add"></i></h2>
                            <span>{newMN}</span>
                        </div>
                    </div>
                </div>

                <div className="seccion6-h">
                    <div className='cabecera'>
                        <h1>My direct referrals</h1>
                    </div>
                    <div className="stats">
                        <div className="stat">
                            <h2>Total <i class="bi bi-people-fill"></i></h2>
                            <span>{totalRF}</span>
                        </div>
                        <div className="stat">
                            <h2>New <i class="bi bi-person-add"></i></h2>
                            <span>{newRF}</span>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )

}

export default MainDiv