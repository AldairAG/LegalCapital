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
        <section className='Packs'>
            <Aviso />
            <QrComponent visible={isVisible} setIsVisible={setIsVisible} op={opc} img={img}/>
            <div className="containPacks">
                <div className="titulo">
                    <h1>Stater Packs</h1>
                    <i class="bi bi-boxes"></i>
                </div>
                <div className="seccion1-p"><Pack img={img1} setImg={setImg} setOpc={setOpc} op={1} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
                <div className="seccion2-p"><Pack img={img2} setImg={setImg} setOpc={setOpc} op={2} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
                <div className="seccion3-p"><Pack img={img3} setImg={setImg} setOpc={setOpc} op={3} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
                <div className="seccion4-p"><Pack img={img4} setImg={setImg} setOpc={setOpc} op={4} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
                <div className="seccion5-p"><Pack img={img5} setImg={setImg} setOpc={setOpc} op={5} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
            </div>

        </section>
    )
}

export default Packs