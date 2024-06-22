import { useState } from "react";
import "./Anuncio2.css"
import img1 from "../../Assets/Images/Logos/Logo_2.png"
import img2 from "../../Assets/Images/Baners_jpg/din.png"
import img3 from "../../Assets/Images/Baners_jpg/din2.png"
const Anuncio2 = () => {
    const [visible, setVisible] = useState(true);

    const handleClick=()=>{
        setVisible(false)
    }

    return (
        visible && (
            <section className="Anuncio2">
                <div className="overlay-av"></div>
                <div className="anuncio2-content">
                    <div className="sec0-anu2">
                        <p>Dear clients of <span>Legal capital Corp</span></p>
                    </div>
                    <div className="sec1-anu2">
                        <p><span>Important!</span> Starting Friday, June 19, compound interest will be automatically activated</p>
                    </div>
                    <div className="sec2-anu2">
                        <p>How to disable compound interest?</p>
                    </div>
                    <div className="sec3-anu2">
                        <p>1-.Go to the <span>edit profile</span> section</p>
                        <img src={img2} alt="" />
                    </div>
                    <div className="sec4-anu2">
                        <p>2-.Press the button to disable compound interest and press <span>save</span> to save the changes</p>
                        <img src={img3} alt="" />
                    </div>
                    <div className="sec5-anu2">
                        <button onClick={handleClick}>Close</button>
                    </div>
                </div>
            </section>
        )
    )
/*     <div className="overlay-av"></div>
                <div className="anuncio-content">
                    <div className="sec0-anu">
                        <img src={img1} alt="" />
                    </div>
                    <div className="sec1-anu">
                        <p>
                            Dear Clients <span>Legal Capital Corp LLC</span>, Our support and systems team is always on
                            Continuous improvement for your virtual office experience.
                            New tools, support, compound interest and more, adding more features and <span>elite experiences</span>,
                            We are pleased to announce <span>great Surprises and features</span>.
                        </p>
                    </div>
                    <div className="sec2-anu">
                        <p>In the next few hours you will be able to see our commitment to improve and have control of your Finances.</p>
                    </div>
                    <div className="sec3-anu">
                        <p>Atte. Legalcapital Corp LLC</p>
                        <p>support@legalcapital-corp.com</p>
                    </div>
                    <div className="sec4-anu">
                        <button onClick={handleClick}>Close</button>
                    </div>
                </div> */
}
export default Anuncio2