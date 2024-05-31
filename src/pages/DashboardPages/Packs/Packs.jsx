import React, { useState, useEffect } from 'react';
import Aviso from '../../../components/Aviso/Aviso';
import "./Packs.css"
import Pack from "../../../components/Pack/Pack";
import img1 from "../../../Assets/Images/Logos/packs/builder.png"
import img2 from "../../../Assets/Images/Logos/packs/bronze.png"
import img3 from "../../../Assets/Images/Logos/packs/plata.png"
import img4 from "../../../Assets/Images/Logos/packs/gold.png"
import img5 from "../../../Assets/Images/Logos/packs/platinum.png"
import QrComponent from "../../../components/QrComponent/QrComponent"

const Packs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [opc, setOpc] = useState(0);
    const [img, setImg] = useState("");

    return (
        <section className='contenido Packs'>
            <QrComponent visible={isVisible} setIsVisible={setIsVisible} op={opc} img={img}/>
            <div className="titulos sec0-pa">
                <i className="bi bi-boxes"></i>
                <span>Starter packs</span>
            </div>
            <div className="sec1-pa centrado"><Pack img={img1} setImg={setImg} porcent={5} setOpc={setOpc} op={1} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
            <div className="sec2-pa centrado"><Pack img={img2} setImg={setImg} porcent={6} setOpc={setOpc} op={2} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
            <div className="sec3-pa centrado"><Pack img={img3} setImg={setImg} porcent={7} setOpc={setOpc} op={3} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
            <div className="sec4-pa centrado"><Pack img={img4} setImg={setImg} porcent={8} setOpc={setOpc} op={4} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
            <div className="sec5-pa centrado"><Pack img={img5} setImg={setImg} porcent={9} setOpc={setOpc} op={5} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
        </section>
    )
}

export default Packs