import appFirebase from "../firebase-config";
import { getDatabase, ref, query, orderByChild, onValue, equalTo, push } from "firebase/database";
import Common from "../components/js/Common";
export default class Orden {
    constructor(estado, totalPagar, numeroRastreo, productos, owner) {
        this.estado = estado;
        this.numeroOrden = this.generateUniqueId();
        this.totalPagar = totalPagar;
        this.numeroRastreo = numeroRastreo;
        this.productos = productos;
        this.owner = owner;
    }

    generateUniqueId() {
        const timestamp = Date.now(); // Obtener el timestamp actual en milisegundos
        const randomPart = Math.floor(Math.random() * 9000000000) + 1000000000; // Generar un número aleatorio de 1000000000 a 9999999999

        // Concatenar y asegurar que tenga exactamente 10 dígitos
        const uniqueId = timestamp.toString() + randomPart.toString();

        // Tomar solo los primeros 10 caracteres
        return uniqueId.substring(0, 10);
    }
    getCurrentDateDMY() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0'); // Obtener día y asegurar que tenga dos dígitos
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes (0-11) y ajustar a 1-12, luego asegurar dos dígitos
        const year = currentDate.getFullYear();

        return `${day}-${month}-${year}`;
    }

    async creaOrden() {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `ordenes/`);
            const orden = {
                fecha: this.getCurrentDateDMY(),
                estado: this.estado,
                numeroOrden: this.numeroOrden,
                totalPagar: this.totalPagar,
                numeroRastreo: this.numeroRastreo,
                productos: this.productos,
                owner: this.owner
            }
            await push(newRef, orden);
        } catch (e) {
            console.error("Error al agregar la orden: ", e);
        }
    }

    async getOrdenes(setOrdenes) {
        const extractDB = new Common();
        const user = await extractDB.getUserDataR();
        const db = getDatabase(appFirebase);
        const ordersRef = ref(db, 'ordenes/');
        const userOrdersQuery = query(ordersRef, orderByChild('owner'), equalTo(user.userName));

        onValue(userOrdersQuery, (snapshot) => {
            if (snapshot.exists()) {
                const orders = snapshot.val();
                const ordersArray = Object.keys(orders).map(key => ({ id: key, ...orders[key] }));
                setOrdenes(ordersArray);
            } else {
                setOrdenes([]);
            }
        }, (error) => {
            console.error("Error al obtener las órdenes del usuario:", error);
            setOrdenes([]);
        });
    }

    async getAllOrdenes(setOrdenes, estado) {
        let userOrdersQuery
        const db = getDatabase(appFirebase);
        const ordersRef = ref(db, 'ordenes/');
        if (estado != "All") {
            userOrdersQuery = ordersRef.filter(orden => orden.estado === estado);
        }else{
            userOrdersQuery=ordersRef
        }
        onValue(userOrdersQuery, (snapshot) => {
            if (snapshot.exists()) {
                const orders = snapshot.val();
                const ordersArray = Object.keys(orders).map(key => ({ id: key, ...orders[key] }));
                setOrdenes(ordersArray);
            } else {
                setOrdenes([]);
            }
        }, (error) => {
            console.error("Error al obtener las órdenes del usuario:", error);
            setOrdenes([]);
        });
    }
}