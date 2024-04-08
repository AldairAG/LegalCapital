import appFirebase from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database";
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
        this.history.push('/Dashboard');
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
        this.userRole=user.rol;
      }else{alert("error2");}
    } else {
      alert("error");
    }
  }

}


export default LoginData;