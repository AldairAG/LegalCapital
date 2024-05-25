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
            <div className="sec1-cl">
                <h4><i class="bi bi-person-fill-add"></i> Invite members</h4>
            </div>
            <div className="sec2-cl">
                <button onClick={handleCopy} ><i class="bi bi-copy"></i> Copy invite link</button>
                <p>Share this link with your friends to invite them to join.</p>
            </div>
            <div className="sec3-cl">
                <input id='invitationLink' type="text" value={"https://legalcapital-corp.com/register/" + props.username} readOnly />
            </div>
        </div>
    )
}

export default CopyLink