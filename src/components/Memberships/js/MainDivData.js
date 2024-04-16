import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get, set } from "firebase/database";
import Common from "../../js/Common";

class MainDivData {
    constructor(setTotalMN, setNewMN, setTotalRF, setNewRF) {
        this.setTotalMN = setTotalMN
        this.setNewMN = setNewMN
        this.setTotalRF = setTotalRF
        this.setNewRF = setNewRF
        const common=new Common()
    }

    getDirectRef = async () => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");
            const currentUserEmail = this.common.getCurrentUser()

            const snapshot = await get(usersRef.orderByChild("referredBy").equalTo(currentUserEmail.email));
            const directReferrals = snapshot.exists() ? Object.values(snapshot.val()) : [];

            this.setTotalRF(directReferrals.length)
        } catch (error) {
            console.error("Error counting direct referrals:", error);
            return 0;
        }
    };

    /* Llama a la función con el correo electrónico del usuario actual
    const currentUserEmail = "tucorreo@example.com";
    countDirectReferrals(currentUserEmail).then(count => {
      console.log("Número de referidos directos:", count);
    });*/


}
export default MainDivData