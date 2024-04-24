import React, { useState, useEffect } from 'react';
import Aviso from '../../components/Memberships/Aviso/Aviso';
import "./Packs.css"
import Pack from '../../components/Memberships/Pack/Pack';
import img1 from "../../Assets/Images/Logos/packs/builder.png"
import img2 from "../../Assets/Images/Logos/packs/bronze.png"
import img3 from "../../Assets/Images/Logos/packs/plata.png"
import img4 from "../../Assets/Images/Logos/packs/gold.png"
import img5 from "../../Assets/Images/Logos/packs/platinum.png"
import QrComponent from "../../components/Memberships/QrComponent"


const Packs = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <section className='Packs'>
            <Aviso />
            <QrComponent visible={isVisible}/>
            <div className="containPacks">
                <div className="titulo">
                    <h1>Stater Packs</h1>
                    <i class="bi bi-boxes"></i>
                </div>
                <div className="seccion1-p"><Pack img={img1} isVisible={isVisible} setIsVisible={setIsVisible}/></div>
                <div className="seccion2-p"><Pack img={img2}/></div>
                <div className="seccion3-p"><Pack img={img3}/></div>
                <div className="seccion4-p"><Pack img={img4}/></div>
                <div className="seccion5-p"><Pack img={img5}/></div>
            </div>

        </section>
    )
}

export default Packs