import appFirebase from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push, orderByChild, query, equalTo } from "firebase/database";
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
        }
    }
    getUserDataOnly = async (email) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        try {
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const user = users.find(user => user.email === email);
                if (user) {
                    this.setUserData(user);
                } else {
                    alert("No se encontró el usuario");
                } // Asegúrate de que este log esté en el lugar correcto
            } else {
                alert("No se encontraron datos en la base de datos");
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    }
    getUserDataR = async () => {
        const db = getDatabase(appFirebase);
        const currentUserEmail = this.getCurrentUser().email;
        const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(currentUserEmail));
        if(!currentUserEmail) return
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            if (users.length > 0) {
                return users[0]; // Devuelve el primer (y único) usuario que coincide
            } else {
                alert("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    };

    fetchUserData = async () => {
        try {
            const db = getDatabase(appFirebase);
            const currentUserEmail = this.getCurrentUser().email;
            const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(currentUserEmail));

            return get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const users = Object.values(snapshot.val());
                    if (users.length > 0) {
                        return users[0];  // Retorna el usuario si lo encuentra
                    } else {
                        throw new Error("No se encontró el usuario");
                    }
                } else {
                    throw new Error("No se encontraron datos en la base de datos");
                }
            }).catch((error) => {
                console.error("Error obteniendo los datos:", error);
                throw error;  // Maneja y propaga el error
            });
        } catch (error) {
            console.log(error)
        }
    };

    fetchUserDataByName = async (email) => {
        const db = getDatabase(appFirebase);
        const currentUserEmail = this.getCurrentUser().email;
        const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(email));

        return get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                if (users.length > 0) {
                    return users[0];  // Retorna el usuario si lo encuentra
                } else {
                    throw new Error("No se encontró el usuario");
                }
            } else {
                throw new Error("No se encontraron datos en la base de datos");
            }
        }).catch((error) => {
            console.error("Error obteniendo los datos:", error);
            throw error;  // Maneja y propaga el error
        });
    };



    getUserDataByName = async (userName) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const user = users.find(user => user.userName === userName);
            if (user) {
                return user
            } else {
                console.log("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    }

    getAnyUser = async (userEmail) => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const user = users.find(user => user.email === userEmail);
            if (user) {
                this.setUserData(user)
            } else {
                alert("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    }

    addToWallet = async (username, cantidad) => {
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

    editAnyUser = async (userData) => {
        try {
            const db = getDatabase(appFirebase);
            const userRef = ref(db, `users/${userData.firebaseKey}`);
            await set(userRef, userData);
        } catch (error) {
            console.error("Error", error);
        }
    };

    addToWalletCom = async (username, cantidad) => {
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

    addToWalletComRefDirect = async (username, cantidad, referido) => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const usuarioEncontrado = users.find(user => user.userName === username);

                if (usuarioEncontrado) {
                    usuarioEncontrado.bonoRefDirect += cantidad;
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

    saveInHistory = async (userName, cantidad, concepto, emisor, state) => {
        const depositoModel = new DepositoModel()
        depositoModel.setDefaultValues()

        const db = getDatabase(appFirebase);
        const newDocRef = push(ref(db, 'history/'));

        depositoModel.userName = userName
        depositoModel.cantidad = cantidad
        depositoModel.concepto = concepto
        depositoModel.firebaseKey = newDocRef.key;
        depositoModel.hora = this.obtenerHora()
        depositoModel.date = this.obtenerFecha()
        depositoModel.emisor = emisor
        depositoModel.state = state | 0
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