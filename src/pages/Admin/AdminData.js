import appFirebase from "../../firebase-config";
import { getDatabase, ref, get, set } from "firebase/database";
import Common from "../../components/js/Common.js";

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

  sumNElements = (n) => {
    const array = [10, 50, 125, 250, 500];
    if (n > array.length) {
      return null;
    }

    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += array[i];
    }
    return sum;
  }

  bonoReferenciaDirectaDiferencia = (userData, key) => {
    const commom = new Common()
    const diferencia = [40, 75, 125, 250, 0];
    const diferencia1 = [10, 50, 125, 250, 500];
    let suma = 0

    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const dif = Math.abs(userData.firtsAdd - this.determinarPaquete(userData.staterPack))

    if (userData.firtsAdd === 0) {
      for (let index = 0; index < dif; index++) {
        commom.addToWalletComRefDirect(userData.referredBy, diferencia1[index], userData.userName)
        userData.firtsAdd = this.determinarPaquete(userData.staterPack)
        set(dbRef, userData)
      }
    } else if (dif === 1) {
      commom.addToWalletComRefDirect(userData.referredBy, diferencia[userData.firtsAdd - 1], userData.userName)
      userData.firtsAdd = this.determinarPaquete(userData.staterPack)
      set(dbRef, userData)
    } else if (dif > 1) {
      suma = this.sumInRange(diferencia, userData.firtsAdd - 1, this.determinarPaquete(userData.staterPack) - 2)
      commom.addToWalletComRefDirect(userData.referredBy, suma, userData.userName)
      userData.firtsAdd = this.determinarPaquete(userData.staterPack)
      set(dbRef, userData)
    }

  }

  bonoReferenciaDirecta = async (firebaseKey, cant, referido) => {
    const commom = new Common()
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const userFind = users.find(user => user.userName === firebaseKey);
      const bono = this.determinarBono(cant);
      userFind["bonoRefDirect"] = userFind["bonoRefDirect"] + bono
      commom.addToWalletCom(userFind.userName, bono);
      commom.saveInHistory(userFind.userName, bono, "Direct referral bonus", referido)
    } else {
      console.log("Usuario no encontrado");
    }

  };

  aprobar = async (key) => {
    const commom = new Common()
    const db = getDatabase(appFirebase);

    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    try {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.validity === "") {
          userData.validity = this.obtenerFechaVencimiento();
        }
        userData.staterPack = userData.staterPack + userData.request
        const request = userData.request
        userData.request = 0

        set(dbRef, userData).then(() => {
          this.fetchData()
          commom.saveInHistory(userData.referredBy, request, "Payment for starter package", "")
          this.bonoReferenciaDirectaDiferencia(userData, key)
        }).catch(() => {
          console.log("error")
        })
      }
    } catch (error) {

    }
  }


  denegar = async (key) => {
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

    const fechaDentroDe30Dias = `${dia}-${mes}-${año}`;

    return fechaDentroDe30Dias;
  }

  determinarBono = (valor) => {
    switch (true) {
      case (valor >= 100 && valor <= 499):
        return 10;
      case (valor > 500 && valor <= 2499):
        return 50;
      case (valor > 2500 && valor <= 4999):
        return 125;
      case (valor > 5000 && valor <= 9999):
        return 250;
      case (valor > 10000 && valor <= 24999):
        return 500;
      default:
        return 0;
    }
  };

  determinarPaquete = (valor) => {
    switch (true) {
      case (valor >= 100 && valor <= 499):
        return 1;
      case (valor >= 500 && valor <= 2499):
        return 2;
      case (valor >= 2500 && valor <= 4999):
        return 3;
      case (valor >= 5000 && valor <= 9999):
        return 4;
      case (valor >= 10000):
        return 5;
      default:
        return 0;
    }
  }
  sumInRange(array, startIndex, endIndex) {
    let sum = 0;

    // Asegurarse de que los índices estén dentro de los límites del array
    startIndex = Math.max(0, startIndex);
    endIndex = Math.min(array.length - 1, endIndex);

    for (let i = startIndex; i <= endIndex; i++) {
      sum += array[i];
    }

    return sum;
  }
}

export default AdminData