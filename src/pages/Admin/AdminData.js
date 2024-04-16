import appFirebase from "../../firebase-config";
import DepositoModel from "../../model/DepositoModel.js"
import { getDatabase, ref, get, set,push } from "firebase/database";

class AdminData {
  constructor(setUserModels) {
    this.setUserModels = setUserModels
  }

  fetchData = async () => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const filteredUsers = users.filter(user => user.request !== 0);
      this.setUserModels(filteredUsers);
    } else {
      alert("error");
    }
  }

  findData = async (text) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const filteredUsers = users.filter(user => {
        if (user.email && user.membership) {
          return user.email.includes(text) && (user.request !== 0);
        } else {
          return false;
        }
      });
      this.setUserModels(filteredUsers);
    } else {
      alert("error");
    }
  }

  updateUser = async (key) => {
    const depositoModel = new DepositoModel();
    depositoModel.setDefaultValues()
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.validity === "") {
        userData.validity = this.obtenerFechaVencimiento();
      }
      userData.wallet = userData.wallet + userData.request
      depositoModel.request = userData.request
      userData.request = 0

      set(dbRef, userData)
        .then(() => {
          this.fetchData()
          depositoModel.userName = userData.userName
          depositoModel.email = userData.email
          this.saveHistoryRequest(depositoModel)
        })
        .catch((error) => {
          alert("Error al actualizar los datos: " + error.message);
        });
    } else {
      alert("El usuario con la clave " + key + " no existe.");
    }
  }

  updateRequest = async (key) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();

      userData.request = 0;
      set(dbRef, userData)
        .then(() => {
          this.fetchData()
        })
        .catch((error) => {
          alert("Error al actualizar los datos: " + error.message);
        });
    } else {
      alert("El usuario con la clave " + key + " no existe.");
    }
  }

  obtenerFechaVencimiento() {
    const currentDate = new Date();
    const next30DaysDate = new Date(currentDate);

    next30DaysDate.setDate(currentDate.getDate() + 30);

    const dia = next30DaysDate.getDate().toString().padStart(2, '0');
    const mes = (next30DaysDate.getMonth() + 1).toString().padStart(2, '0');
    const año = next30DaysDate.getFullYear().toString();

    const fechaDentroDe30Dias = `${dia}/${mes}/${año}`;

    return fechaDentroDe30Dias;
  }

  saveHistoryRequest = async (requestData) => {
    const db = getDatabase(appFirebase);
    const newDocRef = push(ref(db, 'historyRequest/'));
    const fechaActual = new Date();
    
    requestData.dateRequest = fechaActual.toISOString();
    requestData.firebaseKey = newDocRef.key;

    try {
        await set(newDocRef, requestData);
    } catch (error) {
        console.log(error)
    }
}

}

export default AdminData