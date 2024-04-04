import React from "react";
import "./styles/MainDiv.css"
import MSComponent from "./MSComponent";
import WelcomeDiv from "./WelcomeDiv";

const MainDiv = () => {
    return (
        <div className="contain">
            <WelcomeDiv/>
            <div className="ms">
                <span >Memberships</span>
                <div className="planes">
                    <MSComponent plan="Plan basic" precio="250.0" />
                    <MSComponent plan="Plan pro" precio="500.0" />
                </div>
            </div>
        </div>
    )
}

export default MainDiv