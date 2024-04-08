import React from "react";
import "./styles/MainDiv.css"
import MSComponent from "./MSComponent";
import WelcomeDiv from "./WelcomeDiv";

const MainDiv = () => {
    return (
        <div className="containMain">
            <WelcomeDiv/>
            <div className="containMS">
                <span >Memberships</span>
                <div className="containMSC">
                    <MSComponent plan="basic" precio="250.0" />
                    <MSComponent plan="pro" precio="500.0" />
                </div>
            </div>
        </div>
    )
}

export default MainDiv