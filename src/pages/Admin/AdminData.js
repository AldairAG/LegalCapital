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

  bonoReferenciaDirectaDiferencia= async (userData,key) =>{
    const commom = new Common()
    const diferencia = [40, 75, 125, 250,0];

    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);

    if (userData.firstAdd == 0) {
      this.bonoReferenciaDirecta(userData.referredBy, userData.walletDiv,userData.userName)
      userData.firstAdd = this.determinarPaquete(userData.walletDiv)
      set(dbRef, userData)
    } else if (this.determinarPaquete(userData.walletDiv) > userData.firstAdd) {
      userData.firstAdd = this.determinarPaquete(userData.walletDiv)
      const bono = diferencia[this.determinarPaquete(userData.walletDiv)-2]
      userData.walletCom = userData.walletCom + bono
      set(dbRef, userData).then(() => {
        commom.saveInHistory(userData.referredBy,bono,"Direct referral bonus",userData.userName)
      })
    }
  }

  aprobar = async (key) => {
    const commom =new Common()
    const db = getDatabase(appFirebase);

    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);

    try {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.validity === "") {
          userData.validity = this.obtenerFechaVencimiento();
        }
        userData.walletDiv = userData.walletDiv + userData.request
        const request=userData.request
        userData.request = 0

        set(dbRef, userData).then(() => {
          this.fetchData()
          commom.saveInHistory(userData.referredBy,request,"Payment for starter package")
          this.bonoReferenciaDirectaDiferencia(userData,key)
        }).catch(()=>{
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

  bonoReferenciaDirecta = async (firebaseKey, cant,referido) => {
    const commom = new Common()
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const userFind = users.find(user => user.userName === firebaseKey);

      const bono = this.determinarBono(cant);
      commom.addToWalletCom(userFind.userName, bono);
      commom.saveInHistory(userFind.userName,bono,"Bono de referencia directa",referido)
    } else {
      console.log("Usuario no encontrado");
    }

  };

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
}

export default AdminData