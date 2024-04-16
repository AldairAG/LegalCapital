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
            <div className='header'>
                <h3><i class="bi bi-person-fill-add"></i> Invitation Link:</h3>
            </div>

            <div className="link">
                <input id='invitationLink' type="text" value={"https://legalcapital-corp.com/register/" + props.username} readOnly />
                <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
            </div>

        </div>
    )
}

export default CopyLink