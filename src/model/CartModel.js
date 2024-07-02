import appFirebase from "../firebase-config";
import { getDatabase, ref, set, remove, get } from "firebase/database";
import Common from "../components/js/Common"
import OrdenModel from "./OrdenModel"
import AlertMsjError from "../components/AlertMsg/AlertMsgError"
export default class CartModel {
    constructor(owner) {
        this.owner = owner;
    }

    async getFromDatabase() {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = ref(db, `carritos/${this.owner}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return null
            }
        } catch (error) {
            console.error('Error getting data from Firebase', error);
            return null
        }
    }

    async crearCarrito(producto) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `carritos/${this.owner}`);
            const carrito = await this.getFromDatabase();
            let data;
            if (carrito) {
                data = {
                    owner: this.owner,
                    productos: Array.isArray(carrito.productos) ? carrito.productos : []
                };
            } else {
                data = {
                    owner: this.owner,
                    productos: []
                };
            }
            data.productos.push(producto);
            await set(newRef, data);
            console.log('Producto agregado correctamente:', producto);
            return true; // Indica que la operación fue exitosa
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            return false; // Indica que la operación falló
        }
    }

    async limpiarCarrito(firebaseKey) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `carritos/${firebaseKey}/productos`);
            await remove(newRef);
        }catch (error) {
            console.error('Error al realizar el cobro:', error);
        }
    }

    async realizarCobro(wallet, total) {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const cart = await this.getFromDatabase();
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `users/${user.firebaseKey}`);
            console.log(cart)
            if (wallet === 1) {
                if (user.walletDiv < total) {
                    throw new Error('Insufficient funds in Wallet');
                } else {
                    user.walletDiv = user.walletDiv - total;
                }
            } else if (wallet === 2) {
                if (user.walletCom < total) {
                    throw new Error('Insufficient funds in Wallet');
                } else {
                    user.walletCom = user.walletCom - total;
                }
            }
            
            await set(newRef, user);
            extractDB.saveInHistory(user.userName, -total, "Buy in marketplace", "");
            const ordenData = new OrdenModel(new Date().toISOString(), "Pending", total, "", cart.productos, user.userName);
            ordenData.creaOrden();
            await this.limpiarCarrito(user.firebaseKey)

            return null;
        } catch (error) {
            console.error('Error al realizar el cobro:', error);
            return error.message;
        }
    }


}