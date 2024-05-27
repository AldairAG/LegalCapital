import emailjs from '@emailjs/browser';

class Email{
    constructor(destinatario,mensaje,plantilla){
        this.destinatario=destinatario
        this.mensaje=mensaje
        this.plantilla=plantilla
    }
    
    sendEmail = () => {
        emailjs.send("service_033kgeg", this.plantilla, {
            code: this.mensaje,
            from_name:this.plantilla,
        },{
            publicKey: '0wCoAjcnZT2N0PVfE',
          })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );

    };


}

export default Email