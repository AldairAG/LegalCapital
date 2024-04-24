class UserModel {
  constructor(userName,lastName,firstName,email,password,referredBy,
    rank,country,phoneNumber,validity,admissionDate,usdtAddress,firebaseKey,rol,request,requestR,wallet,primerDeposito,active,
    refDirecBono,
    MatchBono,
    MatchBonoSemanal,
    residualBono,
    residualBonoMensual,
    bonoFT){
      this.firstName=firstName;
      this.lastName=lastName;
      this.country=country;
      this.phoneNumber=phoneNumber;
      this.admissionDate=admissionDate;
      this.firebaseKey=firebaseKey;
      this.rol=rol;

      this.userName= userName;
      this.email= email;
      this.password= password;
      this.referredBy= referredBy;
      this.validity=validity
      this.usdtAddress=usdtAddress;
      
      this.wallet=wallet;
      this.request=request;
      this.requestR=requestR;
      this.rank=rank;

      this.refDirecBono=refDirecBono;
      this.MatchBono=MatchBono;
      this.MatchBonoSemanal=MatchBonoSemanal;
      this.residualBono=residualBono;
      this.residualBonoMensual=residualBonoMensual;
      this.bonoFT=bonoFT;

      this.primerDeposito=primerDeposito
      this.active=active
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
      this.wallet=0;
      this.primerDeposito=true;
      this.active=true;

      this.refDirecBono=0;
      this.MatchBono=0;
      this.MatchBonoSemanal=0;
      this.residualBono=0;
      this.residualBonoMensual=0;
      this.bonoFastTract=0;
      this.bonoFT=0
  }
};

  export default UserModel