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

  bonoReferenciaDirecta=async (userData)=>{
    const commom = new Common()
    const bono=[10,40,75,125,250]
    const st=this.determinarPaquete(userData['staterPack'])
    let fa=userData['firtsAdd']

    while (fa!=st) {
      const patrocinadorData=await commom.getUserDataByName(userData.referredBy)
      patrocinadorData["bonoRefDirect"]=patrocinadorData["bonoRefDirect"]+bono[fa]
      patrocinadorData["walletCom"]=patrocinadorData["walletCom"]+bono[fa]
      commom.editAnyUser(patrocinadorData)
      commom.saveInHistory(userData.referredBy, bono[fa], "direct referral bonus", userData.userName)
      fa++
    }
    userData["firtsAdd"]=st
    commom.editAnyUser(userData)
  }

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
          this.bonoReferenciaDirecta(userData)
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