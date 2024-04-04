import appFirebase from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(appFirebase)

class LoginData{
    constructor(email,password,setTextError,setDisplayError){
        this.email=email;
        this.password=password;
        this.setTextError=setTextError;
        this.setDisplayError=setDisplayError;
    }

    functAutentication = async (e) =>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, this.email, this.password)
            window.location.href = '/pages/Dashboard/';
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
        if(this.email==="admin"){
            window.location.href = '/pages/Admin/';
        }
    }

}


export default LoginData;