import appFirebase from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

class Common {
    constructor(setUserData){
        this.setUserData=setUserData
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
}

export default Common