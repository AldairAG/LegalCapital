import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./Aviso.css"
import React, { useState, useEffect } from 'react';
import { userData } from "three/examples/jsm/nodes/Nodes.js";
import { useHistory } from 'react-router-dom';
import img1 from "../../Assets/Images/Baners_jpg/advertencia.png"

const Aviso = (props) => {
    const [visible, setVisible] = useState(false);
    let location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (props.val === "" || props.val === "unpaid") {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }, [props.val]);

    const goProduct = () => {
        history.push('/Dashboard/packs');
    }

    return (
        visible && (
            <section className={location.pathname === '/Dashboard/packs' ? 'none' : 'Aviso'}>
              <div className="overlay-av"></div>
              <div className="avisoContent">
                <div className="sec0-ev">
                  <img src={img1} alt="signo" />
                </div>
                <div className="sec1-ev">
                  <p>Monthly maintenance payment has not been covered</p>
                </div>
                <div className="sec2-ev">
                  <p>You do not have enough balance to pay the monthly maintenance (25 USDT). Certain functions have been suspended until payment is made again.</p>
                </div>
                <div className="sec3-ev">
                  <button onClick={goProduct}>
                    <p>Buy starter packs</p>
                  </button>
                </div>
              </div>
            </section>
          )
    )
}
export default Aviso