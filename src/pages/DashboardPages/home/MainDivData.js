import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import Common from "../../../components/js/Common";

class MainDivData {
    constructor(setTotalMN, setNewMN, setTotalRF, setNewRF, userName, totalMN) {
        this.setTotalMN = setTotalMN
        this.setNewMN = setNewMN
        this.setTotalRF = setTotalRF
        this.setNewRF = setNewRF
        this.userName = userName
        this.totalMN = totalMN
    }


    // Función para contar los referidos de un usuario recursivamente



}
export default MainDivData