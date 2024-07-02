import "./Ecomerce.css"
import Retiros from "../../../componentsEcomerce/Retiros/Retiros"
import Wallet from "../../../componentsEcomerce/Wallet/Wallet"
import Ordenes from "../../../componentsEcomerce/Ordenes/Ordenes"
import CardProduct from "../../../componentsEcomerce/CardProduct/CardProduct"
import Cart from "../../../componentsEcomerce/Cart/Cart"
import img1 from "../../../Assets/Images/productos/producto1.png"
import img2 from "../../../Assets/Images/productos/producto2.png"
import img3 from "../../../Assets/Images/productos/producto3.png"
import img4 from "../../../Assets/Images/productos/producto4.png"
import img5 from "../../../Assets/Images/productos/producto5.png"
import img6 from "../../../Assets/Images/productos/producto6.png"
import img7 from "../../../Assets/Images/productos/producto7.png"
import img8 from "../../../Assets/Images/productos/producto8.png"
import { useState,useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';

const Ecomerce = (props) => {
    const[userData,setUserData]=useState([])

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + props.keyF);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <section className="Ecomerce">
            <div className="sec0-ec">
                <div>
                    <i class="bi bi-shop"></i> <p>E-comerce</p>
                </div>
                <Cart keyF={props.keyF}/>
            </div>
            <div className="sec1-ec"><p>Discover our exclusive products!</p><br /><span>Don't miss the opportunity to purchase these incredible products</span></div>
            <div className="sec2-ec">
                <div className="s21-ec">
                    <p>Shopping</p>
                </div>
                <div className="s22-ec">
                    <CardProduct img={img1} precio={"35.00"} nombre={"Gold milk"} desc={"Spice up your day"}
                        b1={"Antioxidant"} b2={"Anti-inflammatory"} b3={"Anti carcinogenic"} b4={"Regulates metabolism"} />
                    <CardProduct img={img2} precio={"35.00"} />
                    <CardProduct img={img3} precio={"35.00"} />
                    <CardProduct img={img4} precio={"35.00"} />
                    <CardProduct img={img5} precio={"35.00"} />
                    <CardProduct img={img6} precio={"35.00"} />
                    <CardProduct img={img7} precio={"35.00"} />
                    <CardProduct img={img8} precio={"35.00"} />
                </div>
            </div>
            <div className="sec3-ec">
                <Retiros />
            </div>
            <div className="sec6-ec">
                <div className="s61-ec">Orders</div>
                <div className="s62-ec">
                    <Ordenes />
                </div>
            </div>
            <div className="sec5-ec">
                <div className="s51-ec">
                    <p>Wallet-comerce</p>
                </div>
                <div className="s52-ec">
                    <Wallet />
                </div>
            </div>
        </section>
    )
}
export default Ecomerce