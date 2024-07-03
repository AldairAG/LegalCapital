import { useState, useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';
import "./Cart.css"
import CartModel from "../../model/CartModel";
import AlertMsgError from "../../components/AlertMsg/AlertMsgError";
import AlertMsg from "../../components/AlertMsg/AlertMsg";
const Cart = (props) => {
    const [visible, setVisible] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [envio, SetEnvio] = useState(0)
    const [productos, setProductos] = useState([])
    const [opcion, setOpcion] = useState(1)
    const [msj, setMsj] = useState(false)
    const [msjE, setMsjE] = useState(false)
    const [txt, setTxt] = useState("")

    const openClose = () => {
        setVisible(!visible)
        const db = getDatabase();
        const userRef = ref(db, 'carritos/' + props.keyF + "/productos");  // Reemplaza 'USER_ID' con el ID del usuario

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProductos(data);
            } else {
                setProductos([])
            }
        });

        return () => unsubscribe();
    }

    useEffect(() => {
        const sumCantidad = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
        const sumPrecio = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

        setSubtotal(sumPrecio)
        if (sumCantidad < 4) {
            SetEnvio("8.00")
            setTotal(sumPrecio + 8)
        } else {
            setTotal(sumPrecio)
            SetEnvio(0.00)
        }
    }, [productos]);

    const realizarCompra = async () => {
        if (productos.length === 0) {
            setMsjE(true)
            setTxt("You don't have any products")
        } else {
            const cart = new CartModel(props.keyF)
            const resultado = await cart.realizarCobro(opcion, total)
            if (resultado) {
                setMsjE(true)
                setTxt(resultado)
            } else {
                setMsj(true)
                setTxt("Your order was created successfully")
                setProductos([])
            }
        }
    }

    const eliminarProducto = async (index) => {
        const cart = new CartModel(props.keyF)
        const prodcuts = await cart.getFromDatabase()
        const productos = prodcuts.productos
        if (index >= 0 && index < productos.length) {
            const nuevosProductos = productos.filter((_, i) => i !== index);
            cart.eliminarProducto(nuevosProductos)
        } else {
            console.error('Índice no válido');
        }
    }

    return (
        <section className="Cart-ec">
            <button className="cartbtn" onClick={openClose}><i class="bi bi-cart-fill"></i></button>
            {visible && (
                <section className="cart-modal-ec">
                    <div className="overlay-ec">
                        <AlertMsg visible={msj} setVisible={setMsj} texto={txt} />
                        <AlertMsgError visible={msjE} setVisible={setMsjE} texto={txt} />
                    </div>
                    <div className="contenido-cart">
                        <div className="sec0-ecc"><button onClick={openClose}><i class="bi bi-x"></i></button></div>
                        <div className="sec1-ecc"><p>Shopping cart</p></div>
                        <div className="sec2-ecc">
                            {productos && productos.length > 0 ? (
                                productos.map((item, index) => (
                                    <div className="s21-ecc">
                                        <div className="item-ecc">
                                            <p>{item.nombre}</p>
                                            <span>{item.precio} USDT x {item.cantidad}</span>
                                        </div>
                                        <button onClick={() => eliminarProducto(index)}><i class="bi bi-x"></i></button>
                                    </div>
                                ))) : (
                                <p>You have no added products</p>
                            )}
                        </div>
                        <div className="sec3-ecc"><p>Subtotal: </p><p>{subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec4-ecc"><p>Shipping: </p><p>{envio} USDT</p></div>
                        <div className="sec5-ecc"><p>Total: </p><p>{total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec6-ecc">  <select className="payment-select" value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                            <option value={1}>Wallet de Dividendos: {props.wd.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                            <option value={2}>Wallet de Comisiones: {props.wc.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                        </select></div>
                        <div className="sec7-ecc"><button onClick={realizarCompra}>Pay</button></div>
                    </div>
                </section>
            )}
        </section>
    )
}
export default Cart