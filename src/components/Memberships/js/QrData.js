import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get, set } from "firebase/database";
import Common from "../../js/Common";

class QrData{
    constructor(){
        this.common=new Common()
    }

    findCurrentUser = async (membership) => {
        const user = this.common.getCurrentUser();
        
        if (!user) {
          alert("No hay usuario actualmente autenticado.");
          return;
        }
      
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
      
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const currentUserData = Object.values(userData).find(userData => userData.email === user.email);
      
          if (currentUserData) {
            currentUserData.membership = membership;
            try {
              await set(ref(db, `users/${currentUserData.firebaseKey}`), currentUserData);
              //this.fetchData();
              //alert("Membresía actualizada con éxito.");
            } catch (error) {
              //alert("Error al actualizar los datos: " + error.message);
            }
          } else {
            //alert("No se encontró el usuario actual en la base de datos.");
          }
        } else {
          //alert("No se encontraron datos en la base de datos.");
        }
      }
    

}

export default QrData;



