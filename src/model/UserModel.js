class UserModel {
  constructor(userName,lastName,firstName,email,password,referredBy,
    rank,country,phoneNumber,validity,admissionDate,usdtAddress,firebaseKey,rol,request,requestR,wallet){
      this.userName= userName;
      this.lastName=lastName;
      this.firstName=firstName;
      this.email= email;
      this.password= password;
      this.referredBy= referredBy;
      this.rank=rank;
      this.country=country;
      this.phoneNumber=phoneNumber;
      this.validity=validity
      this.usdtAddress=usdtAddress;
      this.admissionDate=admissionDate;
      this.firebaseKey=firebaseKey;
      this.rol=rol;
      this.request=request;
      this.requestR=requestR;
      this.wallet=wallet;
    }
    setDefaultValues() {
      this.userName = "";
      this.lastName = "";
      this.firstName = "";
      this.email = "";
      this.password = "";
      this.referredBy = "";
      this.rank = "";
      this.country = "";
      this.phoneNumber = "";
      this.membership = "---";
      this.usdtAddress = "";
      this.admissionDate = "";
      this.firebaseKey="";
      this.rol="u";
      this.request=0.00;
      this.requestR=0.00;
      this.validity="";
      this.wallet=0
  }
};

  export default UserModel