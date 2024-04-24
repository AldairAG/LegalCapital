import appFirebase from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get ,set} from "firebase/database";
const auth = getAuth(appFirebase)

class LoginData {
  constructor(email, password, setTextError, setDisplayError, history) {
    this.email = email;
    this.password = password;
    this.setTextError = setTextError;
    this.setDisplayError = setDisplayError;
    this.history = history;
    this.userRole = "";
  }

  functAutentication = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
      await this.getUserData()

      if (this.userRole === 'admin') {
        this.history.push('/admin');
      } else {
        this.history.push('/Dashboard/home');
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.setTextError('Invalid email address.');
          this.setDisplayError(true);
          break;
        case 'auth/user-disabled':
          this.setTextError('This user account has been disabled.');
          this.setDisplayError(true);
          break;
        case 'auth/user-not-found':
          this.setTextError('No user corresponding to the given email.');
          this.setDisplayError(true);
          break;
        case 'auth/wrong-password':
          this.setTextError('Incorrect password.');
          this.setDisplayError(true);
          break;
        default:
          this.setTextError('The username or password is incorrect.');
          this.setDisplayError(true);
          break;
      }
    }
  }

  getUserData = async () => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const user = users.find(user => user.email === this.email);
      if (user) {
        this.userRole = user.rol;
      } else { alert("error2"); }
    } else {
      alert("error");
    }
  }

  comprobarVigencia = async () => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, 'users/');
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
        
          if (this.compararFechaActual(userData.validity)) {
            this.restarWallet(userData.firebaseKey)    
          }
        });
      } else {
        console.log("No se encontraron usuarios en la base de datos.");
      }
    } catch (error) {
      console.error("Error al obtener datos de Firebase:", error.message);
    }
  };

  compararFechaActual = (vigency) => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const añoActual = fechaActual.getFullYear();

    const partesVigency = vigency.split('/');
    const diaVigency = parseInt(partesVigency[0], 10);
    const mesVigency = parseInt(partesVigency[1], 10);
    const añoVigency = parseInt(partesVigency[2], 10);

    if (diaActual === diaVigency && mesActual === mesVigency && añoActual === añoVigency) {
        return true; 
    } else {
        return false;
    }
};

restarWallet = async (key) => {
  const db = getDatabase(appFirebase);
  const dbRef = ref(db, "users/" + key);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();

    userData.wallet=userData.wallet-25
    set(dbRef, userData)
      .then(() => {
      })
      .catch((error) => {
        alert("Error al actualizar los datos: " + error.message);
      });
  } else {
    alert("El usuario con la clave " + key + " no existe.");
  }
}

}


export default LoginData;