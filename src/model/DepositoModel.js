class DepositoModel {
    constructor(userName, email, firebaseKey, request,dateRequest) {
        this.userName = userName;
        this.email = email;
        this.firebaseKey = firebaseKey;
        this.request = request;
        this.dateRequest=dateRequest
    }
    setDefaultValues() {
        this.userName = "";
        this.email = "";
        this.firebaseKey="";
        this.request=0.00;
        this.dateRequest=""
    }
}
export default DepositoModel