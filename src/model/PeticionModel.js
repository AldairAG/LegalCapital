import appFirebase from "../firebase-config";
import { getDatabase, ref, set, remove, push } from "firebase/database";
import Common from "../components/js/Common"
export default class Orden {
    constructor(concepto, monto,wallet) {
        this.monto = monto
        this.concepto = concepto
        this.wallet=wallet
    }

    async save() {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner:user.firebaseKey,
                wallet:this.wallet||""
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async saveProducts(list) {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner:user.firebaseKey,
                productos:list||[]
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async saveRetiro() {

        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner:user.firebaseKey,
                usdtAddress:user.usdtAddress,
                wallet:this.wallet||"",
                estado:1,
                hora : extractDB.obtenerHora(),
                fecha : extractDB.obtenerFecha()
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async borrar(firebaseKey) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `peticiones/${firebaseKey}`);
            await remove(newRef);
        } catch (error) {
            console.error('Error al realizar el cobro:', error);
        }
    }

}