import appFirebase from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get,set,push} from "firebase/database";
import DepositoModel from "../../model/DepositoModel";

class Common {
    constructor(setUserData) {
        this.setUserData = setUserData
    }

    isNullOrEmpty(value) {
        return value === null || value === undefined || value === '' || value === ' ';
    }

    getCurrentUser = () => {
        const auth = getAuth();
        return auth.currentUser
    };

    getUserData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const currentUserEmail = this.getCurrentUser();
            const user = users.find(user => user.email === currentUserEmail.email);
            if (user) {
                this.setUserData(user);
            } else {
                alert("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    }
    getUserDataR = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const currentUserEmail = this.getCurrentUser();
            const user = users.find(user => user.email === currentUserEmail.email);
            if (user) {
                return user
            } else {
                alert("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    }

    addToWallet = async (username,cantidad) => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const usuarioEncontrado = users.find(user => user.userName === username);

                if (usuarioEncontrado) {
                    usuarioEncontrado.walletDiv += cantidad;

                    const userRef = ref(db, `users/${usuarioEncontrado.firebaseKey}`);
                    await set(userRef, usuarioEncontrado);

                    console.log(`Se aumentó la cantidad en la wallet de ${username}`);
                } else {
                    console.log(`No se encontró al usuario ${username}`);
                }
            } else {
                console.log("No se encontraron usuarios en la base de datos");
            }
        } catch (error) {
            console.error("Error al aumentar la cantidad en la wallet:", error);
        }
    };

    addToWalletCom = async (username,cantidad) => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const usuarioEncontrado = users.find(user => user.userName === username);

                if (usuarioEncontrado) {
                    usuarioEncontrado.walletCom += cantidad;

                    const userRef = ref(db, `users/${usuarioEncontrado.firebaseKey}`);
                    await set(userRef, usuarioEncontrado);

                } else {
                    console.log(`No se encontró al usuario ${username}`);
                }
            } else {
                console.log("No se encontraron usuarios en la base de datos");
            }
        } catch (error) {
            console.error("Error al aumentar la cantidad en la wallet:", error);
        }
    };

    addToWalletComRefDirect = async (username,cantidad,referido) => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const usuarioEncontrado = users.find(user => user.userName === username);

                if (usuarioEncontrado) {
                    usuarioEncontrado.bonoRefDirect+=cantidad;
                    usuarioEncontrado.walletCom += cantidad;

                    const userRef = ref(db, `users/${usuarioEncontrado.firebaseKey}`);
                    await set(userRef, usuarioEncontrado);
                    this.saveInHistory(username, cantidad, "Direct referral bonus", referido)
                    
                } else {
                    console.log(`No se encontró al usuario ${username}`);
                }
            } else {
                console.log("No se encontraron usuarios en la base de datos");
            }
        } catch (error) {
            console.error("Error al aumentar la cantidad en la wallet:", error);
        }
    };

    saveInHistory = async (userName,cantidad,concepto,emisor) => {
        const depositoModel=new DepositoModel()
        depositoModel.setDefaultValues()

        const db = getDatabase(appFirebase);
        const newDocRef = push(ref(db, 'history/'));

        depositoModel.userName=userName
        depositoModel.cantidad=cantidad
        depositoModel.concepto=concepto
        depositoModel.firebaseKey=newDocRef.key;
        depositoModel.hora=this.obtenerHora()
        depositoModel.date=this.obtenerFecha()
        depositoModel.emisor=emisor
        try {
            await set(newDocRef, depositoModel);
        } catch (error) {
            console.log(error)
        }
    }

    obtenerFecha() {
        const currentDate = new Date();
        const options = { timeZone: 'America/New_York', day: '2-digit', month: '2-digit', year: 'numeric' };
        return currentDate.toLocaleString('es-US', options);
    }
    
    obtenerHora() {
        const currentDate = new Date();
        const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' };
        return currentDate.toLocaleString('es-US', options);
    }
    

    /*obtenerFecha() {
        const currentDate = new Date();
    
        const dia = currentDate.getDate().toString().padStart(2, '0');
        const mes = (currentDate.getMonth()).toString().padStart(2, '0');
        const año = currentDate.getFullYear().toString();
    
        const fechaDentroDe30Dias = `${dia}-${mes}-${año}`;
    
        return fechaDentroDe30Dias;
    }
    obtenerHora() {
        const currentDate = new Date();
        
        const hora = currentDate.getHours().toString().padStart(2, '0');
        const minutos = currentDate.getMinutes().toString().padStart(2, '0');
    
        const horaFinal = `${hora}:${minutos}`;
    
        return horaFinal;
    }*/
}

export default Common