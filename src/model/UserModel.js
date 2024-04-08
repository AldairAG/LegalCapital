class UserModel {
  constructor(userName,lastName,firstName,email,password,referredBy,savingsPlan,
    rank,country,phoneNumber,fundador,membership,admissionDate,membershipDate,usdtAddress,firebaseKey,rol,){
      this.userName= userName;
      this.lastName=lastName;
      this.firstName=firstName;
      this.email= email;
      this.password= password;
      this.referredBy= referredBy;
      this.savingsPlan= savingsPlan;
      this.rank=rank;
      this.country=country;
      this.phoneNumber=phoneNumber;
      this.fundador=fundador;
      this.membership=membership
      this.usdtAddress=usdtAddress;
      this.admissionDate=admissionDate;
      this.membershipDate=membershipDate;
      this.firebaseKey=firebaseKey;
      this.rol=rol;
    }
    setDefaultValues() {
      this.userName = "";
      this.lastName = "";
      this.firstName = "";
      this.email = "";
      this.password = "";
      this.referredBy = "";
      this.savingsPlan = "";
      this.rank = "";
      this.country = "";
      this.phoneNumber = "";
      this.fundador=false;
      this.membership = "---";
      this.usdtAddress = "";
      this.admissionDate = "";
      this.membershipDate = "---";
      this.firebaseKey="";
      this.rol="u"
  }
};

  export default UserModel