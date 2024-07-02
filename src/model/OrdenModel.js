import appFirebase from "../firebase-config";
import { getDatabase, ref, set, push } from "firebase/database";
export default class Orden {
    constructor(fecha, estado, totalPagar, numeroRastreo, productos,owner) {
        this.fecha = fecha;
        this.estado = estado;
        this.numeroOrden = this.generateUniqueId();
        this.totalPagar = totalPagar;
        this.numeroRastreo = numeroRastreo;
        this.productos = productos;
        this.owner=owner;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    async creaOrden() {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `ordenes/`);
            const orden={
                fecha: this.fecha,
                estado: this.estado,
                numeroOrden: this.numeroOrden,
                totalPagar: this.totalPagar,
                numeroRastreo: this.numeroRastreo,
                productos: this.productos,
                owner:this.owner
            }   
            await push(newRef, orden);
        } catch (e) {
            console.error("Error al agregar la orden: ", e);
        }
    }

    /*async editarEnFirebase(id) {
        try {
            const ordenRef = doc(db, "ordenes", id);
            await setDoc(ordenRef, {
                fecha: this.fecha,
                estado: this.estado,
                numeroOrden: this.numeroOrden,
                totalPagar: this.totalPagar,
                numeroRastreo: this.numeroRastreo,
                productos: this.productos
            }, { merge: true });
            console.log("Orden actualizada con ID: ", id);
        } catch (e) {
            console.error("Error al actualizar la orden: ", e);
        }
    }

    static async obtenerDeFirebase(id) {
        try {
            const docRef = doc(db, "ordenes", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Datos de la orden:", docSnap.data());
                return docSnap.data();
            } else {
                console.log("No se encontró la orden.");
                return null;
            }
        } catch (e) {
            console.error("Error al obtener la orden: ", e);
            return null;
        }
    }*/
}

/*// Ejemplo de uso:
const productosEjemplo = [
    { cantidad: 2, precioUnitario: 15.00 },
    { cantidad: 1, precioUnitario: 25.00 }
];

const nuevaOrden = new Orden(
    new Date().toISOString(),
    'Pendiente',
    55.00,
    '1234567890',
    productosEjemplo
);

// Crear una nueva orden en Firebase
nuevaOrden.crearEnFirebase();

// Editar una orden existente en Firebase (debes pasar el ID de la orden existente)
// nuevaOrden.editarEnFirebase('ID_EXISTENTE');

// Obtener una orden existente de Firebase (debes pasar el ID de la orden existente)
// Orden.obtenerDeFirebase('ID_EXISTENTE').then(data => console.log(data));
*/