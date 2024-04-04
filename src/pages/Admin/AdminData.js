import appFirebase from "../../firebase-config";
import { getDatabase, ref, get, set } from "firebase/database";

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
      const filteredUsers = users.filter(user => user.membership === "pro" || user.membership === "basic");
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
          return user.email.includes(text) && (user.membership === "pro" || user.membership === "basic");
        } else {
          return false;
        }
      });
      this.setUserModels(filteredUsers);
    } else {
      alert("error");
    }
  }
  updateVigencia = async (key) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();

      userData.membershipDate = this.obtenerFechaVencimiento();
      set(dbRef, userData)
        .then(() => {
          this.fetchData()
          alert("aaa")
        })
        .catch((error) => {
          alert("Error al actualizar los datos: " + error.message);
        });
    } else {
      alert("El usuario con la clave " + key + " no existe.");
    }
  }

  updateMembership = async (key) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();

      userData.membership = "---";
      set(dbRef, userData)
        .then(() => {
          this.fetchData()
          alert("aaa")
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
    const nextYearDate = new Date(currentDate);

    nextYearDate.setFullYear(currentDate.getFullYear() + 1);

    const dia = nextYearDate.getDate().toString().padStart(2, '0');
    const mes = (nextYearDate.getMonth() + 1).toString().padStart(2, '0');
    const año = nextYearDate.getFullYear().toString();

    const fechaDentroDeUnAño = `${dia}/${mes}/${año}`;

    return fechaDentroDeUnAño;
  }
}

export default AdminData