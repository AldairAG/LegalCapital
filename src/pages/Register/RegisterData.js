import appFirebase from "../../firebase-config";
import { getDatabase, ref, set, push } from "firebase/database";
import UserModel from '../../model/UserModel'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Common from "../../components/js/Common.js"
import WelcomeEmail from "./WelcomeEmail"

class RegisterData {
    constructor(userName, email, password,passwordConf, referredBy,textError, 
        setTextError,setMsjError,setbtnActive) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.passwordConf = passwordConf;
        this.referredBy = referredBy;
        this.textError=textError;
        this.setbtnActive = setbtnActive;
        this.setTextError = setTextError;
        this.setMsjError = setMsjError;
        this.common = new Common();
        this.welcomeEmail=new WelcomeEmail(userName,email);
    }

    blurPass() {
        if (this.password.length < 6 && !this.msjError) {
            this.setMsjError(true)
            this.setTextError("Password should contain at least 6 characters.")
        } else {
            this.setMsjError(false)
            this.setTextError("")
        }
    }
    blurPassConf() {
        if (this.password !== this.passwordConf && !this.msjError) {
            this.setMsjError(true);
            this.setTextError("Passwords do not match.");
        } else{
            this.setMsjError(false);
            this.setTextError("");
        }
    }
    activateButton() {
        if (this.common.isNullOrEmpty(this.userName) || this.common.isNullOrEmpty(this.email) ||
            this.common.isNullOrEmpty(this.password) || this.common.isNullOrEmpty(this.passwordConf)) {
            this.setbtnActive(false)
        } else {
            this.setbtnActive(true)
        }
    }
    valid(e) {
        if(this.textError===""){
            this.functRegister(e)
        }
    }


    saveData = async () => {
        const userModel = new UserModel()
        userModel.setDefaultValues();
        const db = getDatabase(appFirebase);
        const newDocRef = push(ref(db, 'users/'));
        const fechaActual = new Date();

        userModel.email = this.email;
        userModel.password = this.password;
        userModel.referredBy = this.referredBy;
        userModel.userName = this.userName;
        userModel.password = this.password;
        userModel.admissionDate = fechaActual.toISOString();
        userModel.firebaseKey = newDocRef.key;

        try {
            await set(newDocRef, userModel);
        } catch (error) {
            console.log(error)
        }
    }
    functRegister = async (e) => {
        const auth = getAuth(appFirebase)
        e.preventDefault();
        try {
            //await createUserWithEmailAndPassword(auth, this.email, this.password)
            await this.saveData();
            //await this.welcomeEmail.sendEmail(e)
            //window.location.href = '/Dashboard';
        } catch (error) {
            switch (error.code) { 
                case 'auth/email-already-in-use':
                    this.setTextError('The email address is already in use. Please choose another.');
                    this.setMsjError(true);
                    break;
                case 'auth/invalid-email':
                    this.setTextError('The email address provided is invalid.');
                    this.setMsjError(true);
                    break;
                case 'auth/too-many-requests':
                    this.setTextError('Too many unsuccessful login attempts. Please try again later.');
                    this.setMsjError(true);
                    break;
                default:
                    this.setTextError('An error occurred during registration. Please try again later.');
                    this.setMsjError(true);
            }
        }
    }
}

export default RegisterData