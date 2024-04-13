import React from 'react';
import "./CopyLink.css"


const CopyLink = (props) => {

    const handleCopy = () => {
        const inputElement = document.getElementById("invitationLink");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <div className="contain-link">
            <span>Invitation Link:</span>

            <div className="link">
                <input id='invitationLink' type="text" value={"https://legalcapital-corp.com/register/" + props.username} readOnly />
                <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
            </div>

        </div>
    )
}

export default CopyLink