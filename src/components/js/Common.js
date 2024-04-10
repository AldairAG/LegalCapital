import { getAuth } from "firebase/auth";

class Common{
    isNullOrEmpty(value) {
        return value === null || value === undefined || value === '' || value === ' ';
    }

    getCurrentUser = () => {
        const auth = getAuth();
        return auth.currentUser
    };
}

export default Common