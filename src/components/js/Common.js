import appFirebase from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get,set } from "firebase/database";

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

    addToWallet = async (username,cantidad) => {
        try {
            alert(username)
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                const usuarioEncontrado = users.find(user => user.userName === username);

                if (usuarioEncontrado) {
                    usuarioEncontrado.wallet += cantidad;

                    const userRef = ref(db, `users/${usuarioEncontrado.firebaseKey}`);
                    await set(userRef, { wallet: usuarioEncontrado.wallet });

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

}

export default Common